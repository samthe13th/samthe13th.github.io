var sliderWidth = 10
var sliderRoundness = 8;
var dragging = { o: null, id: null };
var xoffset;
var Slider = function (stage, x, y, l, m, drag, up) {
    xoffset = stage.canvas.parentNode.offsetLeft + window.scrollX;
    var bar, rtnSlider, label;
    var snap = m;
    var snapTo = [];
    bar = stage.rect(x, y, l, sliderWidth, sliderRoundness).attr({ fill: "white", opacity: 0.5, stroke: "none" });
    rtnSlider = stage.rect(x, y - (sliderWidth / 2), 10, 20).attr({ fill: "white", stroke: "grey" })
        .drag(drag, function () {
            dragging = { o: this };
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
    rtnSlider.sliderY = y;
    rtnSlider.sliderLength = l;
    rtnSlider.xabs = rtnSlider.sliderX;
    rtnSlider.sliderPoint = 0;
    rtnSlider.units = "";
    rtnSlider.setColor = function (c) {
        bar.attr({ fill: c });
    }
    rtnSlider.setSnap = function (s) {
        rtnSlider.snap = s;
    }
    rtnSlider.setLabel = function (l) {
        rtnSlider.label = stage.text(rtnSlider.sliderX, (rtnSlider.sliderY - 20), "0 " + l).attr({ "font-size": 16, "fill": "white" });
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
            var SP = rtnSlider.sliderPoint;
            var dSP = p - SP;
            var div = (rtnSlider.sliderLength - 10) / rtnSlider.snap;
            rtnSlider.xabs += dSP * div;
            rtnSlider.translate((dSP * div), 0);
            rtnSlider.sliderPoint = p;
            if (rtnSlider.label) {
                rtnSlider.label.translate((p * div), 0);
            }
        }
    }
    rtnSlider.snapTo = snapTo;
    rtnSlider.snap = snap;
    return rtnSlider;
}
function calcSliderX(o) {
    xoffset = o.stage.canvas.parentNode.offsetLeft + window.scrollX;
    o.sliderX = Math.round(o.x + xoffset);
}
function calcSliderAbsX(o) {
    o.xabs = o.sliderX + ((o.sliderPoint * (o.sliderLength - 10)) / o.snap);
}
$("body").mousemove(function (e) {
    $("#op").text(e.pageX);
    var xdiff, moveTo, endPoint;
    var o = dragging.o;
    var trans;
    if (dragging.o !== null) {
        calcSliderX(o);
        calcSliderAbsX(o);
        if (isNaN(o.xabs) || o.snap === 0) {
            o.xabs = o.sliderX;
        } else {
            xdiff = e.pageX - o.xabs;
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
        }
    }
})
