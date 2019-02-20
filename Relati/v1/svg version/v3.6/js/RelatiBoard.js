"use strict";
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
var RelatiProp;
(function (RelatiProp) {
    RelatiProp[RelatiProp["symbol"] = 0] = "symbol";
    RelatiProp[RelatiProp["status"] = 1] = "status";
})(RelatiProp || (RelatiProp = {}));
var RelatiRemoteStable = {
    directions: [
        { target: "IIH", spaces: "I,II,IH,H" },
        { target: "IHH", spaces: "H,HH,HI,I" }
    ],
    spaceDirectionIndexes: [[0, 1], [3, 2], [0, 2]]
};
var RelatiGrid = /** @class */ (function (_super) {
    __extends(RelatiGrid, _super);
    function RelatiGrid(board, x, y) {
        var _this = _super.call(this, board, x, y) || this;
        _this.view = new RelatiGridSymbol(_this);
        _this.prop[RelatiProp.symbol] = "";
        _this.prop[RelatiProp.status] = "normal";
        board.viewer.appendView(_this.view);
        return _this;
    }
    Object.defineProperty(RelatiGrid.prototype, "symbol", {
        get: function () { return this.prop[RelatiProp.symbol]; },
        set: function (symbol) { this.prop[RelatiProp.symbol] = symbol; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RelatiGrid.prototype, "status", {
        get: function () { return this.prop[RelatiProp.status]; },
        set: function (status) { this.prop[RelatiProp.status] = status; },
        enumerable: true,
        configurable: true
    });
    RelatiGrid.prototype.is = function (status) {
        if (status.indexOf("|") > -1) {
            var statusList = status.split("|");
            for (var _i = 0, statusList_1 = statusList; _i < statusList_1.length; _i++) {
                var status = statusList_1[_i];
                if (this.is(status))
                    return true;
            }
            return false;
        }
        if (status.indexOf("&") > -1 || status.indexOf(" ") > -1) {
            var statusList = status.replace(/ /g, "&").split("&");
            for (var _a = 0, statusList_2 = statusList; _a < statusList_2.length; _a++) {
                var status = statusList_2[_a];
                if (!this.is(status))
                    return false;
            }
            return true;
        }
        switch (status) {
            case "ownerO": return this.symbol == "O";
            case "ownerX": return this.symbol == "X";
            case "spaceR": return this.symbol == "";
            case "spaceF": return (this.status == "broken" ||
                this.status == "defeat");
            case "space": return (this.symbol == "" ||
                this.status == "broken" ||
                this.status == "defeat");
            case "valid": return (this.status == "normal" ||
                this.status == "source");
        }
        return this.status == status;
    };
    RelatiGrid.prototype.by = function (type, symbol) {
        var grids;
        var result = [];
        var lagal = "owner" + symbol + " valid";
        if (type == "relati" || type == "relati-normal") {
            grids = this.queries("O");
            for (var _i = 0, grids_1 = grids; _i < grids_1.length; _i++) {
                var grid = grids_1[_i];
                if (grid && grid.is(lagal)) {
                    result.push(grid);
                }
            }
        }
        if (type == "relati" || type == "relati-remote" || type == "relati-remote-normal") {
            var spaceGrids = this.queries("O");
            grids = this.queries("2O");
            for (var _a = 0, grids_2 = grids; _a < grids_2.length; _a++) {
                var grid = grids_2[_a];
                var spaceGrid = spaceGrids.splice(0, 1)[0];
                if (grid && grid.is(lagal) && spaceGrid.is("space")) {
                    result.push(grid);
                }
            }
        }
        if (type == "relati" || type == "relati-remote" || type == "relati-remote-stable") {
            var directions = RelatiRemoteStable.directions, spaceDirectionIndexes = RelatiRemoteStable.spaceDirectionIndexes;
            for (var _b = 0, directions_1 = directions; _b < directions_1.length; _b++) {
                var direction = directions_1[_b];
                var spaceGridLists = this.queries(direction.spaces);
                grids = this.queries(direction.target);
                for (var _c = 0, grids_3 = grids; _c < grids_3.length; _c++) {
                    var grid = grids_3[_c];
                    var spaceGrids = spaceGridLists.splice(0, 4);
                    if (grid && grid.is(lagal)) {
                        for (var _d = 0, spaceDirectionIndexes_1 = spaceDirectionIndexes; _d < spaceDirectionIndexes_1.length; _d++) {
                            var spaceDirectionIndex = spaceDirectionIndexes_1[_d];
                            if (spaceGrids[spaceDirectionIndex[0]].is("space") &&
                                spaceGrids[spaceDirectionIndex[1]].is("space")) {
                                result.push(grid);
                                break;
                            }
                        }
                    }
                }
            }
        }
        return result;
    };
    return RelatiGrid;
}(Grid));
var RelatiBoard = /** @class */ (function (_super) {
    __extends(RelatiBoard, _super);
    function RelatiBoard(width, height) {
        var _this = _super.call(this, width, height) || this;
        _this.allGrids = [];
        _this.viewer = new GridBoardViewer(_this, createSVG("svg"));
        _this.view = new RelatiBackground(_this);
        for (var x = 0; x < width; x++) {
            for (var y = 0; y < height; y++) {
                var grid = new RelatiGrid(_this, x, y);
                _this.grids[x][y] = grid;
                _this.allGrids.push(grid);
            }
        }
        _this.viewer.appendView(_this.view);
        return _this;
    }
    RelatiBoard.prototype.find = function (status) {
        return this.allGrids.filter(function (grid) { return grid.is(status); });
    };
    return RelatiBoard;
}(GridBoard));
