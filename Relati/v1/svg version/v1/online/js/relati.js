var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var createSVG = (function () {
    var svgNS = "http://www.w3.org/2000/svg";
    return function (tag) { return document.createElementNS(svgNS, tag); };
})();
var getRelatiList = (function () {
    var dirO = ["F", "B", "R", "L", "FR", "FL", "BR", "BL"];
    var dir2O = dirO.map(function (dir) { return dir + dir; });
    var dirTX = ["FFR", "FFL", "BBR", "BBL", "FRR", "FLL", "BRR", "BLL"];
    var dirT = ["F", "F", "B", "B", "R", "L", "R", "L"];
    var dir2T = dirT.map(function (dir) { return dir + dir; });
    function normalRelatiList(grid, sym) {
        var list = [];
        for (var i = 0; i < dirO.length; i++) {
            var sourceGrid = grid.getGridFromDir(dirO[i]);
            if (!sourceGrid)
                continue;
            if (sourceGrid.symbol === sym && sourceGrid.status !== "forbid") {
                list.push(sourceGrid);
            }
        }
        return list;
    }
    function remoteRelatiList(grid, sym) {
        var list = [];
        for (var i = 0; i < dir2O.length; i++) {
            var sourceGrid = grid.getGridFromDir(dir2O[i]);
            if (!sourceGrid)
                continue;
            var spaceGrid = grid.getGridFromDir(dirO[i]);
            if (sourceGrid.symbol === sym && sourceGrid.status !== "forbid") {
                if (spaceGrid.symbol === "") {
                    list.push(sourceGrid);
                }
            }
        }
        return list;
    }
    function remoteStableRelatiList(grid, sym) {
        var list = [];
        for (var i = 0; i < dirTX.length; i++) {
            var sourceGrid = grid.getGridFromDir(dirTX[i]);
            if (!sourceGrid)
                continue;
            var spaceGrid2T = grid.getGridFromDir(dir2T[i]);
            var spaceGridT = grid.getGridFromDir(dirT[i]);
            var spaceGridIH = grid.getGridFromDir(dirO[i % 4 + 4]);
            var spaceGridI = grid.getGridFromDir(dirO[((i / 2) | 0) % 2]);
            var spaceGridH = grid.getGridFromDir(dirO[i % 2 + 2]);
            if (sourceGrid.symbol === sym && sourceGrid.status !== "forbid") {
                if (spaceGrid2T.symbol === "" &&
                    spaceGridT.symbol === "") {
                    list.push(sourceGrid);
                    continue;
                }
                if (spaceGridIH.symbol === "") {
                    if (spaceGridI.symbol === "") {
                        list.push(sourceGrid);
                        continue;
                    }
                    if (spaceGridH.symbol === "") {
                        list.push(sourceGrid);
                        continue;
                    }
                }
            }
        }
        return list;
    }
    return function getRelatiList(grid, sym, easy) {
        var list = [];
        list = list.concat(normalRelatiList(grid, sym));
        if (!easy) {
            list = list.concat(remoteRelatiList(grid, sym));
            list = list.concat(remoteStableRelatiList(grid, sym));
        }
        return list;
    };
})();
var RelatiBoard = /** @class */ (function (_super) {
    __extends(RelatiBoard, _super);
    function RelatiBoard(width, height) {
        var _this = _super.call(this, width, height) || this;
        var viewer = createSVG("svg");
        viewer.setAttribute("width", "" + width * 40);
        viewer.setAttribute("height", "" + height * 40);
        for (var x = 1; x < width; x++) {
            var line = createSVG("path");
            line.setAttribute("stroke-width", "" + 2);
            line.setAttribute("d", "M " + x * 40 + " 0 V " + width * 40);
            line.setAttribute("stroke", "#888");
            viewer.appendChild(line);
        }
        for (var y = 1; y < height; y++) {
            var line = createSVG("path");
            line.setAttribute("stroke-width", "" + 2);
            line.setAttribute("d", "M 0 " + y * 40 + " H " + height * 40);
            line.setAttribute("stroke", "#888");
            viewer.appendChild(line);
        }
        _this.viewer = viewer;
        viewer.addEventListener("click", function (event) {
            var gridSize = parseInt(viewer.getAttribute("width")) / width;
            var x = event.offsetX, y = event.offsetY;
            if (this.ongridselect) {
                this.ongridselect(this.grids[(x / gridSize) | 0][(y / gridSize) | 0]);
            }
        }.bind(_this));
        return _this;
    }
    return RelatiBoard;
}(GridBoard));
var gameStartButton = document.getElementById("game-start");
var gameRulesButton = document.getElementById("game-rules");
var selectModeButton = document.getElementById("select-mode");
var cleanBoardButton = document.getElementById("clean-board");
var setUserNameButton = document.getElementById("set-user-name");
var userNameTextBox = document.getElementById("user-name");
var messageBox = document.getElementById("message-box");
var message = document.getElementById("message");
var welcomePage = document.getElementById("welcome-page");
var selectPage = document.getElementById("select-page");
var boardPage = document.getElementById("board-page");
var rulesPage = document.getElementById("rules-page");
var arenaUserPage = document.getElementById("arena-user-page");
var arenaPage = document.getElementById("arena-page");
var board5x5 = document.getElementById("board-5x5");
var board7x7 = document.getElementById("board-7x7");
var board9x9 = document.getElementById("board-9x9");
var board11x11 = document.getElementById("board-11x11");
gameStartButton.addEventListener("click", function () {
    welcomePage.classList.remove("active");
    selectPage.classList.add("active");
});
gameRulesButton.addEventListener("click", function () {
    welcomePage.classList.remove("active");
    rulesPage.classList.add("active");
});
selectModeButton.addEventListener("click", function () {
    rulesPage.classList.remove("active");
    selectPage.classList.add("active");
});
board5x5.addEventListener("click", function () { return relati().easy(5); });
board7x7.addEventListener("click", function () { return relati().easy(7); });
board9x9.addEventListener("click", function () { return relati().hard(9); });
board11x11.addEventListener("click", function () { return relati().hard(11); });
function relati() {
    selectPage.classList.remove("active");
    arenaUserPage.classList.add("active");
    var userName = "";
    var mySym = "";
    var roomId = "";
    var turn = 0;
    var symbol = "OX";
    var symbolViewCreate = {
        O: function (x, y) {
            var circle = createSVG("circle");
            x *= 40;
            y *= 40;
            circle.setAttribute("stroke-width", "" + 3);
            circle.setAttribute("cx", x + 20);
            circle.setAttribute("cy", y + 20);
            circle.setAttribute("r", "" + 12);
            circle.setAttribute("stroke", "#dc143c");
            circle.setAttribute("fill", "none");
            return [circle];
        },
        X: function (x, y) {
            var lineL = createSVG("path");
            var lineR = createSVG("path");
            x *= 40;
            y *= 40;
            var startX = x + 8;
            var startY = y + 8;
            var endX = x + 32;
            var endY = y + 32;
            lineL.setAttribute("stroke-width", "" + 3);
            lineL.setAttribute("d", "M " + startX + " " + startY + " L " + endX + " " + endY);
            lineL.setAttribute("stroke", "#4169e1");
            lineR.setAttribute("stroke-width", "" + 3);
            lineR.setAttribute("d", "M " + startX + " " + endY + " L " + endX + " " + startY);
            lineR.setAttribute("stroke", "#4169e1");
            return [lineL, lineR];
        }
    };
    var domainViews = [];
    var domainViewCreate = function (x, y, sym) {
        var dot = createSVG("circle");
        x *= 40;
        y *= 40;
        dot.setAttribute("cx", x + 20);
        dot.setAttribute("cy", y + 20);
        dot.setAttribute("r", "" + 1);
        dot.setAttribute("fill", "" + (sym === "O" ? "#dc143c" : "#4169e1"));
        return dot;
    };
    function clean(board) {
        for (var crd in board.gridOf) {
            var grid = board.gridOf[crd];
            grid.symbol = "";
            grid.status = "";
            var symbolViews = grid.symbolViews;
            if (symbolViews) {
                for (var i = 0; i < symbolViews.length; i++) {
                    board.viewer.removeChild(symbolViews[i]);
                }
            }
            grid.symbolViews = [];
        }
        for (var i = 0; i < domainViews.length; i++) {
            board.viewer.removeChild(domainViews[i]);
        }
        domainViews = [];
        turn = 0;
        messageBox.style.display = "none";
    }
    function initialize(board, width, easy) {
        joinArena(board, width);
        function viewerResize() {
            var size = (Math.min(window.innerWidth, window.innerHeight) * 0.9) | 0;
            board.viewer.style.transform = "scale(" + size / (width * 40) + ")";
        }
        boardPage.appendChild(board.viewer);
        viewerResize();
        window.addEventListener("resize", viewerResize);
        board.ongridselect = function (grid, fromOnline) {
            if (!grid || grid.symbol)
                return;
            var sym = symbol[turn % 2];
            if (sym !== mySym && !fromOnline)
                return;
            if (getRelatiList(grid, sym, easy).length > 0 || turn < 2) {
                var isSource = !easy && turn < 2;
                if (isSource)
                    grid.status = "source";
                grid.symbol = sym;
                grid.symbolViews = symbolViewCreate[sym](grid.x, grid.y);
                for (var i = 0; i < grid.symbolViews.length; i++) {
                    var symbolView = grid.symbolViews[i];
                    if (isSource)
                        symbolView.setAttribute("stroke-width", 5);
                    board.viewer.appendChild(symbolView);
                }
                firebase.database().ref("/" + width + "/rooms/" + roomId).set(grid.crd);
                turn++;
                var sym = symbol[turn % 2];
                var nextExist = turn < 2;
                for (var crd in board.gridOf) {
                    var grid = board.gridOf[crd];
                    if (grid.symbol !== "")
                        continue;
                    var list = getRelatiList(grid, sym, easy);
                    if (list.length > 0) {
                        nextExist = true;
                    }
                }
                if (!nextExist) {
                    cleanBoardButton.className = "click-control for-" + sym;
                    message.innerHTML = sym + "\u65B9\u8F38\u4E86";
                    if (turn === Math.pow(width, 2)) {
                        message.innerHTML = "平手";
                        cleanBoardButton.className = "click-control";
                    }
                    messageBox.style.display = "flex";
                }
                if (!easy)
                    relatiForbid(board);
                relatiDomain(board, easy);
            }
        };
        clean(board);
        cleanBoardButton.addEventListener("click", function () {
            clean(board);
        });
    }
    function relatiForbid(board) {
        var sourceGrid = [];
        var related = [];
        for (var crd in board.gridOf) {
            var grid = board.gridOf[crd];
            if (grid.status !== "source") {
                grid.status = "normal";
                var symbolViews = grid.symbolViews;
                if (symbolViews) {
                    for (var i = 0; i < symbolViews.length; i++) {
                        symbolViews[i].setAttribute("stroke", grid.symbol === "O"
                            ? "#dc143c"
                            : "#4169e1");
                    }
                }
            }
            else {
                sourceGrid.push(grid);
            }
        }
        function relatiTree(source) {
            var relatiList = getRelatiList(source, source.symbol);
            for (var i = 0; i < relatiList.length; i++) {
                var relatiGrid = relatiList[i];
                if (related.indexOf(relatiGrid) < 0) {
                    related.push(relatiGrid);
                    relatiTree(relatiGrid);
                }
            }
        }
        sourceGrid.forEach(function (grid) {
            related.push(grid);
            relatiTree(grid);
        });
        for (var crd in board.gridOf) {
            var grid = board.gridOf[crd];
            if (grid.symbol && grid.status !== "source") {
                if (related.indexOf(grid) < 0) {
                    grid.status = "forbid";
                    var symbolViews = grid.symbolViews;
                    for (var i = 0; i < symbolViews.length; i++) {
                        symbolViews[i].setAttribute("stroke", "#bbb");
                    }
                }
            }
        }
    }
    function relatiDomain(board, easy) {
        var domain = { O: [], X: [], P: [] };
        for (var i = 0; i < domainViews.length; i++) {
            board.viewer.removeChild(domainViews[i]);
        }
        domainViews = [];
        for (var crd in board.gridOf) {
            var grid = board.gridOf[crd];
            if (grid.symbol)
                continue;
            var list = {};
            for (var i = 0; i < symbol.length; i++) {
                var sym = symbol[i];
                list[sym] = getRelatiList(grid, sym, easy);
            }
            if (list["O"].length > 0 && list["X"].length > 0) {
                domain.P.push(grid);
            }
            else {
                for (var i = 0; i < symbol.length; i++) {
                    var sym = symbol[i];
                    if (list[sym].length > 0) {
                        var domainView = domainViewCreate(grid.x, grid.y, sym);
                        domainViews.push(domainView);
                        board.viewer.appendChild(domainView);
                        domain[sym].push(grid);
                    }
                }
            }
        }
    }
    function joinArena(board, size) {
        setUserNameButton.addEventListener("click", function () {
            userName = userNameTextBox.value;
            firebase.database().ref("/" + size + "/users/" + userName).remove();
            firebase.database().ref("/" + size + "/users/" + userName).once("value", function (data) {
                var value = data.val();
                if (!value) {
                    firebase.database().ref("/" + size + "/users/" + userName).set(true);
                }
                else {
                    alert("該名稱已有人使用");
                }
            });
            firebase.database().ref("/" + size + "/users/" + userName).on("value", function (data) {
                var value = data.val();
                if (!value) {
                    firebase.database().ref("/" + size + "/users/" + userName).set(true);
                }
                else if (typeof value === "string") {
                    mySym = "O";
                    roomId = value;
                    firebase.database().ref("/" + size + "/rooms/" + roomId).on("value", function (data) {
                        var value = data.val();
                        board.ongridselect(board.gridOf[value], true);
                    });
                    arenaPage.classList.remove("active");
                    boardPage.classList.add("active");
                }
            });
            var existUser = {};
            firebase.database().ref("/" + size + "/users/").on("value", function (data) {
                var value = data.val();
                for (var name in value) {
                    if (name === userName)
                        continue;
                    if (!existUser[name]) {
                        var userView = document.createElement("div");
                        userView.className = "click-control";
                        userView.innerHTML = name;
                        (function (name) {
                            userView.addEventListener("click", function () {
                                var userExist = false;
                                roomId = createRoomId();
                                firebase.database().ref("/" + size + "/users/" + name).set(roomId);
                                firebase.database().ref("/" + size + "/rooms/" + roomId).on("value", function (data) {
                                    if (!userExist) {
                                        mySym = "X";
                                        arenaPage.classList.remove("active");
                                        boardPage.classList.add("active");
                                        userExist = true;
                                    }
                                    var value = data.val();
                                    board.ongridselect(board.gridOf[value], true);
                                });
                            });
                        })(name);
                        existUser[name] = userView;
                        arenaPage.appendChild(userView);
                    }
                }
                for (var name in existUser) {
                    if (!value[name]) {
                        arenaPage.removeChild(existUser[name]);
                        existUser[name] = undefined;
                    }
                }
            });
            arenaUserPage.classList.remove("active");
            arenaPage.classList.add("active");
        });
    }
    function createRoomId() {
        var result = "";
        for (var i = 0; i < 6; i++) {
            result += Math.floor(Math.random() * 16).toString(16);
        }
        return result;
    }
    return {
        easy: function (size) {
            var board = new RelatiBoard(size, size);
            initialize(board, size, true);
        },
        hard: function (size) {
            var board = new RelatiBoard(size, size);
            initialize(board, size);
        }
    };
}
