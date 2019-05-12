namespace O {
    /** 角色符號 */
    type RelatiRoleSymbol = "" | "O" | "X";

    /** 角色狀態 */
    type RelatiRoleStatus = (
        "normal" | // 一般
        "source" | // 來源
        "forbid" | // 阻斷
        "broken" | // 損毀
        "perish"   // 淪陷
    );

    /** 角色狀態擴充(查詢用) */
    type RelatiRoleExpandStatus = (
        "ownerO" | "ownerX" |
        "spaceR" | "spaceF" |
        "space" | "valid"
    );

    /** 角色行動類型 */
    type RelatiRoleActionType = (
        "relati" |
        "relati-normal" |
        "relati-remote" |
        "relati-remote-normal" |
        "relati-remote-stable"
    );

    /** 角色 */
    interface RelatiRole {
        /** 角色符號 */
        symbol: RelatiRoleSymbol;
        /** 角色狀態 */
        status: RelatiRoleStatus;
        /** 角色所在棋盤格 */
        grid: RelatiGrid;
        /** 角色狀態判斷 */
        is(status: string): boolean;
    }

    class RelatiRole implements RelatiRole {
        public view: RelatiRoleView = new RelatiRoleView(this);
        public symbol: RelatiRoleSymbol = "";
        public status: RelatiRoleStatus = "normal";

        constructor(public grid: RelatiGrid) { }

        /** @param status 狀態 */
        is(status: string): boolean {
            if (status.indexOf("|") > -1) {
                var statusList = status.split("|");

                for (var status of statusList) {
                    if (this.is(status)) return true;
                }

                return false;
            }

            if (status.indexOf("&") > -1 || status.indexOf(" ") > -1) {
                var statusList = status.replace(/ /g, "&").split("&");

                for (var status of statusList) {
                    if (!this.is(status)) return false;
                }

                return true;
            }

            switch (<RelatiRoleExpandStatus>status) {
                case "ownerO": return this.symbol == "O";
                case "ownerX": return this.symbol == "X";
                case "spaceR": return this.symbol == "";
                case "spaceF": return (
                    this.status == "broken" ||
                    this.status == "perish"
                );
                case "space": return (
                    this.symbol == "" ||
                    this.status == "broken" ||
                    this.status == "perish"
                );
                case "valid": return (
                    this.status == "normal" ||
                    this.status == "source"
                );
            }

            return this.status == status;
        }
    }
}

namespace O2 {
    type RelatiRoleSymbol = "" | "O" | "X";

    /** 角色狀態 */
    type RelatiRoleStatus = (
        "normal" | "source" | "forbid" |
        "broken" | "perish"
    );

    /** 角色狀態擴充(查詢用) */
    type RelatiRoleExpandStatus = (
        "ownerO" | "ownerX" |
        "spaceR" | "spaceF" |
        "space" | "valid"
    );

    /** 角色行動 */
    type RelatiRoleAction = (
        "relati" |
        "relati-normal" |
        "relati-remote" |
        "relati-remote-normal" |
        "relati-remote-stable"
    );

    /** 角色行動過程 */
    interface RelatiRoleActionTrack {
        /** 行動來源棋盤格 */
        source: RelatiGrid;
        /** 動作類型 */
        action: RelatiRoleAction;
        /** 路徑 */
        path: RelatiGrid[];
    };

    class RelatiRoleActionTrack {
        constructor(
            public action: RelatiRoleAction,
            public source: RelatiGrid,
            public path: RelatiGrid[]
        ) { }
    }

    /** 角色 */
    interface RelatiRole {
        /** 角色符號 */
        symbol: RelatiRoleSymbol;
        /** 角色狀態 */
        status: RelatiRoleStatus;
        /** 角色所在棋盤格 */
        grid: RelatiGrid;
        /** 角色狀態判斷 */
        is(status: string): boolean;
        /** 角色可用行動 */
        can(action: RelatiRoleAction, symbol: RelatiRoleSymbol): RelatiRoleActionTrack[];
    }

