import { RelatiGrid } from "./RelatiBoard";
import { RelatiPlayer } from "./RelatiPlayer";
import { RelatiRoleStatus } from "./RelatiRoleStatus";
import { RelatiSkill } from "./RelatiSkill";
/** 角色類型 */
export declare type RelatiRoleType = "normal" | "knight" | "wizard" | "leader";
/** 角色 */
export interface RelatiRole {
    /** 狀態判斷 */
    is(status: RelatiRoleStatus): boolean;
    /** 複合狀態判斷，all: 完全符合， any: 任何符合 */
    is(status: RelatiRoleStatus[], type: "all" | "any"): boolean;
}
export declare class RelatiRole {
    grid: RelatiGrid;
    owner: RelatiPlayer;
    type: RelatiRoleType;
    /** 狀態 */
    status: {
        [status: string]: boolean;
    };
    /** 累積 */
    points: {
        [points: string]: number;
    };
    /** 擁有技能 */
    skills: RelatiSkill[];
    /**
     * 建立角色
     * @param grid 棋盤格
     * @param owner 持有者
     * @param type 類型
     */
    constructor(grid: RelatiGrid, owner: RelatiPlayer, type?: RelatiRoleType);
    /** 獲得狀態 */
    gain(...statusList: RelatiRoleStatus[]): void;
    /** 失去狀態 */
    lost(...statusList: RelatiRoleStatus[]): void;
}
