var board = null
var game = new Chess()

function new_game() {
  game = new Chess();
  board.position('rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1');
}

/* Set the width of the side navigation to 250px */
function openNav() {
  document.getElementById("mySidenav").style.width = "20%";
}

/* Set the width of the side navigation to 0 */
function closeNav() {
  document.getElementById("mySidenav").style.width = "0";
}

Module.onRuntimeInitialized = async _ => {

  openNav();
  const api = {
    get_board_pointer: Module.cwrap('get_board_pointer', 'board', []),
    get_info_pointer: Module.cwrap('get_info_pointer', 'info', []),
    set_board: Module.cwrap('set_board', '', ['board']),
    set_info: Module.cwrap('set_info', '', ['info']),
    engine_go: Module.cwrap('engine_go', 'string', ['board', 'info', 'string']),
    init_engine: Module.cwrap('init_engine', '', []),
    print_engine_board_stats: Module.cwrap('print_pos', '', ['board']),
    update_FEN: Module.cwrap('update_FEN', '', ['string', 'string']),
  };

  // initialize pointers and engine
  var board_pointer = api.get_board_pointer();
  var info_pointer = api.get_info_pointer();
  api.init_engine();
  api.set_board(board_pointer);

  function onDragStart (source, piece, position, orientation) {
    // do not pick up pieces if the game is over
    if (game.game_over()) return false

    // only pick up pieces for White
    if (piece.search(/^b/) !== -1) return false
  }

  function onMoveEnd (old_pos, new_pos) {
    console.log("make move...");
    let fen = game.fen();
    var worker = new Worker('js/acquacchi_worker.js');
    worker.postMessage({'fen': fen});
    worker.addEventListener('message', function(e) {
      console.log("WORKER MOVE: ", e.data);
      let move = e.data;

      game.move(move, { sloppy: true })

      let from = move.slice(0,2);
      let to = move.slice(2,4);
      // TODO: promotion

      console.log(from + '-' + to);
      board.move(from + '-' + to);
    }, false);

    // let move = api.engine_go(board_pointer, info_pointer, "position fen " + fen);

  }

  function onDrop (source, target) {
    // see if the move is legal
    var move = game.move({
      from: source,
      to: target,
      promotion: 'q' // NOTE: always promote to a queen for example simplicity
    })

    // illegal move
    if (move === null) return 'snapback'

    onMoveEnd(4,4);
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
  board = Chessboard('myBoard', config)

};
