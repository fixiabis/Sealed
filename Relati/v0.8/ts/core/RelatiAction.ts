import { RelatiGrid, RelatiBoard, RELATI_LAUNCHER, RELATI_REPEATER, RELATI_RECEIVER } from "./RelatiBoard";
import { getRelatiRoutesBy } from "./RelatiRoutes";

/**
 * 恢復棋盤格Relati的中繼機能
 * @param grid 棋盤格
 * @param routeType 路徑類型
 */
function restore(grid: RelatiGrid, routeType: number) {
    if (grid.is(RELATI_REPEATER)) return;
    grid.gain(RELATI_REPEATER);
    let routes = getRelatiRoutesBy(grid, grid.symbol | RELATI_RECEIVER, routeType);
    for (let targetGrid of routes) restore(targetGrid, routeType);
}

/**
 * 恢復Relati中繼機能
 * @param board 棋盤
 * @param routeType 路徑類型
 */
export function restoreRepeaterBy(board: RelatiBoard, routeType: number) {
    for (let grid of board.grids) {
        if (grid.is(RELATI_LAUNCHER)) restore(grid, routeType);
    }
}

/**
 * 破壞Relati中繼機能
 * @param board 棋盤
 */
export function destoryRepeaterBy(board: RelatiBoard) {
    for (let grid of board.grids) {
        grid.lost(RELATI_REPEATER);
    }
}