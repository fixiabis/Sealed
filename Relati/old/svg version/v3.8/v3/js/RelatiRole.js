"use strict";
;
var RelatiRoleActionTrack = /** @class */ (function () {
    function RelatiRoleActionTrack(action, source, path) {
        this.action = action;
        this.source = source;
        this.path = path;
    }
    return RelatiRoleActionTrack;
}());
/** 遠程穩定連結方向座標 */
var RelatiRemoteStable = {
    /** 目標與需維持空白的方向座標 */
    directions: [
        { source: "IIH", spaces: "I,II,IH,H" },
        { source: "IHH", spaces: "H,HH,HI,I" }
    ],
    /** 需維持空白的方向座標索引 */
    spaceDirectionIndexes: [[1, 0], [2, 3], [2, 0]]
};
var RelatiRole = /** @class */ (function () {
    function RelatiRole(grid) {
        this.grid = grid;
        this.view = new RelatiRoleView(this);
        this.symbol = "";
        this.status = "normal";
    }
    /** @param status 狀態 */
    RelatiRole.prototype.is = function (status) {
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
    /** @param action 動作 @param symbol 符號 */
    RelatiRole.prototype.can = function (action, symbol) {
        var grid = this.grid;
        var grids;
        var result = [];
        var lagal = "owner" + symbol + " valid";
        if (action == "relati" || action == "relati-normal") {
            grids = grid.queries("O");
            for (var _i = 0, grids_1 = grids; _i < grids_1.length; _i++) {
                var grid = grids_1[_i];
                if (!grid || !grid.role.is(lagal))
                    continue;
                result.push(new RelatiRoleActionTrack("relati-normal", grid, []));
            }
        }
        if (action == "relati" || action == "relati-remote" || action == "relati-remote-normal") {
            var spaceGrids = grid.queries("O");
            grids = grid.queries("2O");
            for (var _a = 0, grids_2 = grids; _a < grids_2.length; _a++) {
                var grid = grids_2[_a];
                var spaceGrid = spaceGrids.splice(0, 1)[0];
                if (!grid || !grid.role.is(lagal) || !spaceGrid.role.is("space"))
                    continue;
                result.push(new RelatiRoleActionTrack("relati-remote-normal", grid, [spaceGrid]));
            }
        }
        if (action == "relati" || action == "relati-remote" || action == "relati-remote-stable") {
            var directions = RelatiRemoteStable.directions, spaceDirectionIndexes = RelatiRemoteStable.spaceDirectionIndexes;
            for (var _b = 0, directions_1 = directions; _b < directions_1.length; _b++) {
                var direction = directions_1[_b];
                var spaceGridLists = grid.queries(direction.spaces);
                grids = grid.queries(direction.source);
                for (var _c = 0, grids_3 = grids; _c < grids_3.length; _c++) {
                    var grid = grids_3[_c];
                    var spaceGrids = spaceGridLists.splice(0, 4);
                    if (!grid || !grid.role.is(lagal))
                        continue;
                    for (var _d = 0, spaceDirectionIndexes_1 = spaceDirectionIndexes; _d < spaceDirectionIndexes_1.length; _d++) {
                        var spaceDirectionIndex = spaceDirectionIndexes_1[_d];
                        if (!spaceGrids[spaceDirectionIndex[0]].role.is("space") ||
                            !spaceGrids[spaceDirectionIndex[1]].role.is("space"))
                            continue;
                        result.push(new RelatiRoleActionTrack("relati-remote-stable", grid, [
                            spaceGrids[spaceDirectionIndex[0]],
                            spaceGrids[spaceDirectionIndex[1]]
                        ]));
                    }
                }
            }
        }
        return result;
    };
    return RelatiRole;
}());
