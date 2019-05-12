import { GRID_DRCT } from "./GridBoard";
import { RelatiGrid } from "./RelatiBoard";

let {
    DRCT_F, DRCT_B, DRCT_R, DRCT_L,
    DRCT_FR, DRCT_FL, DRCT_BR, DRCT_BL,
    DRCT_2F, DRCT_2B, DRCT_2R, DRCT_2L,
    DRCT_2FR, DRCT_2FL, DRCT_2BR, DRCT_2BL,
    DRCT_FFR, DRCT_FFL, DRCT_BBR, DRCT_BBL,
    DRCT_FRR, DRCT_FLL, DRCT_BRR, DRCT_BLL
} = GRID_DRCT;

/** 一般Relati路徑 */
const NORMAL_ROUTES = [
    DRCT_F, DRCT_B, DRCT_R, DRCT_L,
    DRCT_FR, DRCT_FL, DRCT_BR, DRCT_BL
];

/** 遠程Relati路徑 */
const REMOTE_NORMAL_ROUTES = [
    [DRCT_2F, DRCT_F],
    [DRCT_2B, DRCT_B],
    [DRCT_2R, DRCT_R],
    [DRCT_2L, DRCT_L],
    [DRCT_2FR, DRCT_FR],
    [DRCT_2FL, DRCT_FL],
    [DRCT_2BR, DRCT_BR],
    [DRCT_2BL, DRCT_BL]
];

/** 遠程穩定Relati路徑 */
const REMOTE_STABLE_ROUTES = [
    [DRCT_FFR, DRCT_2F, DRCT_F],
    [DRCT_FFR, DRCT_FR, DRCT_F],
    [DRCT_FFR, DRCT_FR, DRCT_R],
    [DRCT_FFL, DRCT_2F, DRCT_F],
    [DRCT_FFL, DRCT_FL, DRCT_F],
    [DRCT_FFL, DRCT_FL, DRCT_L],
    [DRCT_BBR, DRCT_2B, DRCT_B],
    [DRCT_BBR, DRCT_BR, DRCT_B],
    [DRCT_BBR, DRCT_BR, DRCT_R],
    [DRCT_BBL, DRCT_2B, DRCT_B],
    [DRCT_BBL, DRCT_BL, DRCT_B],
    [DRCT_BBL, DRCT_BL, DRCT_L],
    [DRCT_FRR, DRCT_FR, DRCT_F],
    [DRCT_FRR, DRCT_2R, DRCT_R],
    [DRCT_FRR, DRCT_FR, DRCT_R],
    [DRCT_FLL, DRCT_FL, DRCT_F],
    [DRCT_FLL, DRCT_2L, DRCT_L],
    [DRCT_FLL, DRCT_FL, DRCT_L],
    [DRCT_BRR, DRCT_BR, DRCT_B],
    [DRCT_BRR, DRCT_2R, DRCT_R],
    [DRCT_BRR, DRCT_BR, DRCT_R],
    [DRCT_BLL, DRCT_BL, DRCT_B],
    [DRCT_BLL, DRCT_2L, DRCT_L],
    [DRCT_BLL, DRCT_BL, DRCT_L]
];

/** 使用一般Relati路徑類型 */
export const BY_NORMAL_RELATI = 0;

/** 使用通用Relati路徑類型 */
export const BY_COMMON_RELATI = 1;

/**
 * 取得Relati路徑
 * @param grid 棋盤格
 * @param status 狀態
 * @param routeType 路徑類型
 */
