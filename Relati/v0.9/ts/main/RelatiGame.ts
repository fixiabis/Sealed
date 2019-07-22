import { RelatiBoard, RelatiGrid } from "./RelatiBoard";
import { RelatiRouteType } from "./rule/RelatiRoute";
import { RelatiEffect, RelatiAction, AllRelatiStatus } from "./RelatiDefs";
import { RelatiPlayer } from "./RelatiPlayer";
import { RelatiGameResult, GAME_RESULT_NONE, WinnerDecision } from "./rule/WinnerDecision";

export interface RelatiGameState {
    grid: RelatiGrid;
}

export class RelatiGame {
    /** 回合 */
    public turn = 0;

    /** 已選擇棋盤格 */
    public selectedGrid?: RelatiGrid;

    /**
     * 選取棋盤格放置
     * @param grid 棋盤格
     */
    public selectGrid?: (grid: RelatiGrid) => void;

    /**
     * 遊戲回合開始事件
     * @param grid 棋盤格
     */
    public onturnstart?: (grid: RelatiGrid) => void;

    /**
     * 遊戲回合結束事件
     * @param grid 棋盤格
     */
    public onturnend?: (grid: RelatiGrid) => void;

    /**
     * 棋盤格選取事件
     * @param grid 棋盤格
     */
    public ongridselect?: (grid: RelatiGrid) => void;

    /**
     * 遊戲開始事件
     */
    public onstart?: Function;

    /**
     * 遊戲結束事件
     */
    public onend?: (gameResult: RelatiGameResult) => void;

    constructor(
        /** 棋盤 */
        public board: RelatiBoard,
        /** 玩家 */
        public players: RelatiPlayer[],
        /** Relati路徑類型 */
        public routeType: RelatiRouteType,
        /** 可用行動 */
        public gridActions: RelatiAction[],
        /** 可用技能 */
        public gridEffects: RelatiEffect[]
    ) { }

    /** 開始 */
    async start() {
        let gameResult: RelatiGameResult = GAME_RESULT_NONE;
        if (this.onstart) this.onstart();

        while (gameResult == GAME_RESULT_NONE) {
            let grid = this.selectedGrid || await this.gridSelect();

            if (!grid) continue;

            if (this.onturnstart) this.onturnstart(grid);

            let actionValid = false;

            for (let action of this.gridActions) {
                if (await action.do(grid, this)) {
                    actionValid = true;
                    break;
                }
            }

            if (!actionValid) continue;

            this.selectedGrid = grid;
            for (let effect of this.gridEffects) await effect.do(this);

            this.turn++;

            delete this.selectedGrid;
            gameResult = WinnerDecision.state(this);
            if (this.onturnend) this.onturnend(grid);
        }

        if (this.onend) this.onend(gameResult);
        return gameResult;
    }

    /** 重新開始 */
    restart() {
        this.turn = 0;

        for (let grid of this.board.grids) {
            grid.symbol = "";
            grid.lost(AllRelatiStatus);
        }

        this.start();
    }

    /** 等待格子選取 */
    gridSelect() {
        return new Promise<RelatiGrid>(select => {
            this.selectGrid = grid => {
                select(grid);
                if (this.ongridselect) this.ongridselect(grid);
            };
        });
    }

    /** 目前玩家 */
    get nowPlayer() {
        return this.players[this.turn % 2];
    }
}