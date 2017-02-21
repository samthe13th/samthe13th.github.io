//$("#mascot").attr("src", "assets/spinner/spinner0001.png");
/*
$("#mascot").attr({src: "assets/mascat/mascat0001.png"});
var cx, cy, mx, my, ca;
$("#splash").mousemove(function (event) {
    var msg = "Handler for .mousemove() called at ";
    cx = $(window).width() / 2;
    cy = Math.round($("#mascot").offset().top + 100);
    mx = event.pageX;
    my = event.pageY;
    ca = angle();
    update();
    //   msg += mx + ", " + my + " xHalf: " + cx + " yHalf: " + cy + " angle: " + angle();
    //  $("#testOP").text(msg);
});

function angle() {
    var dx = mx - cx;
    var dy = my - cy;
    var add = 90;
    if (dx < 0) {
        add = 270;
    }
    return Math.round((Math.atan(dy / dx) * (180 / Math.PI) + add) / 10) * 10;
}

function update() {
    var a = (ca / 10) + 1;
    var frame = "mascat00";
    if (a < 10) {
        frame += "0" + a;
    } else {
        frame += a;
    }
    frame += ".png";
    msg = frame;
    //$("#testOP").text(msg);
    if (frame !== "mascat00NaN.png") {
        $("#mascot").attr({src: "assets/mascat/" + frame});
    }
}
*/
$('#mascat').sprite({fps: 12, no_of_frames: 36});
