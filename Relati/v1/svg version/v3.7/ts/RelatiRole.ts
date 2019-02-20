/** 角色 */
interface RelatiRole {
    /** 角色符號 */
    symbol: RelatiRole.Symbol;
    /** 角色狀態 */
    status: RelatiRole.Status;
    /** 角色所在棋盤格 */
    grid: RelatiGrid;
    /** 角色狀態判斷 */
    is(status: string): boolean;
}

class RelatiRole implements RelatiRole {
    public symbol: RelatiRole.Symbol = "";
    public status: RelatiRole.Status = "normal";

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

        switch (<RelatiRole.ExpandStatus>status) {
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

namespace RelatiRole {
    /** 角色符號 */
    export type Symbol = "" | "O" | "X";

    /** 角色狀態 */
    export type Status = (
        "normal" | // 一般
        "source" | // 來源
        "forbid" | // 阻斷
        "broken" | // 損毀
        "perish"   // 淪陷
    );

    /** 角色狀態擴充(查詢用) */
    export type ExpandStatus = (
        "ownerO" | "ownerX" |
        "spaceR" | "spaceF" | "space" |
        "valid"
    );

    /** 角色行動方法 */
    export type ActionMode = "allow" | "trace";

    /** 角色行動規則 */
    export type ActionRule = (
        "relati" |
        "relati-normal" |
        "relati-remote" |
        "relati-remote-normal" |
        "relati-remote-stable"
    );
}