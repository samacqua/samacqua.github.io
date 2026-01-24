var board = null;
var game = new Chess();
var moveHistory = [];
var currentMoveIndex = -1;

// Intercept console.log to display in UI
var consoleOutput = [];
var originalLog = console.log;

function renderConsoleOutput() {
  var consoleDiv = document.getElementById('console-output');
  if (!consoleDiv) return;

  if (consoleOutput.length === 0) {
    consoleDiv.classList.add('console-empty');
    consoleDiv.textContent = 'play a move to begin';
    return;
  }

  consoleDiv.classList.remove('console-empty');
  consoleDiv.textContent = consoleOutput.join('\n');
  consoleDiv.scrollTop = consoleDiv.scrollHeight;
}

console.log = function() {
  var message = Array.from(arguments).map(arg => {
    if (typeof arg === 'object') {
      try {
        return JSON.stringify(arg);
      } catch(e) {
        return String(arg);
      }
    }
    return String(arg);
  }).join(' ');
  
  originalLog.apply(console, arguments);
  consoleOutput.push(message);
  
  // Keep only last 50 lines
  if (consoleOutput.length > 50) {
    consoleOutput.shift();
  }
  
  // Update UI
  renderConsoleOutput();
};

function new_game() {
  game = new Chess();
  board.position('rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1');
}

// Called by Module.onRuntimeInitialized (defined in HTML before a.out.js loads)
function initAcquacchi() {

  const api = {
    get_board_pointer: Module.cwrap('get_board_pointer', 'board', []),
    get_info_pointer: Module.cwrap('get_info_pointer', 'info', []),
    set_board: Module.cwrap('set_board', '', ['board']),
    set_info: Module.cwrap('set_info', '', ['info']),
    engine_go: Module.cwrap('engine_go', 'string', ['board', 'info', 'string']),
    init_engine: Module.cwrap('init_engine', '', []),
    print_engine_board_stats: Module.cwrap('print_pos', '', ['board']),
    update_FEN: Module.cwrap('update_FEN', '', ['string', 'string']),
    eval_position: Module.cwrap('eval_position', 'int', ['board']),
    get_material: Module.cwrap('get_material', 'string', ['board']),
  };

  // initialize pointers and engine
  var board_pointer = api.get_board_pointer();
  var info_pointer = api.get_info_pointer();
  api.init_engine();
  api.set_board(board_pointer);

  // Track selected square for tap-to-move
  var selectedSquare = null;

  function removeHighlights() {
    $('#myBoard .square-55d63').removeClass('selected-square legal-move');
  }

  function highlightLegalMoves(square) {
    var moves = game.moves({ square: square, verbose: true });
    moves.forEach(function(move) {
      $('#myBoard .square-' + move.to).addClass('legal-move');
    });
  }

  function onSquareClick(square, piece) {
    // Don't allow moves if game is over
    if (game.game_over()) return;

    // If clicking on a white piece, select it
    if (piece && piece.search(/^w/) !== -1) {
      removeHighlights();
      selectedSquare = square;
      $('#myBoard .square-' + square).addClass('selected-square');
      highlightLegalMoves(square);
      return;
    }

    // If we have a selected square, try to move
    if (selectedSquare) {
      var move = game.move({
        from: selectedSquare,
        to: square,
        promotion: 'q'
      });

      if (move !== null) {
        board.position(game.fen());
        set_move_history(game.history());
        removeHighlights();
        selectedSquare = null;
        onMoveEnd();
        return;
      }
    }

    // Clear selection if clicking empty square or black piece
    removeHighlights();
    selectedSquare = null;
  }

  function onDragStart (source, piece, position, orientation) {
    removeHighlights();
    selectedSquare = null;
    
    // do not pick up pieces if the game is over
    if (game.game_over()) return false

    // only pick up pieces for White
    if (piece.search(/^b/) !== -1) return false
    
    // Show legal moves while dragging
    $('#myBoard .square-' + source).addClass('selected-square');
    highlightLegalMoves(source);
  }

  function onMoveEnd () {
    let fen = game.fen();
    var worker = new Worker('js/acquacchi_worker.js');
    worker.postMessage({'fen': fen});
    worker.addEventListener('message', function(e) {
      let data = e.data;
      
      // Handle log messages from worker
      if (data.type === 'log') {
        console.log('[Engine] ' + data.message);
        return;
      }
      
      let move = data.move;

      let from = move.slice(0,2);
      let to = move.slice(2,4);
      let promo = move.slice(4,5);
      let move_str = from + '-' + to;

      let material = data.material;
      let eval = data.score;

      game.move(move, { sloppy: true });
      board.position(game.fen());
      set_move_history(game.history());

      last_material = material;
      last_eval = eval;
      
    }, false);
  }

  function onDrop (source, target) {
    removeHighlights();
    
    // see if the move is legal
    var move = game.move({
      from: source,
      to: target,
      promotion: 'q' // NOTE: always promote to a queen for example simplicity
    });

    // illegal move
    if (move === null) return 'snapback'

    set_move_history(game.history());
    onMoveEnd();
  }

  // update the board position after the piece snap
  // for castling, en passant, pawn promotion
  function onSnapEnd () {
    board.position(game.fen())
  }

  var config = {
    draggable: true,
    position: 'start',
    onDragStart: onDragStart,
    onDrop: onDrop,
    onSnapEnd: onSnapEnd,
    showErrors: 'console',
  }
  board = Chessboard('myBoard', config);
  
  renderConsoleOutput();
  
  // Add tap-to-move handlers
  var isDragging = false;
  
  function handleSquareTap($squareEl) {
    var square = $squareEl.attr('data-square');
    var piece = game.get(square);
    var pieceStr = piece ? piece.color + piece.type.toUpperCase() : null;
    onSquareClick(square, pieceStr);
  }

  $('#myBoard').on('mousedown', '.square-55d63', function() {
    isDragging = false;
  });

  $('#myBoard').on('mousemove', '.square-55d63', function() {
    isDragging = true;
  });

  $('#myBoard').on('mouseup', '.square-55d63', function() {
    if (isDragging) return;
    handleSquareTap($(this));
  });

  $('#myBoard').on('touchstart', '.square-55d63', function() {
    isDragging = false;
  });

  $('#myBoard').on('touchmove', '.square-55d63', function() {
    isDragging = true;
  });

  $('#myBoard').on('touchend', '.square-55d63', function(e) {
    if (isDragging) return;
    e.preventDefault();
    handleSquareTap($(this));
  });
  
  // Add move navigation button handlers
  $('#btn-backward').on('click', moveBackward);
  $('#btn-forward').on('click', moveForward);
  
  // Initialize button states
  updateMoveButtons();
};