    /** 遠程穩定連結方向座標 */
    const RelatiRemoteStable = {
        /** 目標與需維持空白的方向座標 */
        directions: [
            { source: "IIH", spaces: "I,II,IH,H" },
            { source: "IHH", spaces: "H,HH,HI,I" }
        ],
        /** 需維持空白的方向座標索引 */
        spaceDirectionIndexes: [[1, 0], [2, 3], [2, 0]]
    };

    class RelatiRole implements RelatiRole {
        public view: RelatiRoleView = new RelatiRoleView(this);
        public symbol: RelatiRoleSymbol = "";
        public status: RelatiRoleStatus = "normal";

        constructor(public grid: RelatiGrid) { }

        /** @param status 狀態 */
        is(status: string): boolean {
            if (status.indexOf("|") > -1) {
                var statusList = status.split("|");

                for (var status of statusList) {
                    if (this.is(status)) return true;
                }

                return false;
            }

            if (status.indexOf("&") > -1 || status.indexOf(" ") > -1) {
                var statusList = status.replace(/ /g, "&").split("&");

                for (var status of statusList) {
                    if (!this.is(status)) return false;
                }

                return true;
            }

            switch (<RelatiRoleExpandStatus>status) {
                case "ownerO": return this.symbol == "O";
                case "ownerX": return this.symbol == "X";
                case "spaceR": return this.symbol == "";
                case "spaceF": return (
                    this.status == "broken" ||
                    this.status == "perish"
                );
                case "space": return (
                    this.symbol == "" ||
                    this.status == "broken" ||
                    this.status == "perish"
                );
                case "valid": return (
                    this.status == "normal" ||
                    this.status == "source"
                );
            }

            return this.status == status;
        }

        /** @param action 動作 @param symbol 符號 */
        can(action: RelatiRoleAction, symbol: RelatiRoleSymbol): RelatiRoleActionTrack[] {
            var { grid } = this;
            var grids: RelatiGrid[];
            var result: RelatiRoleActionTrack[] = [];
            var lagal: string = `owner${symbol} valid`;

            if (action == "relati" || action == "relati-normal") {
                grids = grid.queries("O");

                for (var grid of grids) {
                    if (!grid || !grid.role.is(lagal)) continue;

                    result.push(new RelatiRoleActionTrack(
                        "relati-normal", grid, []
                    ));
                }
            }

            if (action == "relati" || action == "relati-remote" || action == "relati-remote-normal") {
                var spaceGrids: RelatiGrid[] = grid.queries("O");
                grids = grid.queries("2O");

                for (var grid of grids) {
                    var spaceGrid = spaceGrids.splice(0, 1)[0];
                    if (!grid || !grid.role.is(lagal) || !spaceGrid.role.is("space")) continue;

                    result.push(new RelatiRoleActionTrack(
                        "relati-remote-normal", grid, [spaceGrid]
                    ));
                }
            }

            if (action == "relati" || action == "relati-remote" || action == "relati-remote-stable") {
                var { directions, spaceDirectionIndexes } = RelatiRemoteStable;

                for (var direction of directions) {
                    var spaceGridLists: RelatiGrid[] = grid.queries(direction.spaces);
                    grids = grid.queries(direction.source);

                    for (var grid of grids) {
                        var spaceGrids: RelatiGrid[] = spaceGridLists.splice(0, 4);
                        if (!grid || !grid.role.is(lagal)) continue;

                        for (var spaceDirectionIndex of spaceDirectionIndexes) {
                            if (!spaceGrids[spaceDirectionIndex[0]].role.is("space") ||
                                !spaceGrids[spaceDirectionIndex[1]].role.is("space")
                            ) continue;

                            result.push(new RelatiRoleActionTrack(
                                "relati-remote-stable", grid, [
                                    spaceGrids[spaceDirectionIndex[0]],
                                    spaceGrids[spaceDirectionIndex[1]]
                                ]
                            ));
                        }
                    }
                }
            }

            return result;
        }
    }
}