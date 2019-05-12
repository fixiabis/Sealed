import { RelatiBoard, RelatiGrid } from "./RelatiBoard";
import { RelatiPlayer } from "./RelatiPlayer";

/** 遊戲 */
export class RelatiGame {
    /** 回合 */
    public turn = 0;
    /** 玩家數 */
    public readonly playerCount: number;

    /**
     * 建立遊戲，並計算玩家數
     * @param players 參與玩家
     * @param board 棋盤
     */
    constructor(
        public readonly players: RelatiPlayer[],
        public readonly board: RelatiBoard
    ) {
        this.playerCount = players.length;
    }

    /** 目前玩家 */
    get nowPlayer() {
        return this.players[this.turn % this.playerCount];
    }
}

/** 遊戲狀態 */
export type RelatiGameState = {
    /** 遊戲 */
    game?: RelatiGame,
    /** 棋盤格 */
    grid?: RelatiGrid,
    /** 玩家 */
    player?: RelatiPlayer
};