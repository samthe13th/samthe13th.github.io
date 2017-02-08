var width = 6;
var height = 4;
var offset = 70;

function drawCircuit() {
    var circuit = ""
    circuit += nodes() + lines();
    $("#circuitStage").html(circuit);
}

function nodes() {
    var nodes = "";
    var ypos, xpos;
    for (var i = 0; i < height; i++) {
        ypos = (offset * i) + offset;
        for (var j = 0; j < width; j++) {
            xpos = (offset * j) + offset;
            nodes += node(xpos, ypos);
        }
    }
    return nodes;
}

function node(x, y) {
    return "<circle cx='" + x + "' cy='" + y + "' r='3' stroke='white' fill='lightgrey'/>";
}

function lines() {
    var inRow = inner() + inner();
    var x1, x2, y1, y2;
    var border = "";
    for (var i = 0; i < (width - 1); i++) {
        x1 = offset + (i * offset);
        y1 = offset;
        x2 = offset + ((i + 1) * offset);
        y2 = offset;
        border += line(x1, y1, x2, y2);
    }
    for (var i = 0; i < (width - 1); i++) {
        x1 = offset + (i * offset);
        y1 = (height * offset);
        x2 = offset + ((i + 1) * offset);
        y2 = (height * offset);
        border += line(x1, y1, x2, y2);
    }
    for (var i = 0; i < (height - 1); i++) {
        x1 = offset;
        y1 = (i * offset) + offset;
        x2 = offset;
        y2 = ((i + 1) * offset) + offset;
        border += line(x1, y1, x2, y2);
    }
    for (var i = 0; i < (height - 1); i++) {
        x1 = offset * width;
        y1 = (i * offset) + offset;
        x2 = offset * width;
        y2 = ((i + 1) * offset) + offset;
        border += line(x1, y1, x2, y2);
    }
    for (var i = 0; i < 2; i++) {

    }
    return border + inRow;
}

function line(x1, y1, x2, y2) {
    return "<line x1='" + x1 + "' y1='" + y1 + "' x2='" + x2 + "' y2='" + y2 + "' stroke-width='5' stroke='lightgrey'/>";
}

function inner() {
    var innerRow = "";
    var random_row = Math.floor((Math.random() * (width - 2)) + 2);
    var xpos = random_row;
    for (var i = 0; i < (height - 1); i++) {
        x1 = offset * xpos;
        y1 = (i * offset) + offset;
        x2 = offset * xpos;
        y2 = ((i + 1) * offset) + offset;
        innerRow += line(x1, y1, x2, y2);
        if ((Math.floor((Math.random() * 3) - 1)) === -1) {
            console.log("left");
            if ((xpos - 1) > 0) {
                innerRow += line(x1, y2, (x2 - offset), y2);
                console.log("xpos-- : " + (xpos - 1));
                xpos--;
            }
        } else if ((Math.floor((Math.random() * 3) - 1)) === 1) {
            if ((xpos + 1) <= width) {
                console.log("right");
                innerRow += line(x1, y2, (x2 + offset), y2);
                xpos++;
            }
        } else {
            console.log("middle");
        }
    }
    return innerRow;
}

drawCircuit();
