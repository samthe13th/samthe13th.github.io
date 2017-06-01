var game = new Phaser.Game(800, 600, Phaser.CANVAS, 'mitosis-stage', { preload: preload, create: create, update: update, render: render }, true);
var cat;
var cframe = 1;
//var paper = Raphael(0, 200, 800, 200);
function preload() {
    game.load.spritesheet("mitosis1", "assets/mitosis/mitosis0001.png");
    game.load.spritesheet("mitosis2", "assets/mitosis/mitosis0002.png");
    game.load.spritesheet("mitosis3", "assets/mitosis/mitosis0003.png");
    game.load.spritesheet("mitosis4", "assets/mitosis/mitosis0004.png");
    game.load.spritesheet("mitosis5", "assets/mitosis/mitosis0005.png");
    game.load.spritesheet("mitosis6", "assets/mitosis/mitosis0006.png");
    game.load.spritesheet("mitosis7", "assets/mitosis/mitosis0007.png");
    game.load.spritesheet("mitosis8", "assets/mitosis/mitosis0008.png");
    game.load.spritesheet("mitosis9", "assets/mitosis/mitosis0009.png");
    game.load.spritesheet("mitosis10", "assets/mitosis/mitosis0010.png");
    game.load.spritesheet("mitosis11", "assets/mitosis/mitosis0011.png");
    game.load.spritesheet("mitosis12", "assets/mitosis/mitosis0012.png");
    game.load.spritesheet("mitosis13", "assets/mitosis/mitosis0013.png");
    game.load.spritesheet("mitosis14", "assets/mitosis/mitosis0014.png");
    game.load.spritesheet("mitosis15", "assets/mitosis/mitosis0015.png");
    game.load.spritesheet("mitosis16", "assets/mitosis/mitosis0016.png");
    game.load.spritesheet("mitosis17", "assets/mitosis/mitosis0017.png");
    game.load.spritesheet("mitosis18", "assets/mitosis/mitosis0018.png");
    game.load.spritesheet("mitosis19", "assets/mitosis/mitosis0019.png");
    game.load.spritesheet("mitosis20", "assets/mitosis/mitosis0020.png");
    game.load.spritesheet("mitosis21", "assets/mitosis/mitosis0021.png");
    game.load.spritesheet("mitosis22", "assets/mitosis/mitosis0022.png");
    game.load.spritesheet("mitosis23", "assets/mitosis/mitosis0023.png");
    game.load.spritesheet("mitosis24", "assets/mitosis/mitosis0024.png");
}
function create() {
    cat = game.add.sprite(80, 40, "mitosis1");
    cat.scale.setTo(0.3, 0.3);
}
function update() {
    cframe = slider.sliderPoint + 1;
    var mframe = "mitosis" + cframe;
    cat.loadTexture(mframe, 0, false);
}
function render() {
}

var drag = function () {
    $("#op2").text(slider.sliderPoint);
    console.log("drag");
};
var on = function () {
    dragging = { o: this };
    console.log("on");
}
var off = function () {
    dragging = { o: null };
}
var sandbox = Raphael(0, 10, 660, 600);
slider = Slider(sandbox, 150, 450, 430, 23, drag, function () { });
slider.setColor("#3ba6d0");
sandbox.rect(80,70,580,420).attr({
    "stroke": "#3ba6d0"
})
sandbox.text(370,30,"Mitosis").attr({
    "font-size": "30px",
    "fill": "#3ba6d0"
});
sandbox.text(370,510,"Click and drag slider to advance").attr({
    "font-size": "16px",
    "fill": "#3ba6d0"
})
preload();
create();
//var slider = Slider(10,10, 400, drag, on, off)
