// apply svg to each links so don't have to copy paste a bunch
// animation from https://codepen.io/aaroniker/pen/VwjexVy
const links = document.querySelectorAll('.about a');

for (let i=0;i<links.length; i++) {
    links[i].innerHTML += '<svg viewBox="0 0 70 36"><path d="M6.9739 30.8153H63.0244C65.5269 30.8152 75.5358 -3.68471 35.4998 2.81531C-16.1598 11.2025 0.894099 33.9766 26.9922 34.3153C104.062 35.3153 54.5169 -6.68469 23.489 9.31527" /></svg>';
}

// https://codepen.io/tomgreener/pen/gRayMz

var x = 0.5;
var y = 0.5;
var maxRotation = 18; 
var perspective = 1000;

// $(document).mousemove(function(event){
//     var pos = [event.pageX / document.body.clientWidth, event.pageY / document.body.clientHeight];
//     for (var i=0;i < pos.length;i++) {
//     if (pos[i]<0) {
//         pos[i] = 0;
//     }
//     if (pos[i]>1) {
//         pos[i] = 1;
//     }
//     }
//     pos[0] = Math.round(((pos[0]*2)-1)*maxRotation);
//     pos[1] = Math.round(((pos[1]*-2)+1)*maxRotation);
//     $("img").css("transform", "perspective(" + perspective + ") rotateX("+pos[1]+"deg) rotateY("+pos[0]+"deg)");
//     $("img").css("-webkit-transform", "perspective(" + perspective +    ") rotateX("+pos[1]+"deg) rotateY("+pos[0]+"deg)");

//     $("video").css("transform", "perspective(" + perspective + ") rotateX("+pos[1]+"deg) rotateY("+pos[0]+"deg)");
//     $("video").css("-webkit-transform", "perspective(" + perspective +    ") rotateX("+pos[1]+"deg) rotateY("+pos[0]+"deg)");
// });

$(document).ready(function() {
    $('video').prop('muted',true).play()
});