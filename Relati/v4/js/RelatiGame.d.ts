import { RelatiBoard, RelatiGrid } from "./RelatiBoard";
import { RelatiPlayer } from "./RelatiPlayer";
/** 遊戲 */
export declare class RelatiGame {
    readonly players: RelatiPlayer[];
    readonly board: RelatiBoard;
    /** 回合 */
    turn: number;
    /** 玩家數 */
    readonly playerCount: number;
    /**
     * 建立遊戲，並計算玩家數
     * @param players 參與玩家
     * @param board 棋盤
     */
    constructor(players: RelatiPlayer[], board: RelatiBoard);
    /** 目前玩家 */
    readonly nowPlayer: RelatiPlayer;
}
/** 遊戲狀態 */
export declare type RelatiGameState = {
    /** 遊戲 */
    game?: RelatiGame;
    /** 棋盤格 */
    grid?: RelatiGrid;
    /** 玩家 */
    player?: RelatiPlayer;
};
