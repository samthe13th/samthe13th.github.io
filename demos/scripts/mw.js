//(function () {
    var $dragging = null;
    var leftColWidth, rightColWidth;
    var $tSpeed = 30;
    var bodywidth = $("body")[0].getBoundingClientRect().width;
    var counter = 50;
    var opacity = 1;
    var appdiv = $("#app")[0];
    var mx, my, left, topMouse;
    var pagex = appdiv.getBoundingClientRect().width;
    var pagey = appdiv.getBoundingClientRect().height;
    var leftcol = {
        id: "#leftcol",
        left: 0,
        width: 25,
        abswidth: 100,
        savedwidth: 100,
        open: true
    };
    var rightcol = {
        id: "#rightcol",
        left: 75,
        width: 25,
        abswidth: 100,
        savedwidth: 100,
        open: true
    }
    var modelstage = {
        id: "#modelstage",
        left: 25,
        width: 50
    };

    var seg1 = {
        id: "#seg1",
        top: 0,
        height: 30
    }
    var seg2 = {
        id: "#seg2",
        top: 30,
        height: 30
    }
    var seg3 = {
        id: "#seg3",
        top: 60,
        height: 40
    }
    var flexColumns = [leftcol, modelstage, rightcol];
    $("#expandbtn").mouseover(function () {
        $("body").css("cursor", "pointer");
    }).click(function () {
        counter = 50;
        opacity = 1;
        expandModelStage();
    }).mouseout(function () {
        $("body").css("cursor", "default");
    })
    $("#collapsebtn").mouseover(function () {
        $("body").css("cursor", "pointer");
    }).click(function () {
        counter = 50;
        opacity = 1;
        collapseModelStage();
    }).mouseout(function () {
        $("body").css("cursor", "default");
    })
    $("#hdrag1").mousedown(function () {
        $dragging = $("#hdrag1");
        $dragging.dir = "horizontal";
        $dragging.bounds = {
            "top": 1,
            "bottom": 46
        };
        $dragging.cells = {
            c1: seg1,
            c2: seg2
        }
    });
    $("#hdrag2").mousedown(function () {
        $dragging = $("#hdrag2");
        $dragging.dir = "horizontal";
        $dragging.bounds = {
            "top": 54,
            "bottom": 98
        };
        $dragging.cells = {
            c1: seg2,
            c2: seg3
        }
    })
    $("#handle").mousedown(function () {
        $dragging = $("#drag1");
        $dragging.dir = "vertical";
        $dragging.bounds = {
            "left": 1,
            "right": 46,
        };
        $dragging.cells = {
            c1: leftcol,
            c2: modelstage
        }
    })

    $("#drag2").mousedown(function () {
        $dragging = $("#drag2");
        $dragging.dir = "vertical";
        $dragging.bounds = {
            "left": 54,
            "right": 98
        };
        $dragging.cells = {
            c1: modelstage,
            c2: rightcol
        }
    })
    $("#leftPanelBtn").click(function () {
        togglePanel("leftcol");
    });
    $("#rightPanelBtn").click(function () {
        togglePanel("rightcol");
    });
    $("#toggleChatBtn").click(function () {
        if (($("#toggleChatBtn")[0].textContent) === "-") {
            minimizeChat();
        } else {
            maximizeChat();
        }
    })
    $(document).mousemove(function (e) {
        if ($dragging) {
            mx = e.clientX;
            my = e.clientY - $("#leftcol")[0].getBoundingClientRect().top;
            pagex = appdiv.getBoundingClientRect().width;
            pagey = $("#leftcol")[0].getBoundingClientRect().height;
            left = ((mx / pagex) * 100);
            topMouse = ((my / pagey) * 100);
            if ($dragging.dir === "horizontal") {
                adjustHorzPositions();
            } else {
                adjustVertPositions();
            }
        }
    }).mouseup(function () {
        $dragging = null;
        leftcol.abswidth = $("#leftcol")[0].getBoundingClientRect().width;
        rightcol.abswidth = $("#rightcol")[0].getBoundingClientRect().width;
    });
    function adjustVertPositions() {
        var comboWidth = ($dragging.cells.c1.width + $dragging.cells.c2.width);
        $dragging.cells.c1.width = left - $dragging.cells.c1.left;
        $dragging.cells.c2.left = left;
        $dragging.cells.c2.width = comboWidth - $dragging.cells.c1.width;
        $($dragging).css({ "left": $dragging.cells.c2.left + "%" });
        $($dragging.cells.c1.id).css({ "width": $dragging.cells.c1.width + "%" });
        $($dragging.cells.c2.id).css({ "width": $dragging.cells.c2.width + "%", "left": $dragging.cells.c2.left + "%" });
    }
    function adjustHorzPositions() {
        var comboHeight = ($dragging.cells.c1.height + $dragging.cells.c2.height);
        $dragging.cells.c1.height = topMouse - $dragging.cells.c1.top;
        $dragging.cells.c2.top = topMouse;
        $dragging.cells.c2.height = comboHeight - $dragging.cells.c1.height;
        $($dragging).css({ "top": $dragging.cells.c2.top + "%" });
        $($dragging.cells.c1.id).css({ "height": $dragging.cells.c1.height + "%" });
        $($dragging.cells.c2.id).css({ "height": $dragging.cells.c2.height + "%", "top": $dragging.cells.c2.top + "%" });
    }
    function close(panel) {
        recordSidePanelWidths();
        if (panel === "leftcol") {
            leftColWidth = Math.round(leftcol.abswidth);
            leftcol.open = false;
            closeLeftPanel();
        } else {
            rightColWidth = Math.round(rightcol.abswidth);
            rightcol.open = false;
            closeRightPanel();
        }
    }
    function open(panel) {
        if (panel === "leftcol") {
            leftColWidth = 0;
            leftcol.open = true;
            openLeftPanel();
        } else {
            rightColWidth: 0;
            rightcol.open = true;
            openRightPanel();
        }
    }
    function togglePanel(panel) {
        if (window[panel].open) {
            close(panel);
        } else {
            open(panel);
        }
    }
    function closeLeftPanel() {
        if (leftColWidth > $tSpeed) {
            leftColWidth -= $tSpeed;
            $("#leftcol").css("width", leftColWidth);
            $("#drag1").css("left", leftColWidth);
            requestAnimationFrame(closeLeftPanel);
        } else {
            $("#leftcol").css("width", 0);
            $("#drag1").css("left", 0);
        }

    }
    function closeRightPanel() {
        if (rightColWidth > $tSpeed) {
            rightColWidth -= $tSpeed;
            $("#rightcol").css({ "width": rightColWidth, "left": (bodywidth - rightColWidth) });
            $("#drag2").css("left", (bodywidth - rightColWidth));
            requestAnimationFrame(closeRightPanel);
        } else {
            $("#rightcol").css({ "width": 0, "left": bodywidth });
            $("#drag2").css("left", bodywidth);
        }
    }
    function openLeftPanel() {
        if (leftColWidth < (leftcol.savedwidth - $tSpeed)) {
            leftColWidth += $tSpeed;
            $("#leftcol").css("width", leftColWidth);
            $("#drag1").css("left", leftColWidth);
            requestAnimationFrame(openLeftPanel);
        } else {
            $("#leftcol").css("width", leftcol.savedwidth);
            $("#drag1").css("left", leftcol.savedwidth);
        }
    }

    function openRightPanel() {
        if (rightColWidth < (rightcol.savedwidth - $tSpeed)) {
            rightColWidth += $tSpeed;
            $("#rightcol").css({ "width": rightColWidth, "left": (bodywidth - rightColWidth) })
            $("#drag2").css("left", (bodywidth - rightColWidth));
            requestAnimationFrame(openRightPanel);
        } else {
            $("#rightcol").css({ "width": rightcol.savedwidth, "left": (bodywidth - rightcol.savedwidth) })
            $("#drag2").css("left", (bodywidth - rightcol.savedwidth));
        }
    }
    function expandModelStage() {
        var w, h;
        if (counter < 100) {
            counter += 4;
            if (opacity <= 0) {
                opacity = 0;
            } else {
                opacity = (Math.round((opacity - 0.1) * 10) / 10);
            }
            w = counter + "%";
            h = w;
            $("#modelstage").css({ "width": w, "height": h });
            $("#expandbtn").css({ "display": "none", "opacity": opacity });
            $("#collapsebtn").css({ "display": "block", "opacity": (1 - opacity) });
            requestAnimationFrame(expandModelStage);
        }
    }

    function collapseModelStage() {
        var w, h;
        if (counter < 100) {
            counter += 4;
            if (opacity <= 0) {
                opacity = 0;
            } else {
                opacity = (Math.round((opacity - 0.1) * 10) / 10);
            }
            w = (150 - counter) + "%";
            h = (195 - counter) + "%";
            $("#modelstage").css({ "width": w, "height": h });
            $("#expandbtn").css({ "opacity": (1 - opacity) });
            $("#collapsebtn").css({ "display": "none", "opacity": opacity });
            requestAnimationFrame(collapseModelStage);
        } else {
            $("#modelstage").css({ "left": "50%", "right": "50%", "width": "50%", "height": "90%" });
            $("#expandbtn").css({ "display": "block", "opacity": 1 });
        }
    }
    function responsiveLayout() {
        leftcol.abswidth = $("#leftcol")[0].getBoundingClientRect().width;
        rightcol.abswidth = $("#rightcol")[0].getBoundingClientRect().width;
        bodywidth = $("body")[0].getBoundingClientRect().width;
        if (bodywidth < 450) {
            if ($("#toggleChatBtn")[0].textContent === "-") {
                fullscreenChat();
            }
            if (leftcol.open) {
                close("leftcol");
                leftcol.savedwidth = 250;
            }
        } else {
            if ($("#toggleChatBtn")[0].textContent === "-") {
                windowChat();
            }
            if (!leftcol.open) {
                open("leftcol");
            }
            $("#modelstage").css({ "width": modelstage.width + "%", "left": modelstage.left + "%" });
        }
    }
    function maximizeChat() {
        if (bodywidth < 450) {
            fullscreenChat();
        } else {
            windowChat();
        }
    }
    function fullscreenChat() {
        $("#rightcol").css({ "visibility": "visible", "height": "100%", "width": "100%", "margin": "0px", "border-radius": "0px" });
        $("#toggleChatBtn").text("-");
    }
    function minimizeChat() {
        $("#rightcol").css({ "height": "40px", "width": "110px" });
        $("#toggleChatBtn").text("+");
    }
    function windowChat() {
        $("#rightcol").css({ "visibility": "visible", "height": "90%", "width": "300px" });
        $("#toggleChatBtn").text("-");
    }
    function recordSidePanelWidths() {
        if (leftcol.open) {
            var leftcoldiv = $("#leftcol")[0].getBoundingClientRect();
            leftcol.savedwidth = leftcoldiv.width;
        }
        if (rightcol.open) {
            var rightcoldiv = $("#rightcol")[0].getBoundingClientRect();
            rightcol.savedwidth = rightcoldiv.width;
        }
    }
    leftcol.abswidth = $("#leftcol")[0].getBoundingClientRect().width;
    leftcol.savedwidth = leftcol.abswidth;
    function moveCol(){
        $("#rightcol").addClass("moveCol");
    }
//})();