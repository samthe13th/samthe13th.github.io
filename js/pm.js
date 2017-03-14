'use strict'

var preview, hexText, hueString, colorGrad, lumBar, hueBar, satColor, satGrad, satBar, blendL, blendR, blendM, mx, my, f, pwidth, pheight, lumSlider, hueSlider, satSlider;
var r = 160;
var r2 = 80;
var padding = 0;
var offx = 28;
var offy = 57;
var maxSegs = 12;
var globalHsl = { h: 0, s: 0, l: 0 };
var pcX = r + offx;
var pcY = r + offy;
var paper = Raphael("left", 600, 600);
var segments = paper.set();
var hoverSegs = paper.set();
var palette = paper.set();
var moveColor = $("#move-color");
var blank = "#e8eef7";
var colors = [blank, blank, blank, blank, blank, blank];
var sliderLength = 180;
var sliderX = 400;
var colorMode = "RGB";
var mypic = new Image();
var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
var pickpxl = "";
var eyedropper = false;
var picoff = { x: 0, y: 0 };

//Read uploaded image file
function readFile() {
    if (this.files && this.files[0]) {
        var FR = new FileReader();
        FR.addEventListener("load", function (e) {
            // document.getElementById("myImage").src = e.target.result;
            // document.getElementById("b64").innerHTML = e.target.result;
            mypic.src = e.target.result;
            setUpCanvas();
            getPxlData(50, 50);
        });
        FR.readAsDataURL(this.files[0]);
    }
}

//Resize and draw uploaded image onto canvas
function setUpCanvas() {
    if (mypic.width > mypic.height) {
        f = 300 / mypic.width;
    } else {
        f = 300 / mypic.height;
    }
    pwidth = mypic.width * f;
    pheight = mypic.height * f;
    picoff.x = (300 - pwidth) / 2;
    picoff.y = (300 - pheight) / 2;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(mypic, picoff.x, picoff.y, pwidth, pheight);
}

//Get pxl data from image given x and y coords
function getPxlData(xpxl, ypxl) {
    var idata = ctx.getImageData(xpxl, ypxl, 1, 1).data;
    pickpxl = "#" + tinycolor({ r: idata["0"], g: idata["1"], b: idata["2"] }).toHex();
    $("#pickcolorpreview").css({
        "background-color": pickpxl
    })
}

//Get eyedropper position
function getMousePos(canvas, evt) {
    var rect = canvas.getBoundingClientRect();
    return {
        x: evt.pageX - window.scrollX - rect.left,
        y: evt.pageY - window.scrollY - rect.top
    };
}

//Show color table window
function showTable() {
    $("#css-window").css("visibility", "hidden");
    var mytable = $("#table-window");
    updateTable();
    mytable.css("visibility", "visible");
}

function showPalette() {
    $("#css-window").css("visibility", "hidden");
    $("#table-window").css("visibility", "hidden");
}

//Update color table
function updateTable() {
    var mytable = $("#color-table");
    var colorObj;
    mytable.html("<tr><th></th><th>Swatch</th><th>Hex</th><th><button id='RGBbtn' onclick='toggleColorMode(\"RGB\")'>RGB</button><button id='HSLbtn' onclick='toggleColorMode(\"HSL\")'>HSL</button></th></tr>");
    for (var i = 0; i < segments.length; i++) {
        var rgb_obj = "rgb(" + tinycolor(segments[i].attrs.fill).toRgb().r + ", " + tinycolor(segments[i].attrs.fill).toRgb().g + ", " + tinycolor(segments[i].attrs.fill).toRgb().b + ")";
        var hsl_obj = "hsl(" + Math.round(tinycolor(segments[i].attrs.fill).toHsl().h) + ", " + Math.round(100 * tinycolor(segments[i].attrs.fill).toHsl().s) + "%, " + Math.round(100 * tinycolor(segments[i].attrs.fill).toHsl().l) + "%)";
        if (colorMode === "HSL") {
            colorObj = hsl_obj;
        } else {
            colorObj = rgb_obj;
        }
        mytable.append("<tr>"
            + "<td><button class='delete-swatch' onclick='delete-swatch()'>X</button></td>"
            + "<td><div class='table-swatch' style='background-color: " + segments[i].attrs.fill + "'></div></td>"
            + "<td>" + "#" + tinycolor(segments[i].attrs.fill).toHex() + "</td>"
            + "<td>" + colorObj + "</td>"
            + "</tr>"
        )
    }
}