function set_move_history(history) {
  moveHistory = game.history({ verbose: true });
  currentMoveIndex = moveHistory.length - 1;

  renderMovesBar(history);
  updateMoveButtons();
}

function renderMovesBar(history) {
  let parts = [];
  for (i=0;i<history.length;i++) {
    if (i%2 == 0) {
      parts.push('<span class="move-number">' + (i/2+1) + '.</span>');
    }
    let cls = (i === currentMoveIndex) ? 'move-item current-move' : 'move-item';
    parts.push('<span class="' + cls + '">' + history[i] + '</span>');
  }
  $("#moves").html(parts.join(' '));
}

function updateMoveButtons() {
  $('#btn-backward').prop('disabled', currentMoveIndex < 0);
  $('#btn-forward').prop('disabled', currentMoveIndex >= moveHistory.length - 1);
}

function goToMove(index) {
  if (index < -1 || index >= moveHistory.length) return;
  
  game.reset();
  for (let i = 0; i <= index; i++) {
    game.move(moveHistory[i]);
  }
  
  currentMoveIndex = index;
  board.position(game.fen());
  updateMoveButtons();
  renderMovesBar(game.history());
}

function moveBackward() {
  if (currentMoveIndex >= 0) {
    goToMove(currentMoveIndex - 1);
  }
}

function moveForward() {
  if (currentMoveIndex < moveHistory.length - 1) {
    goToMove(currentMoveIndex + 1);
  }
}

var last_material = [8,8,2,2,2,2,2,2,1,1];
var last_eval = 0;


// apply svg to each links so don't have to copy paste a bunch
// animation from https://codepen.io/aaroniker/pen/VwjexVy
const links = document.querySelectorAll('.about a');

for (let i=0;i<links.length; i++) {
    links[i].innerHTML += '<svg viewBox="0 0 70 36"><path d="M6.9739 30.8153H63.0244C65.5269 30.8152 75.5358 -3.68471 35.4998 2.81531C-16.1598 11.2025 0.894099 33.9766 26.9922 34.3153C104.062 35.3153 54.5169 -6.68469 23.489 9.31527" /></svg>';
}

// If WASM already initialized before this script loaded, call init now
if (wasmReady) {
  initAcquacchi();
}