export function getRelatiRoutesBy(grid: RelatiGrid, status: number, routeType: number) {
    let routes: RelatiGrid[] = [];

    switch (routeType) {
        case BY_COMMON_RELATI:
            for (let i = 0; i < 24; i++) {
                let targetGrid = grid.getGrid(REMOTE_STABLE_ROUTES[i][0]);
                let middleGrid1 = grid.getGrid(REMOTE_STABLE_ROUTES[i][1]);
                let middleGrid2 = grid.getGrid(REMOTE_STABLE_ROUTES[i][2]);

                if (
                    targetGrid &&
                    targetGrid.is(status) &&
                    middleGrid1.isSpace &&
                    middleGrid2.isSpace
                ) routes.push(targetGrid);
            }

            for (let i = 0; i < 8; i++) {
                let targetGrid = grid.getGrid(REMOTE_NORMAL_ROUTES[i][0]);
                let middleGrid = grid.getGrid(REMOTE_NORMAL_ROUTES[i][1]);

                if (
                    targetGrid &&
                    targetGrid.is(status) &&
                    middleGrid.isSpace
                ) routes.push(targetGrid);
            }
        case BY_NORMAL_RELATI:
            for (let i = 0; i < 8; i++) {
                let targetGrid = grid.getGrid(NORMAL_ROUTES[i]);

                if (
                    targetGrid &&
                    targetGrid.is(status)
                ) routes.push(targetGrid);
            }
    }

    return routes;
}

/**
 * 是否有Relati路徑
 * @param grid 棋盤格
 * @param status 狀態
 * @param routeType 路徑類型
 */
export function hasRelatiRoutesBy(grid: RelatiGrid, status: number, routeType: number) {
    switch (routeType) {
        case BY_COMMON_RELATI:
            for (let i = 0; i < 24; i++) {
                let targetGrid = grid.getGrid(REMOTE_STABLE_ROUTES[i][0]);
                let middleGrid1 = grid.getGrid(REMOTE_STABLE_ROUTES[i][1]);
                let middleGrid2 = grid.getGrid(REMOTE_STABLE_ROUTES[i][2]);

                if (
                    targetGrid &&
                    targetGrid.is(status) &&
                    middleGrid1.isSpace &&
                    middleGrid2.isSpace
                ) return true;
            }

            for (let i = 0; i < 8; i++) {
                let targetGrid = grid.getGrid(REMOTE_NORMAL_ROUTES[i][0]);
                let middleGrid = grid.getGrid(REMOTE_NORMAL_ROUTES[i][1]);

                if (
                    targetGrid &&
                    targetGrid.is(status) &&
                    middleGrid.isSpace
                ) return true;
            }
        case BY_NORMAL_RELATI:
            for (let i = 0; i < 8; i++) {
                let targetGrid = grid.getGrid(NORMAL_ROUTES[i]);

                if (
                    targetGrid &&
                    targetGrid.is(status)
                ) return true;
            }
    }

    return false;
}

/**
 * 追溯Relati路徑
 * @param grid 棋盤格
 * @param status 狀態
 * @param routeType 路徑類型
 */
export function getRelatiTracesBy(grid: RelatiGrid, status: number, routeType: number) {
    let routes: RelatiGrid[][] = [];

    switch (routeType) {
        case BY_COMMON_RELATI:
            for (let i = 0; i < 24; i++) {
                let targetGrid = grid.getGrid(REMOTE_STABLE_ROUTES[i][0]);
                let middleGrid1 = grid.getGrid(REMOTE_STABLE_ROUTES[i][1]);
                let middleGrid2 = grid.getGrid(REMOTE_STABLE_ROUTES[i][2]);

                if (
                    targetGrid &&
                    targetGrid.is(status) &&
                    middleGrid1.isSpace &&
                    middleGrid2.isSpace
                ) routes.push([middleGrid2, middleGrid1, targetGrid]);
            }

            for (let i = 0; i < 8; i++) {
                let targetGrid = grid.getGrid(REMOTE_NORMAL_ROUTES[i][0]);
                let middleGrid = grid.getGrid(REMOTE_NORMAL_ROUTES[i][1]);

                if (
                    targetGrid &&
                    targetGrid.is(status) &&
                    middleGrid.isSpace
                ) routes.push([middleGrid, targetGrid]);
            }
        case BY_NORMAL_RELATI:
            for (let i = 0; i < 8; i++) {
                let targetGrid = grid.getGrid(NORMAL_ROUTES[i]);

                if (
                    targetGrid &&
                    targetGrid.is(status)
                ) routes.push([targetGrid]);
            }
    }

    return routes;
}