//change color mode on color table to display HSL or RGB values
function toggleColorMode(c) {
    colorMode = c;
    updateTable();
}

//Update fill of palette segments
function update() {
    segments.forEach(function (e) {
        e.attr({ fill: (e.paint) })
    })
}

//Make a new circular palette with svg segments
function makePalette() {
    for (var i = 0; i < colors.length; i++) {
        var newP = paper.path(makeSeg(i, colors.length))
            .attr({ stroke: "#fff", "stroke-width": 3, fill: colors[i], id: i })
            .mouseover(function () {
                segments[this.id].attr({ "stroke-width": 7 });
                window.dropOn = this;
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
                if (segments[this.id].select !== true) {
                    segments[this.id].attr({ "stroke-width": 3 });
                }
            })
            .mouseup(function () {
                if (moveColor.css("visibility") === "visible") {
                    this.paint = moveColor.css("background-color");
                    $("body").css("cursor", "pointer");
                    moveColor.css("visibility", "hidden");
                    colors.splice(this.id, 1, tinycolor(this.paint).toHex());
                } else {
                    var newColor = "#" + tinycolor(this.attrs.fill).toHex();
                    segments.forEach(function (s) {
                        s.attr({ "stroke-width": 3 });
                        s.select = false;
                    })
                    segments[this.id].select = true;
                    segments[this.id].attr({ "stroke-width": 10 });
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
        newP.select = false;
        segments.push(newP);
    }
}

//Delete circular palette
function deletePalette() {
    segments.forEach(function (s) {
        s.remove();
    })
    hoverSegs.forEach(function (hs) {
        hs.remove();
    })
    segments = [];
}

//Return a Raphael.js path to draw a palette segment
function makeSeg(i, n) {
    var path = "M" + (pcX + (r * Math.cos((i - 1) * 2 * Math.PI / n))) + " " + (pcY + (r * Math.sin((i - 1) * 2 * Math.PI / n))) + " "
        + "A " + r + " " + r + ", 0, 0, 1," + " " + (pcX + (r * Math.cos(i * 2 * Math.PI / n))) + " " + (pcY + (r * Math.sin(i * 2 * Math.PI / n))) + " "
        + "L " + (pcX + (r2 * Math.cos(i * 2 * Math.PI / n))) + " " + (pcY + (r2 * Math.sin(i * 2 * Math.PI / n))) + " "
        + "A" + r2 + " " + r2 + ", 0, 0, 0, " + (pcX + (r2 * Math.cos((i - 1) * 2 * Math.PI / n))) + " " + (pcY + (r2 * Math.sin((i - 1) * 2 * Math.PI / n))) + " "
        + "Z' stroke='white'";
    return path;
}

//Return a Raphael.js path to draw a hover-able blend button between palette segments (hidden by default)
function makeHoverSeg(i, n) {
    var off = 5;
    var div = 3;
    var off2 = (Math.PI / 20);
    var path = "M" + (pcX + ((r + off) * Math.cos((i * 2 * Math.PI / n) - off2))) + " " + (pcY + ((r + off) * Math.sin((i * 2 * Math.PI / n) - off2))) + " "
        + "A " + (r + off) + " " + (r + off) + ", 0, 0, 1," + " " + (pcX + ((r + off) * Math.cos((i * 2 * Math.PI / n) + off2))) + " " + (pcY + ((r + off) * Math.sin((i * 2 * Math.PI / n) + off2))) + " "
        + "L " + (pcX + ((r2 - off) * Math.cos((i * 2 * Math.PI / n) + off2))) + " " + (pcY + ((r2 - off) * Math.sin((i * 2 * Math.PI / n) + off2))) + " "
        + "A" + (r2 - off) + " " + (r2 - off) + ", 0, 0, 0, " + (pcX + ((r2 - off) * Math.cos((i * 2 * Math.PI / n) - off2))) + " " + (pcY + ((r2 - off) * Math.sin((i * 2 * Math.PI / n) - off2))) + " "
        + "Z' stroke='white'";
    return path;
}

//Make an svg rectangle representing the current selected color
function makeColorPreview() {
    preview = paper.rect(padding + 400, padding + 45, 60, 60, 12);
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
    hexText = paper.text(padding + 470, padding + 75, preview.attrs.fill)
        .attr({ "font-size": 26, "text-anchor": "start", "fill": "grey" })
}

//Return tinycolor.js-generated color combinations based on currently selected color
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

//Draw color combination swatches
function makeSwatches(c) {
    var count = 0;
    var xpos = 0;
    var ypos = padding + 460;
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

//Return path to draw svg color swatch
function makeSwatch(color, x, y) {
    var swatch = paper.circle(x - 25, y, 20)
        .attr({ "fill": color, "stroke": "#e8eef7" })
        .mousedown(function () {
            pickColor(this.attrs.fill);
        })
        .mouseover(function () {
            $("body").css("cursor", "pointer");
            this.attr({ "stroke-width": 4 });
            if (window.currentThing && window.currentThing.id === this.id) {
                update();
                window.dropOn = null;
            }
        })
        .mouseout(function () {
            $("body").css("cursor", "default");
            this.attr({ "stroke-width": 1 });
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

//update fill color of eyedropper
function pickColor(c) {
    moveColor.css({
        "background-color": c,
        "visibility": "visible"
    })
}

//update array of colors representing current circular palette
function updateColorArray(x, c) {
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

//Make hover-able blend buttons between palette segments
function makeHoverSegs() {
    for (var i = 0; i < segments.length; i++) {
        var testHover = paper.path(makeHoverSeg(i, colors.length))
            .attr({ "fill": blank, "stroke": "white", "stroke-width": 5, "opacity": 0 })
            .mouseover(function () {
                var segL = segments[this.id];
                var segR = segments[0];
                if (this.id < segments.length - 1) {
                    segR = segments[this.id + 1];
                }
                var mix = mixColors(tinycolor(segL.attrs.fill).toRgb(), tinycolor(segR.attrs.fill).toRgb(), 0.5);
                $("body").css("cursor", "pointer");
                this.attr({ "opacity": 1, "fill": mix, "stroke-width": 8 });
                this.mix = mix;
            })
            .mouseout(function () {
                $("body").css("cursor", "default");
                this.attr({ "opacity": 0, "stroke-width": 5 })
            })
            .click(function () {
                if (segments.length < maxSegs) {
                    updatePalette(this.id, this.mix);
                } else {
                    alert("Max 12 segments!")
                }
            });
        testHover.id = i;
        hoverSegs.push(testHover);
    }
}

//Re-render circular palette based on "colors" array
function updatePalette(i, c) {
    updateColorArray((i + 1), c);
    deletePalette();
    makePalette();
    makeHoverSegs();
}

//Delete currently selected segment (if one exists)
function deleteSeg() {
    var toDelete = null;
    for (var i = 0; i < segments.length; i++) {
        if (segments[i].select) {
            segments[i].remove();
            colors.splice(i, 1);
            deletePalette();
            makePalette();
            makeHoverSegs();
        }
    }
}

//Update slider positions
function updateSliders() {
    var h = globalHsl.h;
    var s = globalHsl.s;
    var l = globalHsl.l;
    var lumGrad, satGrad;
    var huePos = h / 2;
    var satPos = s * 180;
    var lumPos = l * 180;
    lumGrad = "180-#fff-#" + tinycolor({ h, s, l: 0.5 }).toHex() + "-#000";
    lumSlider.setColor(lumGrad);
    satGrad = "180-#" + tinycolor({ h, s: 1.0, l: 0.5 }).toHex() + "-grey";
    satSlider.setColor(satGrad);
    lumSlider.setSlider(lumPos);
    hueSlider.setSlider(huePos);
    satSlider.setSlider(satPos);
}

//update color combinations
function updateSwatches(c) {
    var colors = getCombinations(c);
    var count = 0;
    for (var a in colors) {
        for (var i = 0; i < colors[a].length; i++) {
            palette[count].attr({ "fill": colors[a][i] })
            count++;
        }
    }
}

//Draw blending tool
function drawBlender() {
    blendL = blendContainer(0, 1, 1, 0, true);
    blendR = blendContainer(1, 0, 0, 1, true);
    blendM = blendContainer(0, 1, 0, 1, false);
}

//Return svg path to draw blending container (segment of blending tool)
function blendContainer(a, b, c, d, fillable) {
    var r = 50;
    var x1 = padding + 485;
    var y1 = padding + 340;
    var space = 80;
    var bc = paper.path("M " + x1 + " " + y1 + " "
        + "A " + r + " " + r + ", 0," + a + "," + b + ", " + x1 + " " + (y1 - space) + " "
        + "A " + r + " " + r + ", 0," + c + "," + d + ", " + " " + x1 + " " + y1)
        .attr({ "stroke": "#e8eef7", "stroke-width": 3, "fill": "white" })
    if (fillable) {
        bc.mouseover(function () {
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
                pickColor(this.attrs.fill);
            }
        })
    return bc;
}

//Return blend of two colors
function mixColors(s1, s2, t) {
    var blend = {}
    blend.r = Math.round(Math.sqrt((1 - t) * Math.pow(s1.r, 2) + 0.5 * Math.pow(s2.r, 2)));
    blend.g = Math.round(Math.sqrt((1 - t) * Math.pow(s1.g, 2) + 0.5 * Math.pow(s2.g, 2)));
    blend.b = Math.round(Math.sqrt((1 - t) * Math.pow(s1.b, 2) + 0.5 * Math.pow(s2.b, 2)));
    return ("#" + tinycolor(blend).toHex());
}

//Call this when mouse up on slider
function sliderUp() {
    updateSliders();
    updateSwatches("#" + tinycolor(preview.attrs.fill).toHex());
}

//Call this when dragging luminance slider
function lumUpdate() {
    globalHsl.l = this.sliderPoint / this.step;
    var newColor = "#" + tinycolor(globalHsl).toHex();
    preview.attr("fill", newColor);
    hexText.attr('text', newColor);
}

//Call this when dragging hue slider
function hueUpdate() {
    var newColor;
    globalHsl.h = this.sliderPoint * 2;
    var newColor = "#" + tinycolor(globalHsl).toHex();
    preview.attr("fill", newColor);
    hexText.attr('text', newColor);
}

//Call this when dragging saturation slider
function satUpdate() {
    globalHsl.s = this.sliderPoint / this.step;
    var newColor = "#" + tinycolor(globalHsl).toHex();
    preview.attr("fill", newColor);
    hexText.attr('text', newColor);
}

//Event listeners for mouse up and mouse move
$("body").mouseup(function (e) {
    if (eyedropper) {
        pickColor(pickpxl);
    };
    if (window.dropOn === null) {
        segments.forEach(function (s) {
            s.attr({ "stroke-width": 3 });
            s.select = false;
        })
    }
})
    .mousemove(function (e) {
        if (true) {
            var mousePos = getMousePos(canvas, e);
            mx = mousePos.x;
            my = mousePos.y;
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
        }
    });

//Check if page is loaded
function onReady(callback) {
    var intervalID = window.setInterval(checkReady, 1000);
    function checkReady() {
        if (document.getElementsByTagName('body')[0] !== undefined) {
            window.clearInterval(intervalID);
            callback.call(this);
        }
    }
}

//Show page
function show(id, value) {
    document.getElementById(id).style.display = value ? 'block' : 'none';
}

//Event listener for delete and backspace keys
document.addEventListener('keydown', function (event) {
    if (event.keyCode === 8 || event.keyCode === 46) {
        deleteSeg();
    }
});

//Event listener for image uploader
document.getElementById("inp").addEventListener("change", readFile);

//Render loading page
onReady(function () {
    show('fullpage', true);
    show('loadOverlay', false);
});

function Tab(x, y, text, f) {
    var d = "M " + x + " " + y + " l15 -30 l100 0 l15 35 Z";
    var tab = paper.path(d);
    tab.attr({
        stroke: "white",
        "stroke-width": 2,
        fill: "#ebedf1"
    })
    return tab;
}

function doit(fn) {
    fn();
}

//Initialize program
$(function () {
    // paper.rect(padding - 5, padding - 15, 380, 50).attr({
    //     stroke: "#ebedf1",
    //     "stroke-width": 2,
    //     fill: "white"
    // })
    var fn1 = function () {
        console.log("fn1");
    };
    var t3 = new Tab(220, 35, "Palette", "#ebedf1");
    t3.click(function () {
        makeColorCSS();
    })
    var t2 = new Tab(110, 35, "Palette", "#ebedf1");
    t2.click(function () {
        showTable();
    })
    var t1 = new Tab(0, 35, "Palette", "#ebedf1");
    t1.click(function () {
        showPalette();
    })
    // var d = "M 0 35 l15 -30 l100 0 l15 35 Z";
    // var tab = paper.path(d);
    // tab.attr({
    //     stroke: "#ebedf1",
    //     "stroke-width": 2,
    //     fill: "#ebedf1"
    // });
    paper.rect(padding - 5, 35, 380, 365).attr({
        stroke: "#ebedf1",
        "stroke-width": 2,
        fill: "white"
    })
    paper.rect(padding - 5 + 380, padding + 35, 225, 365).attr({
        stroke: "#ebedf1",
        "stroke-width": 2,
        fill: "white"
    })
    paper.rect(padding - 5 + 380, padding - 15 + 230, 225, 185).attr({
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
    satColor = tinycolor("hsl " + tinycolor(preview.attrs.fill).toHsl().h + " 1.0 0.9").toHex();
    satGrad = "180-#" + satColor + "-grey"
    mixColors(tinycolor("blue").toRgb(), tinycolor("red").toRgb(), 0.5);
    lumSlider = new Slider(paper, padding + sliderX, 120, sliderLength, 180, lumUpdate, sliderUp);
    lumSlider.setColor("180-#fff-#000");
    hueSlider = new Slider(paper, padding + sliderX, 150, sliderLength, 180, hueUpdate, sliderUp);
    hueSlider.setColor(colorGrad.reverse());
    satSlider = new Slider(paper, padding + sliderX, 180, sliderLength, 180, satUpdate, sliderUp)
    satSlider.setColor(satGrad);
    preview.attr("fill", "lightgreen");
    hexText.attr('text', "#" + tinycolor("#90ee90").toHex());
    globalHsl = tinycolor("lightgreen").toHsl();
    updateSliders();
    makeColorCSS();
});

function makeColorCSS() {
    $("#css-window").css("visibility", "visible");
    var csspage = ""
    for (var i = 0; i < segments.length; i++) {
        csspage += "#pm" + i + " { "
            + " color: "
            + "#" + tinycolor(segments[i].attrs.fill).toHex()
            + " }"
            + "<br>"
    }
    $("#colors-CSS").html(csspage);
}
