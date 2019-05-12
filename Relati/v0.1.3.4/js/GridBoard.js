"use strict";
var lib;
(function (lib) {
    function createSVG(tagName) {
        return document.createElementNS("http://www.w3.org/2000/svg", tagName);
    }
    var Grid = (function () {
        function Grid(x, y, board) {
            this.x = x;
            this.y = y;
            this.board = board;
            this.crd = "" + String.fromCharCode(x + 65) + (y + 1);
        }
        Grid.prototype.query = function (command) {
            if (this[command])
                return this[command];
            command = command.replace(/ |\n|\t/g, "");
            var result = [];
            var shorten = [/I/g, /H/g, /T/g, /X/g, /O/g];
            var full = [
                ["F", "B"],
                ["R", "L"],
                ["I", "H"],
                ["IH"],
                ["T", "X"]
            ];
            if (command.match(/\;/)) {
                var commands = command.split(";");
                for (var i = 0; i < commands.length; i++) {
                    var command = commands[i];
                    result = result.concat(this.query(command));
                }
                this[commands.join(";")] = result;
                return result;
            }
            if (command.match(/I|H|T|X|O/)) {
                for (var i = 0; i < shorten.length; i++) {
                    if (command.match(shorten[i])) {
                        for (var j = 0; j < full[i].length; j++) {
                            result = result.concat(this.query(command.replace(shorten[i], full[i][j])));
                        }
                        this[command] = result;
                        return result;
                    }
                }
            }
            if (command.match(/\,/)) {
                var commands = command.split(",");
                for (var i = 0; i < commands.length; i++) {
                    var command = commands[i];
                    result = result.concat(this.query(command));
                }
                this[commands.join(",")] = result;
                return result;
            }
            if (command.match(/\~/)) {
                var range = command.match(/(\d|-\d)~(\d|-\d)/);
                if (range) {
                    var dir = command.replace(range[0], "");
                    var units = range[0].split("~").map(function (str) { return parseInt(str); });
                    var commands = [];
                    var preDir = command.substr(0, range.index);
                    dir = dir.replace(preDir, "");
                    if (units[0] < units[1]) {
                        for (var u = units[0]; u <= units[1]; u++) {
                            commands.push("" + preDir + u + dir);
                        }
                    }
                    else {
                        for (var u = units[0]; u >= units[1]; u--) {
                            commands.push("" + preDir + u + dir);
                        }
                    }
                    this[command] = this.query(commands.join(","));
                    return this[command];
                }
            }
            var _a = this, x = _a.x, y = _a.y;
            var unit = 1;
            for (var i = 0; i < command.length; i++) {
                var dir = command[i];
                switch (dir) {
                    case "F":
                        y -= unit;
                        break;
                    case "B":
                        y += unit;
                        break;
                    case "R":
                        x += unit;
                        break;
                    case "L":
                        x -= unit;
                        break;
                    case "+":
                        unit *= 1;
                        break;
                    case "-":
                        unit *= -1;
                        break;
                    default:
                        if (!isNaN(parseInt(dir))) {
                            var prevDir = command[i - 1];
                            if (prevDir && !isNaN(parseInt(prevDir))) {
                                unit = unit * 10 + parseInt(dir);
                            }
                            else {
                                unit = Math.sign(unit) * parseInt(dir);
                            }
                        }
                }
            }
            this[command] = this.board.grids[x] && this.board.grids[x][y];
            return this[command];
        };
        return Grid;
    }());
    lib.Grid = Grid;
    var GridBoardViewer = (function () {
        function GridBoardViewer(board) {
            this.board = board;
            this.body = createSVG("svg");
            this.background = createSVG("g");
            this.body.appendChild(this.background);
            this.body.setAttribute("width", "" + board.width * 5);
            this.body.setAttribute("height", "" + board.height * 5);
            this.body.addEventListener("click", function (event) {
                var x = Math.floor(event.offsetX / 5), y = Math.floor(event.offsetY / 5);
                if (this.onselect) {
                    this.onselect(this.board.grids[x][y]);
                }
            }.bind(this));
            for (var x = 1; x < board.width; x++) {
                var line = createSVG("path");
                line.setAttribute("d", "M " + x * 5 + " 0 V " + board.height * 5);
                line.setAttribute("stroke", "#888");
                line.setAttribute("stroke-width", "0.4");
                this.body.appendChild(line);
            }
            for (var y = 1; y < board.height; y++) {
                var line = createSVG("path");
                line.setAttribute("d", "M 0 " + y * 5 + " H " + board.width * 5);
                line.setAttribute("stroke", "#888");
                line.setAttribute("stroke-width", "0.4");
                this.body.appendChild(line);
            }
        }
        GridBoardViewer.prototype.resize = function (container, scale) {
            if (scale === void 0) { scale = 0.95; }
            var size = Math.min(container.clientWidth / (this.board.width * 5), container.clientHeight / (this.board.height * 5)) * scale;
            this.body.style.transform = "scale(" + size + ")";
        };
        GridBoardViewer.prototype.create = function (tagName, property) {
            if (property === void 0) { property = {}; }
            var element = createSVG(tagName);
            for (var name in property) {
                var value = property[name];
                element.setAttribute(name, value);
            }
            return element;
        };
        GridBoardViewer.prototype.appendIn = function (container) {
            container.appendChild(this.body);
            this.resize(container);
        };
        return GridBoardViewer;
    }());
    lib.GridBoardViewer = GridBoardViewer;
    var GridBoard = (function () {
        function GridBoard(width, height) {
            this.width = width;
            this.height = height;
            this.grids = [];
            this.gridOf = {};
            this.viewer = new GridBoardViewer(this);
            for (var x = 0; x < width; x++) {
                var row = [];
                for (var y = 0; y < height; y++) {
                    var grid = new Grid(x, y, this);
                    this.gridOf[grid.crd] = grid;
                    this[grid.crd] = grid;
                    row.push(grid);
                }
                this.grids.push(row);
            }
        }
        return GridBoard;
    }());
    lib.GridBoard = GridBoard;
})(lib || (lib = {}));
