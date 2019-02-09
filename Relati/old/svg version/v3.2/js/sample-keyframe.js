(function (button, container) {
    var board = new SymtusBoard(5, 5);
    var messageAccept = document.getElementById("message-accept");
    var frameKey = 0;
    var keyframes = [
        function () {
            board.C3.symbol = "O";
            board.C3.status = "source";
            board.B2.status = "O.next";
        },
        function () {
            board.B2.symbol = "O";
        },
        function () {
            board.viewer.appendGridPath([board.B2, board.C3]);
        },
        function () {
            board.viewer.removeBackground();
            board.B2.symbol = "";
            board.C2.status = "O.next";
        },
        function () {
            board.C2.symbol = "O";
        },
        function () {
            board.viewer.appendGridPath([board.C2, board.C3]);
        },
        function () {
            board.viewer.removeBackground();
            board.C2.symbol = "";
            board.C1.status = "O.next";
        },
        function () {
            board.C1.symbol = "O";
        },
        function () {
            board.viewer.appendGridPath([board.C1, board.C3]);
        },
        function () {
            board.viewer.removeBackground();
            board.C1.symbol = "";
            board.A1.status = "O.next";
        },
        function () {
            board.A1.symbol = "O";
        },
        function () {
            board.viewer.appendGridPath([board.A1, board.C3]);
        },
        function () {
            board.viewer.removeBackground();
            board.A1.symbol = "";
            board.A2.status = "O.next";
        },
        function () {
            board.A2.symbol = "O";
        },
        function () {
            board.viewer.appendGridPath([board.A2, board.A3, board.C3]);
        },
        function () {
            board.viewer.removeBackground();
            board.viewer.appendGridPath([board.A2, board.B2, board.B3, board.C3]);
        },
        function () {
            board.viewer.removeBackground();
            board.viewer.appendGridPath([board.A2, board.C2, board.C3]);
        },
        function () {
            board.viewer.removeBackground();
            board.A2.symbol = "";
            board.B1.status = "O.next";
        },
        function () {
            board.B1.symbol = "O";
        },
        function () {
            board.viewer.appendGridPath([board.B1, board.B3, board.C3]);
        },
        function () {
            board.viewer.removeBackground();
            board.viewer.appendGridPath([board.B1, board.B2, board.C2, board.C3]);
        },
        function () {
            board.viewer.removeBackground();
            board.viewer.appendGridPath([board.B1, board.C1, board.C3]);
        },
        function () {
            board.viewer.removeBackground();
            board.B1.symbol = "";
        }
    ].concat([
        function () {
            board.C3.symbol = "O";
            board.C3.status = "source";
        },
        function () {
            board.D2.symbol = "X";
            board.D2.status = "source";
        },
        function () {
            board.C1.status = "O.next";
        },
        function () {
            board.C1.symbol = "O";
        },
        function () {
            board.viewer.appendGridPath([board.C1, board.C3]);
        },
        function () {
            board.C2.status = "X.next";
        },
        function () {
            board.C2.symbol = "X";
        },
        function () {
            board.viewer.appendGridPath([board.C2, board.D2]);
        },
        function () {
            board.viewer.removeBackground();
            board.viewer.appendGridPath([board.C1, board.C3], "#666");
        },
        function () {
            board.C1.status = "forbid";
            board.B2.status = "O.next";
        },
        function () {
            board.B2.symbol = "O";
        },
        function () {
            board.viewer.removeBackground();
            board.viewer.appendGridPath([board.B2, board.C3]);
        },
        function () {
            board.viewer.appendGridPath([board.B2, board.C1]);
        },
        function () {
            board.C1.status = "normal";
        },
        function () {
            board.viewer.removeBackground();
            board.C4.status = "X.next";
        },
        function () {
            board.C4.symbol = "X";
        },
        function () {
            board.viewer.appendGridPath([board.C4, board.D4, board.D2]);
        },
        function () {
            board.D3.status = "O.next";
        },
        function () {
            board.D3.symbol = "O";
        },
        function () {
            board.viewer.appendGridPath([board.D3, board.C3]);
        },
        function () {
            board.viewer.removeBackground();
            board.viewer.appendGridPath([board.C4, board.D4, board.D2], "#666");
        },
        function () {
            board.C4.status = "forbid";
            board.E3.status = "X.next";
        },
        function () {
            board.E3.symbol = "X";
        },
        function () {
            board.viewer.removeBackground();
            board.viewer.appendGridPath([board.E3, board.D2]);
        },
        function () {
            board.viewer.appendGridPath([board.E3, board.E4, board.C4]);
        },
        function () {
            board.C4.status = "normal";
        },
        function () {
            board.D4.status = "O.next";
        },
        function () {
            board.D4.symbol = "O";
        },
        function () {
            board.viewer.appendGridPath([board.D4, board.D3]);
            board.viewer.appendGridPath([board.D4, board.C3]);
        },
        function () {
            board.viewer.removeBackground();
            board.viewer.appendGridPath([board.E3, board.E4, board.C4], "#666");
        },
        function () {
            board.C4.status = "forbid";
        },
        function () {
            board.viewer.removeBackground();
            board.D5.status = "X.next";
        },
        function () {
            board.D5.symbol = "X";
        },
        function () {
            board.viewer.appendGridPath([board.E3, board.E5, board.D5]);
        },
        function () {
            board.viewer.appendGridPath([board.D5, board.C4]);
        },
        function () {
            board.C4.status = "normal";
        },
        function () {
            board.E4.status = "O.next";
        },
        function () {
            board.E4.symbol = "O";
        },
        function () {
            board.viewer.appendGridPath([board.E4, board.D3]);
            board.viewer.appendGridPath([board.E4, board.D4]);
        },
        function () {
            board.viewer.removeBackground();
            board.viewer.appendGridPath([board.E3, board.E5, board.D5], "#666");
            board.viewer.appendGridPath([board.D5, board.C4]);
        },
        function () {
            board.D5.status = "forbid";
        },
        function () {
            board.viewer.removeBackground();
            board.viewer.appendGridPath([board.D5, board.C4], "#666");
        },
        function () {
            board.C4.status = "forbid";
        },
        function () {
            board.viewer.removeBackground();
            board.D1.status = "X.next";
        },
        function () {
            board.D1.symbol = "X";
        },
        function () {
            board.viewer.appendGridPath([board.D1, board.C2]);
            board.viewer.appendGridPath([board.D1, board.D2]);
        },
        function () {
            board.viewer.removeBackground();
            board.B3.status = "O.next";
        },
        function () {
            board.B3.symbol = "O";
        },
        function () {
            board.viewer.appendGridPath([board.B3, board.B2]);
            board.viewer.appendGridPath([board.B3, board.C3]);
        },
        function () {
            board.viewer.removeBackground();
            board.B1.status = "X.next";
        },
        function () {
            board.B1.symbol = "X";
        },
        function () {
            board.viewer.appendGridPath([board.B1, board.C2]);
        },
        function () {
            board.viewer.removeBackground();
            board.A2.status = "O.next";
        },
        function () {
            board.A2.symbol = "O";
        },
        function () {
            board.viewer.appendGridPath([board.A2, board.B2]);
            board.viewer.appendGridPath([board.A2, board.B3]);
        },
        function () {
            board.viewer.removeBackground();
            board.E2.status = "X.next";
        },
        function () {
            board.E2.symbol = "X";
        },
        function () {
            board.viewer.appendGridPath([board.E2, board.D1]);
            board.viewer.appendGridPath([board.E2, board.D2]);
            board.viewer.appendGridPath([board.E2, board.E3]);
        },
        function () {
            board.viewer.removeBackground();
            board.A1.status = "O.next";
        },
        function () {
            board.A1.symbol = "O";
        },
        function () {
            board.viewer.appendGridPath([board.A1, board.A2]);
            board.viewer.appendGridPath([board.A1, board.B2]);
        },
        function () {
            board.viewer.removeBackground();
            board.E1.status = "X.next";
        },
        function () {
            board.E1.symbol = "X";
        },
        function () {
            board.viewer.appendGridPath([board.E1, board.E2]);
            board.viewer.appendGridPath([board.E1, board.D1]);
            board.viewer.appendGridPath([board.E1, board.D2]);
        },
        function () {
            board.viewer.removeBackground();
            board.E5.status = "O.next";
        },
        function () {
            board.E5.symbol = "O";
        },
        function () {
            board.viewer.appendGridPath([board.E5, board.D4]);
            board.viewer.appendGridPath([board.E5, board.E4]);
        },
        function () {
            board.viewer.removeBackground();
        }
    ]);
    board.viewer.appendIn(container);
    var timer;

    function animateStart() {
        clearInterval(timer);
        frameKey = 0;
        for (var crd in board.gridOf) {
            board[crd].symbol = "";
        }
        board.viewer.removeBackground();

        timer = setInterval(function () {
            if (!keyframes[frameKey]) {
                exitButton.click();
                messageAccept.click();
                return clearInterval(timer);
            }
            keyframes[frameKey]();
            frameKey++;
        }, 1000);
    }

    button.addEventListener("click", function () {
        animateStart();

        for (var i = 0; i < pages.length; i++) {
            pages[i].style.display = "none";
        }

        container.style.display = "";
        exitButton.style.display = "flex";
        board.viewer.resize(container);
    });

    window.addEventListener("resize", function () {
        board.viewer.resize(container);
    });
}(
    document.getElementById("game-rules"),
    document.getElementById("sample-container")
));