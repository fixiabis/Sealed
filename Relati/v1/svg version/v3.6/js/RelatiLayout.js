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
var RelatiBackground = /** @class */ (function (_super) {
    __extends(RelatiBackground, _super);
    function RelatiBackground(board) {
        var _this = _super.call(this) || this;
        _this.board = board;
        _this.lineAttribute = {
            "d": "",
            "stroke": "#888",
            "stroke-width": "0.4",
            "fill": "none"
        };
        return _this;
    }
    RelatiBackground.prototype.render = function (viewerBody) {
        var _a = this, board = _a.board, lineAttribute = _a.lineAttribute;
        for (var d = 1; d < 9; d++) {
            var lineX = createSVG("path");
            var lineY = createSVG("path");
            for (var s = 1; s < 4; s++) {
                lineAttribute.d = "M " + d * 5 + " 0 V " + board.width * 5 * s / 3;
                updateSVG(lineX, lineAttribute);
                viewerBody.appendChild(lineX);
                lineAttribute.d = "M 0 " + d * 5 + " H " + board.height * 5 * s / 3;
                updateSVG(lineY, lineAttribute);
                viewerBody.appendChild(lineY);
                if ((d - 1) * 3 + (s - 1) == this.status) {
                    return this.status++;
                }
            }
        }
    };
    return RelatiBackground;
}(GridBoardView));
var RelatiGridSymbol = /** @class */ (function (_super) {
    __extends(RelatiGridSymbol, _super);
    function RelatiGridSymbol(grid) {
        var _this = _super.call(this) || this;
        _this.grid = grid;
        _this.symbolAttribute = {
            "d": "",
            "stroke-width": "0.6",
            "stroke": "",
            "fill": "none",
            "stroke-dasharray": ""
        };
        _this.srtX = grid.x * 5 + 1;
        _this.srtY = grid.y * 5 + 1;
        _this.endX = grid.x * 5 + 4;
        _this.endY = grid.y * 5 + 4;
        return _this;
    }
    RelatiGridSymbol.prototype.render = function (viewerBody) {
        this.symbolAttribute["stroke-width"] = "0.6";
        switch (this.grid.symbol) {
            case "O":
                this.drawO(viewerBody);
                break;
            case "X":
                this.drawX(viewerBody);
                break;
            default:
                if (!this.next)
                    this.status = 0;
                else
                    this.drawDot(viewerBody);
                break;
        }
    };
    RelatiGridSymbol.prototype.drawO = function (viewerBody) {
        var _a = this, symbolAttribute = _a.symbolAttribute, grid = _a.grid, status = _a.status, srtX = _a.srtX, srtY = _a.srtY, endX = _a.endX, endY = _a.endY;
        symbolAttribute.stroke = grid.is("forbid")
            ? "#666"
            : grid.is("broken|defeat")
                ? "#bbb"
                : "crimson";
        symbolAttribute.d = "\n            M " + (srtX + 1.5) + " " + (srtY + 1.5) + "\n            m 0 -1.5\n            a 1.5 1.5 0 0 1, 0 3\n            a 1.5 1.5 0 0 1, 0 -3\n        ";
        symbolAttribute["stroke-dasharray"] = Math.PI * 3 / 100 * this.status + " " + Math.PI * 3;
        if (grid.is("source|defeat")) {
            symbolAttribute["stroke-width"] = "1";
            viewerBody.appendChild(createSVG("path", symbolAttribute));
            symbolAttribute.stroke = "#f2f2f2";
            symbolAttribute["stroke-width"] = "0.5";
            viewerBody.appendChild(createSVG("path", symbolAttribute));
        }
        else {
            viewerBody.appendChild(createSVG("path", symbolAttribute));
        }
        if (status == 100)
            return;
        return this.status += 10;
    };
    RelatiGridSymbol.prototype.drawX = function (viewerBody) {
        var _a = this, symbolAttribute = _a.symbolAttribute, grid = _a.grid, status = _a.status, srtX = _a.srtX, srtY = _a.srtY, endX = _a.endX, endY = _a.endY;
        symbolAttribute.stroke = grid.status == "forbid"
            ? "#666"
            : grid.is("broken|defeat")
                ? "#bbb"
                : "royalblue";
        symbolAttribute.d = "\n            M " + srtX + " " + srtY + " L " + endX + " " + endY + "\n            M " + endX + " " + srtY + " L " + srtX + " " + endY + "\n        ";
        symbolAttribute["stroke-dasharray"] = (endX - srtX + endY - srtY) / 100 * this.status % 50 + " " + (endX - srtX + endY - srtY);
        if (grid.is("source|defeat")) {
            symbolAttribute["stroke-width"] = "1";
            viewerBody.appendChild(createSVG("path", symbolAttribute));
            symbolAttribute.stroke = "#f2f2f2";
            symbolAttribute["stroke-width"] = "0.5";
            viewerBody.appendChild(createSVG("path", symbolAttribute));
        }
        else {
            viewerBody.appendChild(createSVG("path", symbolAttribute));
        }
        if (status == 100)
            return;
        return this.status += 10;
    };
    RelatiGridSymbol.prototype.drawDot = function (viewerBody) {
        var _a = this, grid = _a.grid, next = _a.next;
        viewerBody.appendChild(createSVG("circle", {
            "cx": "" + (grid.x * 5 + 2.5),
            "cy": "" + (grid.y * 5 + 2.5),
            "r": "0.4",
            "fill": next == "O" ? "crimson" : "royalblue"
        }));
    };
    return RelatiGridSymbol;
}(GridBoardView));
