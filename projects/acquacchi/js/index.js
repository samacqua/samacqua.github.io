var board = null
var game = new Chess()

var texter = new TypeIt("#texter", {
  speed: 50,
  waitUntilVisible: true,
})
.type("make a move")
.go();

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

    if (game.in_checkmate()) {
      type_line("you checkmated me! :("); 
    } else if (game.in_check()) {
      type_line("uh oh, i'm in check");  
    } else if (game.in_draw()) {
      if (game.insufficient_material()) {
        type_line("neither side has enough pieces to checkmate--it's a draw.");
      } else {
        type_line("it's a draw! We've gone 50 moves without any captures or pawn moves.");
      }
    } else if (game.in_threefold_repetition()) {
      type_line("three-fold repitition--draw");
    } else if (game.in_stalemate()) {
      type_line("Stalemate >:)");
    } else {
      type_line("thinking...");    
    }

    console.log("make move...");
    let fen = game.fen();
    var worker = new Worker('js/acquacchi_worker.js');
    worker.postMessage({'fen': fen});
    worker.addEventListener('message', function(e) {
      let move = e.data;

      game.move(move, { sloppy: true })

      let from = move.slice(0,2);
      let to = move.slice(2,4);
      // TODO: promotion


      let move_phrases = [["Aha, I'll move ", ""], ["Your trash... ", ""], ["", " is winning"]];
      let phrase = move_phrases[Math.floor(Math.random() * move_phrases.length)];
      
      let move_str = from + '-' + to;

      if (game.in_checkmate()) {
        type_line("checkmate! :)"); 
      } else if (game.in_check()) {
        type_line("check!");  
      }  else if (game.in_draw()) {
        if (game.insufficient_material()) {
          type_line("neither side has enough pieces to checkmate--it's a draw.");
        } else {
          type_line("it's a draw! We've gone 50 moves without any captures or pawn moves.");
        }
      } else if (game.in_threefold_repetition()) {
        type_line("three-fold repitition--draw");
      } else if (game.in_stalemate()) {
        type_line("Stalemate :/");
      } else {
        type_line(phrase[0] + move_str + phrase[1]);      
      }
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

function type_line(line) {

  function makeid(length) {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
       result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
 }

  texter.destroy();
  let id = makeid(5);
  var e = $('<div id="' + id + '" class="texter"></div>');
  $("#texter").append(e)
  texter = new TypeIt(`#${id}`, {
    speed: 50,
    waitUntilVisible: true,
  })
  .type(line)
  .go();
}
