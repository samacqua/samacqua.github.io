self.addEventListener('message', function(e) {
  importScripts('a.out.js');

  var data = e.data;
  let fen = data.fen;

  Module['onRuntimeInitialized'] = function() {

    api = {
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

    board_pointer = api.get_board_pointer();
    info_pointer = api.get_info_pointer();
    api.init_engine();
    api.set_board(board_pointer);
    function parse_material(material_str) {
      mat_ar = material_str.split(' ');
      return mat_ar.map(function (x) {
        return parseInt(x, 10);
      });
    }

    let move = api.engine_go(board_pointer, info_pointer, "position fen " + fen);
    api.print_engine_board_stats(board_pointer);
    let material = parse_material(api.get_material(board_pointer));
    let eval = api.eval_position(board_pointer);
    self.postMessage({"move": move, "material": material, "eval": eval});
  };

}, false);
