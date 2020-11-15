var board = null
var game = new Chess()

function new_game() {
  game = new Chess();
  board.position('rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1');
}

/* Set the width of the side navigation to 250px */
function openNav() {
  document.getElementById("mySidenav").style.width = "21em";
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
    eval_position: Module.cwrap('eval_position', 'int', ['board']),
    get_material: Module.cwrap('get_material', 'string', ['board']),
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

    let comment = get_think_comment(game);
    type_line(comment);

    let fen = game.fen();
    var worker = new Worker('js/acquacchi_worker.js');
    worker.postMessage({'fen': fen});
    worker.addEventListener('message', function(e) {
      let data = e.data;
      let move = data.move;

      game.move(move, { sloppy: true });

      let from = move.slice(0,2);
      let to = move.slice(2,4);
      // TODO: promotion

      let move_str = from + '-' + to;

      let material = data.material;
      let eval = data.score;
      let move_comment = get_move_comment(game, move_str, material, eval);
      type_line(move_comment);
      last_material = material;
      last_eval = eval;

      board.move(move_str);
      set_move_history(game.history());
    }, false);
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

    set_move_history(game.history());
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
  board = Chessboard('myBoard', config);

  $("#texter").css("height", $("#myBoard").height());
};

function set_move_history(history) {
  let hist_string = "";
  for (i=0;i<history.length;i++) {
    if (i%2 == 0) {
      hist_string += i/2+1 + ". ";
    }
    hist_string += history[i] + "  ";
  }
  $("#moves").text(hist_string);
}

// custom event trigger: https://stackoverflow.com/a/23344816/5416200
function on_write_new_line(state) {
  var evt = $.Event('writing_new_line');
  evt.state = state;

  $(window).trigger(evt);
}

var last_line = ""; // used to make sure settimeout is correct amount
type_line("make a move");

function type_line(line) {
  on_write_new_line(line);

//  set timeout to give func enough time for delete animation (very jank)
 setTimeout(() => {
  last_line = line;

  var e = $('<div id="acquacchi-text" class="texter"></div>');
  $("#texter").empty();
  $("#texter").append(e)
  new TypeIt(`#acquacchi-text`, {
    speed: 50,
    waitUntilVisible: true,
    afterComplete: () => {
      // make latest message visible
      $("#" + id)[0].scrollIntoView();
    }
  })
  .type(line)
  .exec(async () => {
    await new Promise((resolve, reject) => {
      // jank solution to make line delete itself bc typeit.js only allows direct chaining
      // wait for custom even (type_line is called to write next line), then delete self
      $(window).on('writing_new_line', function (e) {
        return resolve();
      });
    });
  })
  .delete(line.length)
  .go();
 }, 50*last_line.length+1);
}

var last_material = [8,8,2,2,2,2,2,2,1,1];
var last_eval = 0;
function get_move_comment(game_board, move_str, material, eval) {
  if (game_board.in_checkmate()) {
    return "checkmate! :)";
  } else if (game_board.in_check()) {
    return "check!";
  }  else if (game_board.in_draw()) {
    if (game_board.insufficient_material()) {
      return "neither side has enough pieces to checkmate--it's a draw.";
    } else {
      return "it's a draw! We've gone 50 moves without any captures or pawn moves.";
    }
  } else if (game_board.in_threefold_repetition()) {
    return "three-fold repitition--draw";
  } else if (game_board.in_stalemate()) {
    return "Stalemate :/";
  } else {
    let eval_delta = eval - last_eval;
    let material_delta = material.map(function (num, idx) {
      return num - last_material[idx];
    });

    if (eval_delta < -100) {
      return "Great move! I'll move " + move_str;
    } else if (eval_delta < 50) {
      return "Good move! I'll move " + move_str;
    } else if (eval_delta < 100) {
      return "Okay move. I'll move " + move_str;
    } else if (eval_delta < 300) {
      return "That was a mistake. " + move_str;
    } else {
      return "That was a big blunder... " + move_str;
    }

  }
}

function get_think_comment(game_board) {
  if (game_board.in_checkmate()) {
    return "you checkmated me! :(";
  } else if (game_board.in_check()) {
    return "uh oh, i'm in check";
  } else if (game_board.in_draw()) {
    if (game_board.insufficient_material()) {
      return "neither side has enough pieces to checkmate--it's a draw.";
    } else {
      return "it's a draw! We've gone 50 moves without any captures or pawn moves.";
    }
  } else if (game_board.in_threefold_repetition()) {
    return "three-fold repitition--draw";
  } else if (game_board.in_stalemate()) {
    return "Stalemate >:)";
  } else {
    let move_phrases = ["thinking...", "hm...", "beep boop"];
    let phrase = move_phrases[Math.floor(Math.random() * move_phrases.length)];
    return phrase;
  }
}
