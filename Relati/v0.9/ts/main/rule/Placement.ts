import { RelatiGrid } from "../RelatiBoard";
import { RelatiGame } from "../RelatiGame";
import { RelatiRoute, RelatiRouteType } from "./RelatiRoute";
import { RelatiSymbol, RelatiRule, RelatiStatus } from "../RelatiDefs";

let placementStatus: RelatiStatus[] = ["relati-repeater"];

/** 設置判定 */
interface PlacementRule extends RelatiRule {
    /**
     * 判定棋盤格是否可設置符號
     * @param grid 棋盤格
     * @param symbol 符號
     * @param routeType 連結路徑類型
     */
    allow(
        grid: RelatiGrid,
        symbol: RelatiSymbol,
        routeType: RelatiRouteType
    ): boolean;

    /**
     * 取得可設置符號的棋盤格
     * @param game 遊戲主體
     * @param symbol 符號
     */
    trace(
        game: RelatiGame,
        symbol: RelatiSymbol,
        routeType?: RelatiRouteType
    ): RelatiGrid[];
}

/** 設置判定 */
export let PlacementRule: PlacementRule = {
    /**
     * 判定棋盤格是否可設置符號
     * @param grid 棋盤格
     * @param symbol 符號
     * @param routeType 連結路徑類型
     */
    allow(grid, symbol, routeType) {
        return !grid.symbol && RelatiRoute.allow(
            grid, symbol, placementStatus, routeType
        );
    },

    /**
     * 取得可設置符號的棋盤格
     * @param game 遊戲主體
     * @param symbol 符號
     * @param routeType 連結路徑類型
     */
    trace(game, symbol, routeType?) {
        let grids: RelatiGrid[] = [];

        for (let grid of game.board.grids) {
            if (!grid.symbol && PlacementRule.allow(
                grid, symbol, routeType || game.routeType
            )) grids.push(grid);
        }

        return grids;
    }
};