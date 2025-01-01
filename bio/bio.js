// https://codepen.io/tomgreener/pen/gRayMz

var x = 0.5;
var y = 0.5;
var maxRotation = 18; 
var perspective = 1000;

$(document).mousemove(function(event){

    // ignore if touch screen.
    if ('ontouchstart' in document.documentElement) {
        return;
    }
    var pos = [event.pageX / document.body.clientWidth, event.pageY / document.body.clientHeight];
    for (var i=0;i < pos.length;i++) {
    if (pos[i]<0) {
        pos[i] = 0;
    }
    if (pos[i]>1) {
        pos[i] = 1;
    }
    }
    pos[0] = Math.round(((pos[0]*2)-1)*maxRotation);
    pos[1] = Math.round(((pos[1]*-2)+1)*maxRotation);
    $("img").css("transform", "perspective(" + perspective + ") rotateX("+pos[1]+"deg) rotateY("+pos[0]+"deg)");
    $("img").css("-webkit-transform", "perspective(" + perspective +    ") rotateX("+pos[1]+"deg) rotateY("+pos[0]+"deg)");
});