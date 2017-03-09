var sliderWidth = 10
var sliderRoundness = 8;
var dragging = { o: null, id: null };
var Slider = function (stage, x, y, l, m, drag, up) {
    var bar, rtnSlider, label;
    var snap = m;
    var snapTo = [];
    bar = stage.rect(x, y, l, sliderWidth, sliderRoundness).attr({ fill: "white", opacity: 0.5, stroke: "none" });
    rtnSlider = stage.rect(x, y - (sliderWidth / 2), 10, 20).attr({ fill: "white", stroke: "grey" })
        .drag(drag, function () {
            dragging = { o: this };
            $("body").css("cursor", "pointer");
            calcSliderX(this);
            calcSliderAbsX(this);
        }, function () {
            dragging = { o: null, id: null };
            $("body").css("cursor", "default");
            up();
        });
    rtnSlider.x = x;
    rtnSlider.stage = stage;
    rtnSlider.bar = bar;
    rtnSlider.xoffset = stage.canvas.parentNode.offsetLeft;
    rtnSlider.sliderX = x + rtnSlider.xoffset;
    rtnSlider.sliderY = y;
    rtnSlider.sliderLength = l;
    rtnSlider.xabs = rtnSlider.sliderX;
    rtnSlider.sliderPoint = 0;
    rtnSlider.units = "";
    rtnSlider.pageX = 0;
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
        var toPoint = p;
        if (p < 0) {
            toPoint = 0;
        } else if (p > rtnSlider.snap) {
            toPoint = rtnSlider.snap;
        }
        var SP = rtnSlider.sliderPoint;
        var dSP = toPoint - SP;
        var div = (rtnSlider.sliderLength - 10) / rtnSlider.snap;
        rtnSlider.xabs += dSP * div;
        rtnSlider.translate((dSP * div), 0);
        rtnSlider.sliderPoint = toPoint;
        if (rtnSlider.label) {
            rtnSlider.label.translate((toPoint * div), 0);

        }
    }
    rtnSlider.setAbsX = function (x) {
        var newx = x - rtnSlider._.dx - rtnSlider.xoffset;
        rtnSlider.translate(newx, 0);
        this.xabs = x;
    }
    rtnSlider.snapTo = snapTo;
    rtnSlider.snap = snap;
    return rtnSlider;
}
function calcSliderX(o) {
    o.xoffset = o.stage.canvas.parentNode.offsetLeft;
    o.sliderX = o.xoffset;
}
function calcSliderAbsX(o) {
    o.xabs = o.sliderX + ((o.sliderPoint * (o.sliderLength - (sliderWidth / 2))) / o.snap);
}
$(document).mousemove(function (e) {
    var xdiff, moveTo, endPoint;
    var o = dragging.o;
    if (dragging.o !== null) {
        if (e.pageX <= o.sliderX + o.x) {
            o.setAbsX(o.sliderX);
        } else if (e.pageX >= (o.x + o.sliderX + o.sliderLength - sliderWidth)) {
            o.setAbsX(o.sliderX + o.sliderLength - sliderWidth)
        } else {
            o.setAbsX(e.pageX - o.x);
        }
        o.sliderPoint = Math.round((o.snap * (o.xoffset + o._.dx - o.sliderX)) / (o.sliderLength - sliderWidth));
    }
})