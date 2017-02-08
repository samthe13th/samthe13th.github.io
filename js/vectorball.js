var game = new Phaser.Game(800, 500, Phaser.CANVAS, 'vb-stage', { preload: preload, create: create, update: update, render: render }, true);
WebFontConfig = {
    active: function () { game.time.events.add(Phaser.Timer.SECOND, drawSidePanel, this); },
    google: {
        families: ['Revalia']
    }
};
var levels = [
    {
        start: { x: 0, y: 250 },
        finish: { x: 500, y: 250 },
        map: [
            ["X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X"],
            ["X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X"],
            ["X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X"],
            ["X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X"],
            ["F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F"],
            ["F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F"],
            ["F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F"],
            ["X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X"],
            ["X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X"]
        ],
        tiles: ["E"],
        balls: [{ x: 0, y: 200 }]
    },
    {
        start: { x: 0, y: 400 },
        finish: { x: 500, y: 400 },
        map: [
            ["F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F"],
            ["F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F"],
            ["F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F"],
            ["F", "X", "F", "F", "F", "F", "F", "F", "F", "F", "F"],
            ["F", "X", "F", "F", "F", "F", "F", "F", "F", "F", "F"],
            ["F", "X", "F", "F", "F", "F", "F", "F", "F", "F", "F"],
            ["F", "X", "F", "F", "F", "F", "F", "F", "F", "F", "F"],
            ["F", "X", "F", "F", "F", "F", "F", "F", "F", "F", "F"],
            ["F", "X", "F", "F", "F", "F", "F", "F", "F", "F", "F"]
        ],
        tiles: ["N", "S", "E", "S"],
        balls: [{ x: 0, y: 200 }]
    },
    {
        start: { x: 0, y: 400 },
        finish: { x: 500, y: 150 },
        map: [
            ["X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X"],
            ["X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X"],
            ["X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X"],
            ["F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F"],
            ["F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F"],
            ["F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F"],
            ["F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F"],
            ["F", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X"],
            ["F", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X"]
        ],
        tiles: ["N", "E", "E", "E", "E"],
        balls: [{ x: 0, y: 200 }]
    },
    {
        start: { x: 300, y: 250 },
        finish: { x: 250, y: 200 },
        map: [
            ["X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X"],
            ["X", "X", "F", "F", "F", "F", "F", "F", "F", "X", "X"],
            ["X", "F", "F", "F", "F", "F", "F", "F", "F", "F", "X"],
            ["X", "F", "F", "F", "F", "F", "F", "F", "F", "F", "X"],
            ["X", "F", "F", "F", "F", "F", "F", "F", "F", "F", "X"],
            ["X", "F", "F", "F", "F", "F", "F", "F", "F", "F", "X"],
            ["X", "F", "F", "F", "F", "F", "F", "F", "F", "F", "X"],
            ["X", "X", "F", "F", "F", "F", "F", "F", "F", "X", "X"],
            ["X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X"]
        ],
        tiles: ["N", "W", "E", "S", "N", "W", "S"],
        balls: [{ x: 0, y: 200 }]
    },
    {
        start: { x: 0, y: 100 },
        finish: { x: 500, y: 350 },
        map: [
            ["X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X"],
            ["F", "F", "F", "F", "F", "F", "F", "F", "F", "X", "X"],
            ["F", "F", "F", "F", "F", "F", "F", "P", "F", "X", "X"],
            ["F", "F", "F", "F", "F", "F", "F", "F", "F", "X", "X"],
            ["X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X"],
            ["X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X"],
            ["X", "X", "P", "F", "F", "F", "F", "F", "F", "F", "F"],
            ["X", "X", "F", "F", "F", "F", "F", "F", "F", "F", "F"],
            ["X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X"]
        ],
        tiles: ["E", "S"],
        balls: [{ x: 0, y: 200 }]
    },
    {
        start: { x: 0, y: 400 },
        finish: { x: 500, y: 0 },
        map: [
            ["X", "X", "X", "X", "X", "X", "X", "X", "F", "F", "F"],
            ["F", "F", "F", "F", "F", "P", "X", "X", "F", "F", "F"],
            ["F", "F", "F", "F", "F", "F", "X", "X", "F", "F", "F"],
            ["F", "F", "F", "F", "F", "F", "X", "X", "F", "F", "F"],
            ["F", "F", "F", "F", "F", "F", "X", "X", "F", "F", "F"],
            ["F", "F", "F", "F", "F", "F", "X", "X", "F", "F", "F"],
            ["F", "F", "F", "F", "F", "F", "X", "X", "P", "F", "F"],
            ["F", "F", "F", "F", "F", "F", "X", "X", "X", "X", "X"],
            ["F", "F", "F", "F", "F", "F", "X", "X", "X", "X", "X"]
        ],
        tiles: ["N", "N", "E", "N"],
        balls: [{ x: 0, y: 200 }]
    },
]
var levelEnd = false;
var doors = [];
var doorAngle = 0;
var nope;
var currentTile = null;
var go = true;
var lvlnum = 0;
var level = levels[lvlnum];
var map = levels[lvlnum].map;
var tileWidth = 50;
var levelWin = false;
var ball;
var speed = 200;
var acc = 200;
var tiles2 = [];
var tiles1 = [];
var portholes = [];
var end;
var dy = -1;
var dx = 0;
var endVx, endVy, endV;
var collideTimer = null;
var portholeTimer = null;
var startx = level.start.x;
var starty = level.start.y;
var finx = level.finish.x;
var finy = level.finish.y;
var graphics;
var line;
var lineGrp;
var holes = [];
var nodes = [];
var plus;
var nextbtn;
var complete;
function preload() {
    //Load the Google WebFont Loader script
    game.load.script('webfont', '//ajax.googleapis.com/ajax/libs/webfont/1.4.7/webfont.js');
    //Load graphics
    game.load.image("howto", "assets/vectorball/howto.png");
    game.load.image("P", 'assets/vectorball/porthole.png', 50, 50);
    game.load.spritesheet('G', 'assets/vectorball/adown.png', 50, 50);
    game.load.spritesheet("R", 'assets/vectorball/staticright.png', 50, 50);
    game.load.spritesheet('next', 'assets/vectorball/nextbtn.png', 150, 50);
    game.load.image("nope", 'assets/vectorball/nope.png', 50, 50);
    game.load.image('B', 'assets/vectorball/ball.png', 50, 50);
    game.load.image('F', 'assets/vectorball/floor.png', 50, 50);
    game.load.spritesheet('bounce', 'assets/vectorball/bouncer.png', 50, 50);
    game.load.spritesheet('E', 'assets/vectorball/right2.png', 50, 50);
    game.load.spritesheet('N', 'assets/vectorball/up2.png', 50, 50);
    game.load.spritesheet('S', 'assets/vectorball/down2.png', 50, 50);
    game.load.spritesheet('W', 'assets/vectorball/left2.png', 50, 50);
    game.load.image('END', 'assets/vectorball/end.png', 50, 50);
    game.load.image('+', 'assets/vectorball/add.jpg', 50, 50);
    game.load.image("slot", 'assets/vectorball/base.png', 50, 50);
    game.load.image('X', 'assets/vectorball/black.png', 50, 50);
    game.load.spritesheet("complete", 'assets/vectorball/levelcomplete.png', 150, 550);
}
function create() {
    game.physics.startSystem(Phaser.Physics.ARCADE);
    game.physics.setBoundsToWorld();
    tiles = game.add.group();
    line = game.add.graphics(0, 0);
    game.add.graphics(0, 0).beginFill(0xFFFFFF).drawRect(550, 0, 250, 500);
    setUpLevel();
    var sprite = "end";
    setTiles();
}
function makeEndDoors() {
    makeDoor(0xf4ea5a, 500, game.height, 0);
    makeDoor(0xf4c65a, 0, 0, (Math.PI));
    makeDoor(0xf4a75a, 500, 0, (3 * Math.PI / 2));
    makeDoor(0xf4d95a, 0, game.height, (Math.PI / 2));
}
var panelTxt;
function drawSidePanel() {
    var titleFont;
    var SP = game.add.graphics(0, 0);
    SP.beginFill(0xFFFFFF);
    SP.drawRect(550, 0, 250, 500);
    SP.lineStyle(4, 0x000000, 1);
    SP.drawRect(570, 4, 220, 250);
    titleFont = game.add.text(680, 20, "VECTORBALL");
    titleFont.anchor.setTo(0.5, 0);
    titleFont.font = 'Revalia';
    titleFont.fontSize = 24;
    panelTxt = game.add.text(585, 60, "Level " + (lvlnum + 1) + "\n\nVx = " + ball.body.velocity.x + " px/s" + "\nVy = " + ball.body.velocity.y + " px/s\nV = " + Math.sqrt(Math.pow(ball.body.velocity.x, 2) + Math.pow(ball.body.velocity.y, 2)) + " px/s");
    panelTxt.font = 'Revalia';
    panelTxt.fontSize = 20;

}
function makeDoor(color, px, py, rot) {
    var door;
    door = game.add.graphics(0, 0);
    door.beginFill(color);
    door.drawPolygon([new Phaser.Point(0, game.height), new Phaser.Point(game.width, 0), new Phaser.Point(game.width, game.height)]);
    door.endFill();
    door.pivot.x = 0;
    door.pivot.y = game.height;
    door.x = px;
    door.y = py;
    door.rotation = rot;
    doors.push(door);
}
function closeDoor() {
    makeEndDoors();
    levelEnd = true;
}
function setUpLevel() {
    if (lvlnum === 0) {
        var howto = game.add.image(game.world.centerX - 130, 20, "howto");
        howto.anchor.setTo(0.5, 0);
    }
    makeBtn();
    console.log("SET UP");
    var row = 0;
    var col = 0;
    var xpos;
    var ypos;
    for (var row in map) {
        ypos = row * tileWidth;
        for (var i = 0; i < map[row].length; i++) {
            col = i;
            xpos = col * tileWidth;
            if (map[row][i] === "R") {
                game.add.sprite(xpos, ypos, "F", 0);
                var newTile = game.add.sprite(xpos, ypos, "R", 0);
                newTile.dir = "E";
                tiles1.push(newTile);
            }
            var newTile = game.add.sprite(xpos, ypos, map[row][i], 0);
            if (map[row][i] === 'X') {
                holes.push(newTile);
            }
            if (map[row][i] === 'P') {
                portholes.push(newTile);
            }
        }
        row++;
    };
    for (var i = 0; i < 11; i++) {
        game.add.sprite((i * tileWidth), 450, 'slot', 0);
    };
    //  console.log("START: " + JSON.stringify(level.start));
    startx = level.start.x;
    starty = level.start.y;
    finx = level.finish.x;
    finy = level.finish.y;
    end = game.add.sprite(finx, finy, "END");
    ball = game.add.sprite(startx, starty, "B");
    ball.checkWorldBounds = true;
    ball.events.onOutOfBounds.add(ballOut, this);
    ball.toPorthole = null;

    game.physics.enable([ball], Phaser.Physics.ARCADE);
    game.physics.enable(tiles2, Phaser.Physics.ARCADE)
    graphics = game.add.graphics(25, 25);
    graphics.lineStyle(10, 0xffd900, 1);
    nope = game.add.sprite(startx, starty, "nope");
    nope.bringToTop();
    nope.visible = false;
    //drawSidePanel();
    window.graphics = graphics;
}
function drawLine() {
    line.lineStyle(10, 0xffd900, 1);
    line.moveTo(100, 100).lineTo(300, 300).lineTo(200, 200);
}
function setTiles() {
    tiles2 = [];
    var row = 0;
    var col = 0;
    for (var i = 0; i < level.tiles.length; i++) {
        var vt = VTile((i * tileWidth), 450, level.tiles[i]);
        tiles2.push(vt);
    }
}
function VTile(x, y, val) {
    var dir = val;
    var v = game.add.sprite(x, y, dir);
    v.origin = { x: x, y: y };
    v.inputEnabled = true;
    v.canDrop = true;
    v.input.enableDrag();
    v.input.enableSnap(tileWidth, tileWidth, false, true);
    v.collidedWith = false;
    v.events.onDragStart.add(function () {
        go = false;
        currentTile = v;
        v.bringToTop();
        ball.bringToTop();
        nope.bringToTop();
    }, this);
    v.events.onDragStop.add(function () {
        if (v.canDrop === false) {
            v.x = v.origin.x;
            v.y = v.origin.y;
            nope.visible = false;
        } else {
            v.origin.x = v.x;
            v.origin.y = v.y;
        }
        currentTile = null;
        go = true;
    }, this);
    v.dragFromCenter = true;
    v.dir = val;
    v.animations.add('spring');
    v.animations.currentAnim.onComplete.add(function () {
    }, this);
    return v;
}
function update() {
    if (portholeTimer !== null) {
        portholeTimer--;
        if (portholeTimer <= 0) {
            portholeTimer = null;
        }
        if (portholeTimer > 40) {
            console.log("freeze");
            if (ball.visible) {
                ball.lastdx = ball.body.velocity.x;
                ball.lastdy = ball.body.velocity.y;
                ball.visible = false;
                ball.body.velocity.x = 0;
                ball.body.velocity.y = 0;
            }
        } else {
            ball.visible = true;
            if (ball.toPorthole !== null) {
                ball.x = 200;
                ball.x = portholes[ball.toPorthole].x;
                ball.y = portholes[ball.toPorthole].y;
                nodes.push({ x: portholes[ball.toPorthole].x, y: portholes[ball.toPorthole].y });
                ball.body.velocity.x = ball.lastdx;
                ball.body.velocity.y = ball.lastdy;
                ball.toPorthole = null;
            }
        }
    }
    if (collideTimer !== null) {
        collideTimer--;
        if (collideTimer <= 0) {
            for (var i = 0; i < tiles2.length; i++) {
                tiles2[i].collidedWith = false;
            }
            collideTimer = null;
        }
    }
    graphics.clear();
    graphics.lineStyle(10, 0xffd900, 1);
    if (nodes.length > 0) {
        graphics.moveTo(nodes[0].x, nodes[0].y);
        if (nodes.length > 1) {
            for (var i = 1; i < nodes.length; i++) {
                graphics.lineTo(nodes[i].x, nodes[i].y);
                if (nodes[i].visible === false) {
                    graphics.lineStyle(0, 0x90ee90, 1);
                } else {
                    graphics.lineStyle(10, 0xffd900, 1);
                }
            }
        }
        graphics.lineTo(ball.x, ball.y);
    }
    if (collideTimer === null && portholeTimer === null && ball.body.velocity.x === 0 && ball.body.velocity.y === 0 && (ball.x !== startx || ball.y !== starty)) {
        if (levelEnd === false) {
            resetBall();
        }
    }
    if (tiles2.length > 0) {
        for (var i = 0; i < tiles2.length; i++) {
            adjustPos(tiles2[i]);
            if (!tiles2[i].collidedWith && game.physics.arcade.distanceBetween(ball, tiles2[i]) < 5) {
                if (tiles2[i].dir === "E") {
                    ball.body.velocity.x += speed;
                } else if (tiles2[i].dir === "W") {
                    ball.body.velocity.x -= speed;
                } else if (tiles2[i].dir === "N") {
                    ball.body.velocity.y -= speed;
                } else if (tiles2[i].dir === "S") {
                    ball.body.velocity.y += speed;
                }
                collideTimerSet(tiles2[i]);
                tiles2[i].animations.play('spring', 30, false);
                tiles2[i].frame = 0;
                nodes.push({ x: tiles2[i].x, y: tiles2[i].y, visible: true });
            }
        }
    }
    if (tiles1.length > 0) {
        for (var i = 0; i < tiles1.length; i++) {
            if (game.physics.arcade.distanceBetween(ball, tiles1[i]) < 5) {
                //alert("add gravity");
                if (tiles1[i].dir === "E") {
                    ball.body.velocity.x = speed;
                }
                nodes.push({ x: tiles1[i].x, y: tiles1[i].y, visible: true });
            }
        }
    }
    if (game.physics.arcade.distanceBetween(ball, end) < 15) {
        if (!levelEnd) {
            endVx = ball.body.velocity.x;
            endVy = ball.body.velocity.y;
            endV = Math.round(Math.sqrt(Math.pow(ball.body.velocity.x, 2) + Math.pow(ball.body.velocity.y, 2)));
        }
        ball.body.velocity.x = 0;
        ball.body.velocity.y = 0;
        closeDoor();
    }
    for (var i = 0; i < holes.length; i++) {
        if (game.physics.arcade.distanceBetween(ball, holes[i]) < 10) {
            resetBall();
        }
    }
    for (var i = 0; i < portholes.length; i++) {
        if (game.physics.arcade.distanceBetween(ball, portholes[i]) < 12) {
            if (portholeTimer === null) {
                var goto = toggle(i);
                portholeTimer = 60;
                ball.toPorthole = goto;
                nodes.push({ x: portholes[i].x, y: portholes[i].y, visible: false });
            }
        }
    }
    if (go === false) {
        resetBall();
    }
    if (currentTile !== null) {
        nope.x = currentTile.x;
        nope.y = currentTile.y;
    }
    if (currentTile !== null) {
        var collision = false;
        for (var i = 0; i < tiles2.length; i++) {
            if (currentTile !== tiles2[i]) {
                if (game.physics.arcade.distanceBetween(currentTile, tiles2[i]) < 30) {
                    collision = true;
                }
            }
        }
        if (collision) {
            currentTile.canDrop = false;
            nope.visible = true;
        } else {
            currentTile.canDrop = true;
            nope.visible = false;
        }
    }
    if (levelEnd) {
        //alert("lvlnum: " + lvlnum);
        for (var i = 0; i < doors.length; i++) {
            if (doorAngle < ((4 * Math.PI / 7) - (Math.PI / 128))) {
                doors[i].rotation -= (Math.PI / 128);
            } else {
                complete.bringToTop();
                complete.visible = true;
                nextbtn.bringToTop();
                if (lvlnum < (levels.length - 1)) {
                    nextbtn.visible = true;
                }
            }
        }
        doorAngle += (Math.PI / 128);
        drawSidePanel();
    }
    if (panelTxt !== undefined) {
        if (levelEnd) {
            panelTxt.text = "Level " + (lvlnum + 1) + "\n\nVx = " + endVx + " px/s" + "\nVy = " + endVy + " px/s\nV = " + endV + " px/s";
        } else {
            panelTxt.text = "Level " + (lvlnum + 1) + "\n\nVx = " + ball.body.velocity.x + " px/s" + "\nVy = " + ball.body.velocity.y + " px/s\nV = " + Math.round(Math.sqrt(Math.pow(ball.body.velocity.x, 2) + Math.pow(ball.body.velocity.y, 2))) + " px/s";
        }
    }
}
function over() { };
function out() { };
function up() { };
function nextLevel() {
    clearLevel();
    reset();
}
function toggle(i) {
    if (i === 0) {
        return 1;
    }
    return 0;
}
function makeBtn() {
    // console.log("MAKE BTN");
    complete = game.add.sprite(0, 175, "complete");
    complete.visible = false;
    nextbtn = game.add.button(game.world.centerX - 210, game.world.centerY + 100, 'next', nextLevel, this, 1, 0, 2);
    nextbtn.visible = false;
}
function clearLevel() {
    game.world.removeAll();
}
function hideNope() {
    nope.visible = false;
}
function collideTimerSet(t) {
    t.collidedWith = true;
    collideTimer = 10;
}
function checkOverlap(t1, t2) {
    var boundsA = t1.getBounds();
    var boundsB = t2.getBounds();
    var intersects = Phaser.Rectangle.intersects(boundsA, boundsB);
    return intersects;
}
function adjustPos(tile) {
    if (tile.y <= 0) {
        tile.y = 0;
    }
    if (tile.y >= (game.height - tileWidth)) {
        tile.y = game.height - tileWidth;
    }
    if (tile.x <= 0) {
        tile.x = 0;
    }
    if (tile.x >= (game.width - tileWidth)) {
        tile.x = game.width - tileWidth;
    }
}
function collisionCallback(ball, tile) {
    dx = 1;
}
function processCallback(ball, tile) {
    return true;
}
function ballOut() {
    resetBall();
}
function resetBall() {
    nodes = [];
    ball.x = startx;
    ball.y = starty;
    ball.body.velocity.y = 0;
    ball.body.velocity.x = 0;
    ball.body.acceleration.x = 0;
    ball.body.acceleration.y = 0;
    for (var i = 0; i < tiles2.length; i++) {
        tiles2[i].collidedWith = false;
        tiles2[i].frame = 0;
    }
}
function reset() {
    if (lvlnum < (levels.length - 1)) {
        lvlnum++;
    }
    level = levels[lvlnum];
    map = levels[lvlnum].map;
    tiles2.forEach(function (t) {
        t.destroy();
    })
    holes = [];
    nodes = [];
    portholes = [];
    levelEnd = false;
    doorAngle = 0;
    setUpLevel();
    setTiles();
    doors = [];
    drawSidePanel();
}
function destroyTiles() {
    tiles.forEach(function (tile) {
        console.log("destroy!");
    })
}
function render() {
    // game.debug.text("collide timer: " + collideTimer, 180, 335);
    // game.debug.text("porthole timer: " + portholeTimer, 180, 350);
    // game.debug.text("To porthole: " + ball.toPorthole, 180, 365);
    // if (ball !== null && portholes !== []) {
    //     game.debug.text("dist to porthole 1:  " + game.physics.arcade.distanceBetween(ball, portholes[0]), 180, 380);
    // }
    // game.debug.text("ball towards finish.", 180, 395);
    //game.debug.text("close Angle = " + doorAngle, 180, 395);
    // if (currentTile === null) {
    //     game.debug.text("current tile null", 180, 350);
    // }
    // var ballB = ball.getBounds();
    // var plusB = plus.getBounds();
    // //  var d = game.physics.arcade.distanceBetween(ball, end);
    // game.debug.text("BoundsBall: " + ballB, 0, 80);
    // game.debug.text("BoundsPlus: " + plusB, 0, 100);
    // game.debug.text("intersecting?: " + plusB, 0, 120);
    // game.debug.text(Phaser.Rectangle.intersects(ballB, plusB), 0, 50);
    // game.debug.text("nodes: " + JSON.stringify(nodes), 10, 10);
    //game.debug.text("vel x: " + ball.body.velocity.x + "vel y: " + ball.body.velocity.y, 0, 20)
}