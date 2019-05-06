import { RelatiGrid, RelatiBoard, RELATI_LAUNCHER, RELATI_REPEATER, RELATI_RECEIVER } from "./RelatiBoard";
import { getRelatiRoutesBy } from "./RelatiRoutes";

export function restore(grid: RelatiGrid, routeType: number) {
    if (grid.is(RELATI_REPEATER)) return;
    grid.gain(RELATI_REPEATER);
    let routes = getRelatiRoutesBy(grid, grid.symbol | RELATI_RECEIVER, routeType);
    for (let targetGrid of routes) restore(targetGrid, routeType);
}

export function restoreRepeaterBy(board: RelatiBoard, routeType: number) {
    for (let grid of board.grids) {
        if (grid.is(RELATI_LAUNCHER)) restore(grid, routeType);
    }
}

export function destoryRepeaterBy(board: RelatiBoard) {
    for (let grid of board.grids) {
        grid.lost(RELATI_REPEATER);
    }
}