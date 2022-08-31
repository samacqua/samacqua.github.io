// server settings
var server_url = 'http://9d0c-34-91-163-48.ngrok.io'

function toggle_server_help() {
  if ($('#server-instructions').is(':hidden')) {
    $('#server-instructions').show();
  } else {
    $('#server-instructions').hide();
  }
}

function update_server_url() {
  server_url = $('#server-text').val().trim();
  if (server_url.endsWith('/')) {
    server_url = server_url.slice(0, -1);
  }
  $('#server-instructions').hide();
  console.log('new server url: ' + server_url);
}

// CLIP interactive

function exp_sum(arr) {
  var sum_ = 0;
  $.each(arr, function(i, cos_sim) {
    sum_ += Math.exp(cos_sim)
  });
  return sum_;
}

function toggle_embeddings() {
  if ($('.vector').is(':hidden')) {
    $('.vector').show();
    $('#toggle-embeddings').text('hide embeddings');
  } else {
    $('.vector').hide();
    $('#toggle-embeddings').text('show embeddings');
  }
}


$('#clip-submit-btn').on('click', function() {
    const text = $('#clip-text').val();
    console.log('calculate similarity with CLIP...');
    
    $.post(server_url + '/clip/', {'text': text}, function(result) {

      // parse into json
      result = JSON.parse(result.replace(/'/g, '"'));

      // display text vector
      const text_vec = result['text'].map(i => {return Math.round(i*100)/100});
      $('#clip-text-vec').text('[' + text_vec + ']');

      // display cosine similarity, vector, and softmax for each image
      var max_val = 0;
      var max_id = '';

      $.each(result['images'], function(name, img_res){ 
        const cos_sim = img_res[0];
        const softmax = img_res[1];
        const img_vec = img_res[2].map(i => {return Math.round(i*10)/10});

        const id_name = '#' + name + '-cos';
        const vec_id_name = '#' + name + '-vec';
        const first_line = 'cosine similarity: ' + Math.round(cos_sim * 100) / 100;
        const second_line = 'softmax: ' + Math.round(softmax * 10000) / 100 + '%';
        // third_line = third_line.split + '...' + third_line
        $(id_name).html(first_line + '</br>' + second_line);
        $(vec_id_name).text('[' + img_vec + ']');
        $(id_name).parent().find('img').css('outline', '0px');

        if (cos_sim > max_val) {
          max_val = cos_sim;
          max_id = id_name;
        }
      });

      $(max_id).parent().find('img').css('outline', '10px solid blue');
      $(max_id).parent().find('img').css('outline-offset', '-10px');

    }).fail(function(xhr, status, error) {
      toggle_server_help();
  });;
});


// GAN interactive
$('#gan-submit-btn').on('click', function() {
  console.log('fetching for gan...')
  fetch(server_url + '/gan/').then(response => response.blob())
  .then(imageBlob => {
      console.log('got result');
      // Then create a local URL for that image and print it 
      var urlCreator = window.URL || window.webkitURL;
      var imageUrl = urlCreator.createObjectURL(imageBlob);

      // var img = $('<img />', {src : imageUrl});
      $('#gan-result').attr('src', imageUrl);
      // img.appendTo('body');
  });
});


// CLIPDraw interactive
$('#clip-draw-submit-btn').on('click', function() {
  console.log('starting CLIPDraw...')

  var get_clip_imgs = setInterval(function() { 
    fetch(server_url + '/files/current.png').then(response => response.blob())
    .then(imageBlob => {
        console.log('got new image!');
        // Then create a local URL for that image and print it 
        var urlCreator = window.URL || window.webkitURL;
        var imageUrl = urlCreator.createObjectURL(imageBlob);

        $('#clip-draw-result').attr('src', imageUrl);
    });
  }, 2880);

  var get_clip_update = setInterval(function() { 
    fetch(server_url + "/files/update.json")
    .then(response => response.json())
    .then(json => console.log(json));
  }, 1000);

  let text = $('#clip-draw-text').val();
  let params = '?text=' + text;
  
  $.post(server_url + '/clip_draw', {'text': text}).then(response => {
    console.log('done with CLIPDraw');
    console.log(response);
    clearInterval(get_clip_update);
    clearInterval(get_clip_imgs);
  });
});




document.addEventListener("DOMContentLoaded", function() {
  renderMathInElement(document.body, {
    // customised options
    // • auto-render specific keys, e.g.:
    delimiters: [
        {left: '$$', right: '$$', display: true},
        {left: '$', right: '$', display: false},
        {left: '\\(', right: '\\)', display: false},
        {left: '\\[', right: '\\]', display: true}
    ],
    // • rendering keys, e.g.:
    throwOnError : false
  });
});