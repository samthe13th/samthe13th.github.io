var sliderWidth = 10
var sliderRoundness = 8;
var dragging = { o: null, id: null };
var xoffset;
var Slider = function (stage, x, y, l, m, drag, up) {
    //xoffset = document.getElementById(parentId).getBoundingClientRect().left + window.scrollX;
    console.log("")
    xoffset = stage.canvas.parentNode.offsetLeft + window.scrollX;
    var bar, rtnSlider, label;
    var snap = m;
    var snapTo = [];
    bar = stage.rect(x, y, l, sliderWidth, sliderRoundness).attr({ fill: "white", opacity: 0.5, stroke: "none" });
    rtnSlider = stage.rect(x, y - (sliderWidth / 2), 10, 20).attr({ fill: "white", stroke: "grey" })
        .drag(drag, function () {
            dragging = { o: this };
            console.log("onclick xabs: " + rtnSlider.xabs);
            $("body").css("cursor", "pointer");
        }, function () {
            dragging = { o: null, id: null };
            $("body").css("cursor", "default");
            up();
        });
    rtnSlider.stage = stage;
    rtnSlider.x = x;
    rtnSlider.bar = bar;
    rtnSlider.sliderX = Math.round(x + xoffset);
    console.log("new Slider x: " + rtnSlider.sliderX);
    rtnSlider.sliderY = y;
    rtnSlider.sliderLength = l;
    rtnSlider.xabs = rtnSlider.sliderX;
    rtnSlider.sliderPoint = 0;
    rtnSlider.setColor = function (c) {
        bar.attr({ fill: c });
    }
    rtnSlider.setSnap = function (s) {
        rtnSlider.snap = s;
    }
    rtnSlider.setLabel = function (l) {
        rtnSlider.label = stage.text(rtnSlider.sliderX, (rtnSlider.sliderY - 20), "0 " + l).attr({ "font-size": 20 });
    }
    rtnSlider.hideSlider = function () {
        bar.hide();
        this.hide();
    }
    rtnSlider.setColor = function (c) {
        if (Array.isArray(c)) {
            var grad = "180"
            for (var color in c) {
                grad += "-" + c[color]
            }
            rtnSlider.bar.attr({ fill: grad });
        } else {
            rtnSlider.bar.attr({ fill: c });
        }
    }
    rtnSlider.setSlider = function (p) {
        if (p === "reset") {
            rtnSlider.translate(-1 * (rtnSlider.xabs - rtnSlider.sliderX));
            rtnSlider.label.translate(-1 * (rtnSlider.xabs - rtnSlider.sliderX))
            rtnSlider.xabs = rtnSlider.sliderX;
        } else {
            var div = (rtnSlider.sliderLength - 10) / rtnSlider.snap;
            rtnSlider.xabs += p * div;
            rtnSlider.translate((p * div), 0);
            // rtnSlider.label.translate((p * div), 0);
        }
    }
    rtnSlider.snapTo = snapTo;
    rtnSlider.snap = snap;
    return rtnSlider;
}
function calcSliderX(o){
   // xoffset = document.getElementById(o.parentId).getBoundingClientRect().left + window.scrollX;
    xoffset = o.stage.canvas.parentNode.offsetLeft + window.scrollX;
    console.log("xoffset " + xoffset);
    o.sliderX = Math.round(o.x + xoffset);
    console.log("calc slider x: " + o.sliderX);
}
function calcSliderAbsX(o){
    o.xabs = o.sliderX + ((o.sliderPoint * (o.sliderLength - 10)) / o.snap);
    console.log("calc xabs: " + o.xabs);
}
$("body").mousemove(function (e) {
    $("#op").text(e.pageX);
    var xdiff, moveTo, endPoint;
    var o = dragging.o;
    var trans;
    console.log("px : " + e.pageX);
    if (dragging.o !== null) {
        calcSliderX(o);
        calcSliderAbsX(o);
        if (isNaN(o.xabs) || o.snap === 0) {
            console.log("NAN");
            o.xabs = o.sliderX;
        } else {
            xdiff = e.pageX - o.xabs;
            console.log("xdiff: " + xdiff);
            moveTo = o.xabs + xdiff;
            endPoint = o.sliderX + o.sliderLength - 10;
            if (e.pageX <= o.sliderX) {
                trans = o.sliderX - o.xabs;
                o.xabs = o.sliderX;
            } else if (moveTo >= endPoint) {
                trans = endPoint - o.xabs;
                o.xabs = endPoint;
            } else {
                trans = xdiff;
                o.xabs += xdiff;
            }
            o.translate(trans, 0);
            if (o.label) {
                o.label.translate(trans, 0)
            }
            o.sliderPoint = Math.round((o.snap * (o.xabs - o.sliderX)) / ((o.sliderLength - 10)));
            console.log("SP: " + o.sliderPoint + "e.pageX" + e.pageX + " o.xabs: " + o.xabs + " o.sliderX: " + o.sliderX);
        }
    }
})
