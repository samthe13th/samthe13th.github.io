var preview, hexText, hueString, colorGrad, lumBar, hueBar, satColor, satGrad, satBar, blendL, blendR, blendM;
var r = 160;
var r2 = 80;
var segs = 3;
var padding = 0;
var offx = 25;
var offy = 15;
var mx, my, amx, amy;
var globalHsl = { h: 0, s: 0, l: 0 };
var pcX = r + offx;
var pcY = r + offy;
var paper = Raphael("left", 600, 520);
var segments = paper.set();
var hoverSegs = paper.set();
var palette = paper.set();
var moveColor = $("#move-color");
var blank = "#e8eef7";
var colors = [blank, blank, blank];
var dragging = { o: null, id: null }
var sliderWidth = 10
var sliderRoundness = 8;
var sliderLength = 180;
var sliderX = 400;
var start = function () {
    this.lastdx ? this.odx += this.lastdx : this.odx = 0;
    this.lastdy ? this.ody += this.lastdy : this.ody = 0;
    window.currentThing = this;
    $("body").css("cursor", "none");
    makeSwatch(this.attrs.fill, this.attrs.cx, this.attrs.cy);
}
var move = function (dx, dy) {
    this.transform("T" + (dx + this.odx) + "," + (dy + this.ody));
    this.lastdx = dx;
    this.lastdy = dy;
}
var up = function () {
    var paint = window.currentThing.attrs.fill;
    this.animate({ "fill-opacity": 1 }, 500);
    window.currentThing = this;
    $("body").css("cursor", "default");
    if (window.dropOn != null) {
        window.dropOn.paint = paint;
    }
    this.remove();
}
function update() {
    segments.forEach(function (e) {
        e.attr({ fill: (e.paint) })
    })
}
function makePalette() {
    for (var i = 0; i < colors.length; i++) {
        var newP = paper.path(makeSeg(i, colors.length))
            .attr({ stroke: "#fff", "stroke-width": 3, fill: colors[i] })
            .mouseover(function () {
                window.dropOn = this;
                console.log("over segment " + this.id)
                if (moveColor.css("visibility") === "visible") {
                    $("body").css("cursor", "cell");
                    this.attr({ "fill": moveColor.css("background-color") });
                } else {
                    $("body").css("cursor", "pointer");
                }
            })
            .mouseout(function () {
                $("body").css("cursor", "default");
                this.attr({ "fill": this.paint });
                window.dropOn = null;
            })
            .mouseup(function () {
                if (moveColor.css("visibility") === "visible") {
                    this.paint = moveColor.css("background-color");
                    $("body").css("cursor", "pointer");
                    moveColor.css("visibility", "hidden")
                } else {
                    var newColor = "#" + tinycolor(this.attrs.fill).toHex();
                    preview.attr("fill", newColor);
                    hexText.attr('text', newColor);
                    globalHsl = tinycolor(this.attrs.fill).toHsl();
                    updateSliders();
                    updateSwatches("#" + tinycolor(this.attrs.fill).toHex());
                }
            })
        newP.update = function () {
            var dx, dy;
            dx = e.pageX - o.attrs.cx + 20;
            dy = e.pageY - o.attrs.cy + 20;
            newP.translate(dx, dy);
            newP.attrs.cx += dx;
            newP.attrs.cy += dy;
        }
        newP.paint = colors[i];
        newP.id = i;
        newP.fillable = true;
        segments.push(newP);
    }
}
function deletePalette() {
    segments.forEach(function (s) {
        s.remove();
    })
    hoverSegs.forEach(function (hs) {
        hs.remove();
    })
    segments = [];
}
function addSeg(i, n) {
    var defaultColor = blank;
    var newP = paper.path(makeSeg(i, n))
        .attr({ stroke: " #ebedf1", "stroke-width": 3, fill: defaultColor, id: ("seg" + i) })
        .click(function () {
            preview.attr("fill", this.attrs.fill);
        })
        .mouseover(function () {
            $("body").css("cursor", "pointer");
            console.log("over segment: ");
        })
        .mouseout(function () {
            $("body").css("cursor", "default");
        })
    newP.paint = defaultColor;
    newP.fillable = "true";
    segments.push(newP);
    return newP
}
function makeSeg(i, n) {
    var path = "M" + (pcX + (r * Math.cos((i - 1) * 2 * Math.PI / n))) + " " + (pcY + (r * Math.sin((i - 1) * 2 * Math.PI / n))) + " "
        + "A " + r + " " + r + ", 0, 0, 1," + " " + (pcX + (r * Math.cos(i * 2 * Math.PI / n))) + " " + (pcY + (r * Math.sin(i * 2 * Math.PI / n))) + " "
        + "L " + (pcX + (r2 * Math.cos(i * 2 * Math.PI / n))) + " " + (pcY + (r2 * Math.sin(i * 2 * Math.PI / n))) + " "
        + "A" + r2 + " " + r2 + ", 0, 0, 0, " + (pcX + (r2 * Math.cos((i - 1) * 2 * Math.PI / n))) + " " + (pcY + (r2 * Math.sin((i - 1) * 2 * Math.PI / n))) + " "
        + "Z' stroke='white'";
    return path;
}
function makeHoverSeg(i, n) {
    var off = 5;
    var div = 3;
    var off2 = (Math.PI / 16);
    var path = "M" + (pcX + ((r + off) * Math.cos((i * 2 * Math.PI / n) - off2))) + " " + (pcY + ((r + off) * Math.sin((i * 2 * Math.PI / n) - off2))) + " "
        + "A " + (r + off) + " " + (r + off) + ", 0, 0, 1," + " " + (pcX + ((r + off) * Math.cos((i * 2 * Math.PI / n) + off2))) + " " + (pcY + ((r + off) * Math.sin((i * 2 * Math.PI / n) + off2))) + " "
        + "L " + (pcX + ((r2 - off) * Math.cos((i * 2 * Math.PI / n) + off2))) + " " + (pcY + ((r2 - off) * Math.sin((i * 2 * Math.PI / n) + off2))) + " "
        + "A" + (r2 - off) + " " + (r2 - off) + ", 0, 0, 0, " + (pcX + ((r2 - off) * Math.cos((i * 2 * Math.PI / n) - off2))) + " " + (pcY + ((r2 - off) * Math.sin((i * 2 * Math.PI / n) - off2))) + " "
        + "Z' stroke='white'";
    return path;
}
function makeColorPreview() {
    preview = paper.rect(padding + 400, padding + 10, 60, 60, 12);
    preview.attr({ "fill": "white", "stroke": "none" })
        .mousedown(function () {
            pickColor(this.attrs.fill);
        })
        .mouseover(function () {
            $("body").css("cursor", "pointer");
            this.attr({ "stroke": "white", "stroke-width": 2 });
            if (window.currentThing && window.currentThing.id === this.id) {
                update();
                window.dropOn = null;
            }
        })
        .mouseout(function () {
            $("body").css("cursor", "default");
            this.attr({ "stroke": "none" });
        });
    preview.x = 385;
    preview.y = 75;
    var hex = preview.attrs.fill;
    hexText = paper.text(padding + 470, padding + 40, hex)
        .attr({ "font-size": 26, "text-anchor": "start", "fill": "grey" })
}
function updatePreview(c) {
    preview.attr("fill", c);
}
function getCombinations(c) {
    var combos = {}
    var comp = tinycolor(c).complement().toHexString();
    combos.complement = [c, comp];
    combos.split = tinycolor(c).splitcomplement().map(function (t) { return t.toHexString() });
    combos.triad = tinycolor(c).triad().map(function (t) { return t.toHexString() });
    combos.tetrad = tinycolor(c).tetrad().map(function (t) { return t.toHexString() });
    combos.analogous = tinycolor(c).analogous().map(function (t) { return t.toHexString() });
    combos.monochromatic = tinycolor(c).monochromatic().map(function (t) { return t.toHexString() });
    return combos;
}
function makeSwatches(c) {
    var count = 0;
    var xpos = 0;
    var ypos = padding + 410;
    var ypos2 = ypos + 70;
    var colors = getCombinations(c)
    for (var a in colors) {
        var cLength = colors[a].length
        var xoff = 0;
        var yoff = 25;
        var ytitle = 20;
        var xstart, ystart;
        if (count !== 12) {
            xstart = xpos;
            ystart = ypos;
        } else {
            xstart = 0;
            ystart = ypos2;
        }
        paper.path("M" + (xstart + xoff) + " " + (ystart - yoff - ytitle) + " l" + (cLength * 50) + " " + 0 + " l0 70 l" + (-(cLength * 50)) + " " + 0 + " Z")
            .attr({ "stroke": "#e8eef7", "stroke-width": 2, "fill": "white" });
        paper.text((xstart + 10), (ystart - 32), a).attr({ "font-size": 14, "fill": "#b6c3d6", "text-anchor": "start" })
        for (var i = 0; i < cLength; i++) {
            count++;
            if (count === 13) {
                xpos = 50;
                ypos = ypos2;
            } else {
                xpos += 50;
            }
            palette.push(makeSwatch(colors[a][i], xpos, ypos));
        }
    }
}
function makeSwatch(color, x, y) {
    var swatch = paper.circle(x - 25, y, 20)
        .attr({ "fill": color, "stroke": "#e8eef7" })
        .mousedown(function () {
            pickColor(this.attrs.fill);
        })
        .mouseover(function () {
            $("body").css("cursor", "pointer");
            this.attr({ "stroke": "white", "stroke-width": 2 });
            if (window.currentThing && window.currentThing.id === this.id) {
                update();
                window.dropOn = null;
            }
        })
        .mouseout(function () {
            $("body").css("cursor", "default");
            this.attr({ "stroke": "none" });
        });
    swatch.onDragOver(function (e) {
        if (e.fillable === true) {
            window.dropOn = e;
            var newFill = window.currentThing.attr("fill");
            e.attr("fill", newFill);
        }
    })
    if (color === "black") {
        swatch.attr({ "stroke": "#ffffff", "stroke-width": 2 });
    };
    return swatch;
}
function getNewPalette(x) {
    var newSet = {};
    var offset = 0;
    for (var i = 0; i < (segments.length + 1); i++) {
        if (i === x) {
            offset = 1;
            newSet[i] = addSeg(i, segments.length);
        } else {
            newSet[i] = segments[i - offset];
        }
    }
    return newSet;
}
function pickColor(c) {
    moveColor.css({
        "background-color": c,
        "visibility": "visible"
    })
}
function updateColorArray(x,c) {
    var offset = 0;
    colors = [];
    for (var i = 0; i < (segments.length + 1); i++) {
        if (i === x) {
            offset = 1;
            colors.push(c);
        } else {
            colors.push(segments[i - offset].attrs.fill);
        }
    }
}
function makeHoverSegs() {
    for (var i = 0; i < segs; i++) {
        var testHover = paper.path(makeHoverSeg(i, colors.length))
            .attr({ "fill": blank, "stroke": "white", "stroke-width": 5, "opacity": 0 })
            .mouseover(function () {
                var segL = segments[this.id];
                var segR = segments[this.id + 1];
                var mix = mixColors(tinycolor(segL.attrs.fill).toRgb(), tinycolor(segR.attrs.fill).toRgb(), 0.5);
                $("body").css("cursor", "pointer");
                this.attr({ "opacity": 1, "fill": mix });
                this.mix = mix;
                console.log("over hover seg " + this.id);
                console.log("near seg " + segments[this.id].attrs.fill);
            })
            .mouseout(function () {
                $("body").css("cursor", "default");
                this.attr({ "opacity": 0 })
            })
            .click(function () {
                segs++;
                updatePalette(this.id,this.mix);
            });
        testHover.id = i;
        hoverSegs.push(testHover);
    }
}
function updatePalette(i,c) {
    updateColorArray((i + 1),c);
    deletePalette();
    makePalette();
    makeHoverSegs();
}
function getColorGrad() {
    var revColorGrad = colorGrad.reverse();
    var fill = "180"
    for (var i = 0; i < revColorGrad.length; i++) {
        fill += "-" + revColorGrad[i];
    }
    return fill;
}
function updateSliders() {
    var h = globalHsl.h;
    var s = globalHsl.s;
    var l = globalHsl.l;
    var lumGrad, satGrad;
    huePos = h / 2;
    satPos = s * 180;
    lumPos = l * 180;
    hueSlider.transform(("T" + huePos + "," + 0));
    hueSlider.xabs = 400 + huePos;
    lumSlider.transform(("T" + lumPos + "," + 0));
    lumSlider.xabs = 400 + lumPos;
    lumGrad = "180-#fff-#" + tinycolor({ h, s, l: 0.5 }).toHex() + "-#000";
    lumBar.attr({ gradient: lumGrad });
    satSlider.transform(("T" + satPos + "," + 0));
    satSlider.xabs = 400 + satPos;
    satGrad = "180-#" + tinycolor({ h, s: 1.0, l: 0.5 }).toHex() + "-grey";
    satBar.attr({ gradient: satGrad });
}
function updateSwatches(c) {
    console.log("UPDATE SWATCHES")
   // var c = preview.attrs.fill;
    var colors = getCombinations(c);
    console.log("colors: " + JSON.stringify(colors));
    var count = 0;
    for (var a in colors) {
        console.log("a: " + a);
        for (var i = 0; i < colors[a].length; i++) {
            palette[count].attr({ "fill": colors[a][i] })
            count++;
        }
    }
}
var startSlider = function () {
    this.lastdx ? this.odx += this.lastdx : this.odx = 0;
    this.lastdy ? this.ody += this.lastdy : this.ody = 0;
}
function drawBlender() {
    blendL = blendContainer(0, 1, 1, 0, true);
    blendR = blendContainer(1, 0, 0, 1, true);
    blendM = blendContainer(0, 1, 0, 1, false);
}
function blendContainer(a, b, c, d, fillable) {
    var r = 50;
    var x1 = padding + 485;
    var y1 = padding + 310;
    var space = 80;
    var bc = paper.path("M " + x1 + " " + y1 + " "
        + "A " + r + " " + r + ", 0," + a + "," + b + ", " + x1 + " " + (y1 - space) + " "
        + "A " + r + " " + r + ", 0," + c + "," + d + ", " + " " + x1 + " " + y1)
        .attr({ "stroke": "#e8eef7", "stroke-width": 3, "fill": "white" })
    if (fillable) {
        bc.mouseover(function () {
            console.log("over");
            window.dropOn = this;
            if (moveColor.css("visibility") === "visible") {
                $("body").css("cursor", "cell");
                this.attr({ "fill": moveColor.css("background-color") });
            } else {
                $("body").css("cursor", "pointer");
            }
        })
        bc.paint = "white";
        bc.fillable = true;
    }
    bc.mouseout(function () {
        $("body").css("cursor", "default");
        this.attr({ "fill": this.paint });
        window.dropOn = null;
    })
        .click(function () {
            if (moveColor.css("visibility") === "visible") {
                this.paint = moveColor.css("background-color");
                $("body").css("cursor", "pointer");
                var mix = mixColors(tinycolor(blendL.attrs.fill).toRgb(), tinycolor(blendR.attrs.fill).toRgb(), 0.5);
                blendM.attr({ "fill": mix });
                blendM.paint = mix;
                moveColor.css("visibility", "hidden");
            } else {
                // preview.attr("fill", this.attrs.fill);
                // hexText.attr('text', this.attrs.fill);
                // globalHsl = tinycolor(this.attrs.fill).toHsl();
                // updateSliders();
                // updateSwatches("#" + tinycolor(this.attrs.fill.toHex()));
                pickColor(this.attrs.fill);
            }
        })
    return bc;
}
function getBoundedPos(x, dx, min, max) {
    var xpos = Math.min(Math.max((x + dx), min), max);
    return xpos;
}
function mixColors(s1, s2, t) {
    var blend = {}
    blend.r = Math.round(Math.sqrt((1 - t) * Math.pow(s1.r, 2) + 0.5 * Math.pow(s2.r, 2)));
    blend.g = Math.round(Math.sqrt((1 - t) * Math.pow(s1.g, 2) + 0.5 * Math.pow(s2.g, 2)));
    blend.b = Math.round(Math.sqrt((1 - t) * Math.pow(s1.b, 2) + 0.5 * Math.pow(s2.b, 2)));
    return ("#" + tinycolor(blend).toHex());
}
function plusSlider() {
    hueSlider.translate(20, 0);
    hueSlider.xabs += 20;
}
paper.rect(padding - 5, padding - 15, 380, 365).attr({
    stroke: "#ebedf1",
    "stroke-width": 2,
    fill: "white"
})
paper.rect(padding - 5 + 380, padding - 15, 225, 365).attr({
    stroke: "#ebedf1",
    "stroke-width": 2,
    fill: "white"
})
paper.rect(padding - 5 + 380, padding - 15 + 200, 225, 165).attr({
    stroke: "#ebedf1",
    "stroke-width": 2,
    fill: "white"
})
makeColorPreview();
makePalette();
makeSwatches("#90ee90");
makeHoverSegs();
drawBlender();
colorGrad = ["#f00", "#ff5600", "#ffab00", "#feff00", "#a9ff00", "#56ff00", "#0f0", "#00ff54", "#00ffa8", "#0ff", "#00abff", "#0056ff", "#00f", "#5400ff", "#fd00ff", "#ff00ac", "#ff0053", "#ff0001"];
hueString = getColorGrad();
lumBar = paper.rect(padding + sliderX, 100, sliderLength, sliderWidth, sliderRoundness).attr({
    stroke: "#lightgrey",
    fill: "180-#fff-#000"
});
hueBar = paper.rect(padding + sliderX, 130, sliderLength, sliderWidth, sliderRoundness).attr({
    stroke: "#lightgrey",
    fill: hueString
});
satColor = tinycolor("hsl " + tinycolor(preview.attrs.fill).toHsl().h + " 1.0 0.9").toHex();
satGrad = "180-#" + satColor + "-grey"
satBar = paper.rect(padding + sliderX, 160, sliderLength, sliderWidth, sliderRoundness).attr({
    stroke: "#white",
    fill: satGrad
});
mixColors(tinycolor("blue").toRgb(), tinycolor("red").toRgb(), 0.5);
lumSlider = paper.rect(400, 95, 10, 20).attr({ fill: "white" })
    .mousedown(function () {
        dragging = { o: this, id: "lum" }
    })
