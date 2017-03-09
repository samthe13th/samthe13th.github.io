var sliderWidth = 10
var sliderRoundness = 8;
var dragging = { o: null, id: null };
var xoffset;
var Slider = function (stage, x, y, l, m, drag, up) {
    //xoffset = stage.canvas.parentNode.offsetLeft + window.scrollX;
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
    rtnSlider.mousemove(function (e) {
        console.log("mouse move")
    })
    rtnSlider.x = x;
    rtnSlider.stage = stage;
    rtnSlider.bar = bar;
    rtnSlider.xoffset = stage.canvas.parentNode.offsetLeft
    rtnSlider.sliderX = x + rtnSlider.xoffset;
    console.log("sliderX: " + rtnSlider.sliderX)
    rtnSlider.sliderY = y;
    rtnSlider.sliderLength = l;
    rtnSlider.xabs = rtnSlider.sliderX;
    rtnSlider.sliderPoint = 0;
    rtnSlider.units = "";
    rtnSlider.pageX = 0;
    console.log("offsetleft: " + rtnSlider.stage.canvas.parentNode.offsetLeft + " xoffset: " + rtnSlider.xoffset);
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
        console.log("xabs: " + rtnSlider.xabs);
    }
    rtnSlider.snapTo = snapTo;
    rtnSlider.snap = snap;
    return rtnSlider;
}
function calcSliderX(o) {
    o.xoffset = o.stage.canvas.parentNode.offsetLeft;
    o.sliderX = o.x + o.xoffset;
    console.log("sliderX: " + o.sliderX);
    console.log("offsetleft: " + o.stage.canvas.parentNode.offsetLeft + " xoffset: " + o.xoffset);
}
function calcSliderAbsX(o) {
    o.xabs = o.sliderX + ((o.sliderPoint * (o.sliderLength - (sliderWidth / 2))) / o.snap);
    console.log("xabs: " + o.xabs)
}
function track(o) {
    dragging.o = o;
}
window.onresize = function (event) {

};
$(document).mousemove(function (e) {
   // console.log(e.pageX);
    var xdiff, moveTo, endPoint;
    var o = dragging.o;
    if (dragging.o !== null) {
        console.log("drag")
        if (e.pageX <= o.sliderX) {
            console.log("less")
            o.setAbsX(o.sliderX);
        } else if (e.pageX >= (o.sliderX + o.sliderLength)) {
            console.log("more")
            o.setAbsX(o.sliderX + o.sliderLength - sliderWidth)
        } else {
            console.log("mid")
            o.setAbsX(e.pageX);
        }
        o.sliderPoint = Math.round((o.snap * (o.xoffset + o._.dx - o.sliderX)) / (o.sliderLength - sliderWidth));

        // o.pageX = e.pageX;
        // calcSliderX(o);
        // calcSliderAbsX(o);
        // if (isNaN(o.xabs) || o.snap === 0) {
        //     o.xabs = o.sliderX;
        // } else {
        //     // xdiff = e.pageX - o.xabs + window.scrollX;
        //     // moveTo = o.xabs + xdiff;
        //     // endPoint = o.sliderX + o.sliderLength - 10;
        //     // if (e.pageX <= (o.sliderX + window.scrollX)) {
        //     //     trans = o.sliderX - o.xabs;
        //     //     o.xabs = o.sliderX;
        //     // } else if (moveTo >= endPoint) {
        //     //     trans = endPoint - o.xabs;
        //     //     o.xabs = endPoint;
        //     // } else {
        //     //     trans = xdiff;
        //     //     console.log("trans: " + trans);
        //     //     o.xabs += xdiff;
        //     // }
        //     // o.translate(trans, 0);
        //     //o.setAbsX(o.pageX)
        //     if (o.label) {
        //         o.label.translate(trans, 0)
        //     }
        //     o.sliderPoint = Math.round((o.snap * (o.xabs - o.sliderX)) / ((o.sliderLength - 10)));
        //}
    }
})