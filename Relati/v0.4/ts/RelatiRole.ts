import { RelatiGrid } from "./RelatiBoard";
import { RelatiPlayer } from "./RelatiPlayer";
import { RelatiRoleStatus } from "./RelatiRoleStatus";
import { RelatiSkill } from "./RelatiSkill";

/** 角色類型 */
export type RelatiRoleType = "normal" | "knight" | "wizard" | "leader";

/** 角色 */
export interface RelatiRole {
    /** 狀態判斷 */
    is(status: RelatiRoleStatus): boolean;
    /** 複合狀態判斷，all: 完全符合， any: 任何符合 */
    is(status: RelatiRoleStatus[], type: "all" | "any"): boolean;
}

export class RelatiRole {
    /** 狀態 */
    public status: { [status: string]: boolean } = {};
    /** 累積 */
    public points: { [points: string]: number } = {};
    /** 擁有技能 */
    public skills: RelatiSkill[] = [];

    /**
     * 建立角色
     * @param grid 棋盤格
     * @param owner 持有者
     * @param type 類型
     */
    constructor(
        public grid: RelatiGrid,
        public owner: RelatiPlayer,
        public type: RelatiRoleType = "normal"
    ) { }

    is(status: RelatiRoleStatus | RelatiRoleStatus[], type?: "all" | "any") {
        if (typeof status === "string") return this.status[status];

        if (type === "any") {
            for (var name of status) {
                if (this.status[name]) return true;
            }

            return false;
        } else {
            for (var name of status) {
                if (!this.status[name]) return false;
            }

            return true;
        }
    }

    /** 獲得狀態 */
    gain(...statusList: RelatiRoleStatus[]) {
        for (var name of statusList) {
            this.status[name] = true;
        }
    }

    /** 失去狀態 */
    lost(...statusList: RelatiRoleStatus[]) {
        for (var name of statusList) {
            this.status[name] = false;
        }
    }
}