lumSlider.update = function () {
    globalHsl.l = (this.xabs - 400) / 180;
    newColor = "#" + tinycolor(globalHsl).toHex();
    preview.attr("fill", newColor);
    hexText.attr('text', newColor);
}
hueSlider = paper.rect(400, 125, 10, 20).attr({ fill: "white" })
    .mousedown(function () {
        dragging = { o: this, id: "hue" };
    })
hueSlider.update = function () {
    var newColor;
    globalHsl.h = (this.xabs - 400) * 2;
    newColor = "#" + tinycolor(globalHsl).toHex();
    preview.attr("fill", newColor);
    hexText.attr('text', newColor);
}
hueSlider.xpos = 0;
satSlider = paper.rect(400, 155, 10, 20).attr({ fill: "white" })
    .mousedown(function () {
        dragging = { o: this, id: "sat" };
    })
satSlider.update = function () {
    globalHsl.s = (this.xabs - 400) / 180;
    newColor = "#" + tinycolor(globalHsl).toHex();
    preview.attr("fill", newColor);
    hexText.attr('text', newColor);
}
hueSlider.xabs = 400;
satSlider.xabs = 400;
lumSlider.xabs = 400;
preview.attr("fill", "lightgreen");
hexText.attr('text', "#" + tinycolor("#90ee90").toHex());
globalHsl = tinycolor("lightgreen").toHsl();
updateSliders();
document.onmouseup = function (e) {
    if (dragging.id === "hue" || dragging.id === "sat" || dragging.id === "lum") {
        dragging = { o: null, id: null };
        updateSliders();
        updateSwatches("#" + tinycolor(preview.attrs.fill).toHex());
    }
    if (eyedropper) {
        // makeSwatches(pickpxl);
        // preview.attr("fill", pickpxl);
        // hexText.attr('text', pickpxl);
        // globalHsl = tinycolor(pickpxl).toHsl();
        // updateSliders();
        // updateSwatches();
         pickColor(pickpxl);
    }
}
document.onmousemove = function (e) {
    var xdiff;
    var moveTo;
    var mousePos = getMousePos(canvas, e);
    mx = mousePos.x;
    my = mousePos.y;
    amx = e.pageX;
    amy = e.pageY;
    $("#move-color").css({
        left: e.pageX + 15,
        top: e.pageY + 15
    })
    getPxlData(mx, my);
    if ((mx - picoff.x) < pwidth && (mx - picoff.x) > 0 && (my - picoff.y) > 0 && (my - picoff.y) < pheight) {
        eyedropper = true;
    } else {
        eyedropper = false;
    }
    if (dragging && dragging.o) {
        var o = dragging.o;
        if (dragging.id === "hue" || dragging.id === "sat" || dragging.id === "lum") {
            o.update();
            xdiff = e.pageX - o.xabs;
            moveTo = o.xabs + xdiff;
            var endPoint = 400 + sliderLength;
            if (moveTo <= 400) {
                var toLeft = 400 - o.xabs;
                o.translate(toLeft, 0);
                o.xabs = 400;
            } else if (moveTo >= endPoint) {
                var toRight = endPoint - o.xabs;
                o.translate(toRight, 0);
                o.xabs = endPoint;
            } else {
                o.translate(xdiff, 0);
                o.xabs += xdiff;
            }
        }
    }
}