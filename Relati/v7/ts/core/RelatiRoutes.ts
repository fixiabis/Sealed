import {
    GRID_DRCT_F, GRID_DRCT_B, GRID_DRCT_R, GRID_DRCT_L,
    GRID_DRCT_FR, GRID_DRCT_FL, GRID_DRCT_BR, GRID_DRCT_BL,
    GRID_DRCT_2F, GRID_DRCT_2B, GRID_DRCT_2R, GRID_DRCT_2L,
    GRID_DRCT_2FR, GRID_DRCT_2FL, GRID_DRCT_2BR, GRID_DRCT_2BL,
    GRID_DRCT_FFR, GRID_DRCT_FFL, GRID_DRCT_BBR, GRID_DRCT_BBL,
    GRID_DRCT_FRR, GRID_DRCT_FLL, GRID_DRCT_BRR, GRID_DRCT_BLL
} from "./GridBoard";

import { RelatiGrid } from "./RelatiBoard";

const NORMAL_RELATI_ROUTES = [
    GRID_DRCT_F,
    GRID_DRCT_B,
    GRID_DRCT_R,
    GRID_DRCT_L,
    GRID_DRCT_FR,
    GRID_DRCT_FL,
    GRID_DRCT_BR,
    GRID_DRCT_BL
];

const REMOTE_NORMAL_RELATI_ROUTES = [
    [GRID_DRCT_2F, GRID_DRCT_F],
    [GRID_DRCT_2B, GRID_DRCT_B],
    [GRID_DRCT_2R, GRID_DRCT_R],
    [GRID_DRCT_2L, GRID_DRCT_L],
    [GRID_DRCT_2FR, GRID_DRCT_FR],
    [GRID_DRCT_2FL, GRID_DRCT_FL],
    [GRID_DRCT_2BR, GRID_DRCT_BR],
    [GRID_DRCT_2BL, GRID_DRCT_BL]
];

const REMOTE_STABLE_RELATI_ROUTES = [
    [GRID_DRCT_FFR, GRID_DRCT_2F, GRID_DRCT_F],
    [GRID_DRCT_FFR, GRID_DRCT_FR, GRID_DRCT_F],
    [GRID_DRCT_FFR, GRID_DRCT_FR, GRID_DRCT_R],
    [GRID_DRCT_FFL, GRID_DRCT_2F, GRID_DRCT_F],
    [GRID_DRCT_FFL, GRID_DRCT_FL, GRID_DRCT_F],
    [GRID_DRCT_FFL, GRID_DRCT_FL, GRID_DRCT_L],
    [GRID_DRCT_BBR, GRID_DRCT_2B, GRID_DRCT_B],
    [GRID_DRCT_BBR, GRID_DRCT_BR, GRID_DRCT_B],
    [GRID_DRCT_BBR, GRID_DRCT_BR, GRID_DRCT_R],
    [GRID_DRCT_BBL, GRID_DRCT_2B, GRID_DRCT_B],
    [GRID_DRCT_BBL, GRID_DRCT_BL, GRID_DRCT_B],
    [GRID_DRCT_BBL, GRID_DRCT_BL, GRID_DRCT_L],
    [GRID_DRCT_FRR, GRID_DRCT_FR, GRID_DRCT_F],
    [GRID_DRCT_FRR, GRID_DRCT_2R, GRID_DRCT_R],
    [GRID_DRCT_FRR, GRID_DRCT_FR, GRID_DRCT_R],
    [GRID_DRCT_FLL, GRID_DRCT_FL, GRID_DRCT_F],
    [GRID_DRCT_FLL, GRID_DRCT_2L, GRID_DRCT_L],
    [GRID_DRCT_FLL, GRID_DRCT_FL, GRID_DRCT_L],
    [GRID_DRCT_BRR, GRID_DRCT_BR, GRID_DRCT_B],
    [GRID_DRCT_BRR, GRID_DRCT_2R, GRID_DRCT_R],
    [GRID_DRCT_BRR, GRID_DRCT_BR, GRID_DRCT_R],
    [GRID_DRCT_BLL, GRID_DRCT_BL, GRID_DRCT_B],
    [GRID_DRCT_BLL, GRID_DRCT_2L, GRID_DRCT_L],
    [GRID_DRCT_BLL, GRID_DRCT_BL, GRID_DRCT_L]
];

export const BY_NORMAL_RELATI = 0;
export const BY_COMMON_RELATI = 1;

export function getRelatiRoutesBy(grid: RelatiGrid, status: number, routeType: number) {
    let routes: RelatiGrid[] = [];

    switch (routeType) {
        case BY_COMMON_RELATI:
            for (let i = 0; i < 24; i++) {
                let targetGrid = grid.getGrid(REMOTE_STABLE_RELATI_ROUTES[i][0]);
                let middleGrid1 = grid.getGrid(REMOTE_STABLE_RELATI_ROUTES[i][1]);
                let middleGrid2 = grid.getGrid(REMOTE_STABLE_RELATI_ROUTES[i][2]);

                if (
                    targetGrid &&
                    targetGrid.is(status) &&
                    middleGrid1.isSpace &&
                    middleGrid2.isSpace
                ) routes.push(targetGrid);
            }

            for (let i = 0; i < 8; i++) {
                let targetGrid = grid.getGrid(REMOTE_NORMAL_RELATI_ROUTES[i][0]);
                let middleGrid = grid.getGrid(REMOTE_NORMAL_RELATI_ROUTES[i][1]);

                if (
                    targetGrid &&
                    targetGrid.is(status) &&
                    middleGrid.isSpace
                ) routes.push(targetGrid);
            }
        case BY_NORMAL_RELATI:
            for (let i = 0; i < 8; i++) {
                let targetGrid = grid.getGrid(NORMAL_RELATI_ROUTES[i]);

                if (
                    targetGrid &&
                    targetGrid.is(status)
                ) routes.push(targetGrid);
            }
    }

    return routes;
}

export function hasRelatiRoutesBy(grid: RelatiGrid, status: number, routeType: number) {
    switch (routeType) {
        case BY_COMMON_RELATI:
            for (let i = 0; i < 24; i++) {
                let targetGrid = grid.getGrid(REMOTE_STABLE_RELATI_ROUTES[i][0]);
                let middleGrid1 = grid.getGrid(REMOTE_STABLE_RELATI_ROUTES[i][1]);
                let middleGrid2 = grid.getGrid(REMOTE_STABLE_RELATI_ROUTES[i][2]);

                if (
                    targetGrid &&
                    targetGrid.is(status) &&
                    middleGrid1.isSpace &&
                    middleGrid2.isSpace
                ) return true;
            }

            for (let i = 0; i < 8; i++) {
                let targetGrid = grid.getGrid(REMOTE_NORMAL_RELATI_ROUTES[i][0]);
                let middleGrid = grid.getGrid(REMOTE_NORMAL_RELATI_ROUTES[i][1]);

                if (
                    targetGrid &&
                    targetGrid.is(status) &&
                    middleGrid.isSpace
                ) return true;
            }
        case BY_NORMAL_RELATI:
            for (let i = 0; i < 8; i++) {
                let targetGrid = grid.getGrid(NORMAL_RELATI_ROUTES[i]);

                if (
                    targetGrid &&
                    targetGrid.is(status)
                ) return true;
            }
    }

    return false;
}

export function getRelatiTracesBy(grid: RelatiGrid, status: number, routeType: number) {
    let routes: RelatiGrid[][] = [];

    switch (routeType) {
        case BY_COMMON_RELATI:
            for (let i = 0; i < 24; i++) {
                let targetGrid = grid.getGrid(REMOTE_STABLE_RELATI_ROUTES[i][0]);
                let middleGrid1 = grid.getGrid(REMOTE_STABLE_RELATI_ROUTES[i][1]);
                let middleGrid2 = grid.getGrid(REMOTE_STABLE_RELATI_ROUTES[i][2]);

                if (
                    targetGrid &&
                    targetGrid.is(status) &&
                    middleGrid1.isSpace &&
                    middleGrid2.isSpace
                ) routes.push([middleGrid2, middleGrid1, targetGrid]);
            }

            for (let i = 0; i < 8; i++) {
                let targetGrid = grid.getGrid(REMOTE_NORMAL_RELATI_ROUTES[i][0]);
                let middleGrid = grid.getGrid(REMOTE_NORMAL_RELATI_ROUTES[i][1]);

                if (
                    targetGrid &&
                    targetGrid.is(status) &&
                    middleGrid.isSpace
                ) routes.push([middleGrid, targetGrid]);
            }
        case BY_NORMAL_RELATI:
            for (let i = 0; i < 8; i++) {
                let targetGrid = grid.getGrid(NORMAL_RELATI_ROUTES[i]);

                if (
                    targetGrid &&
                    targetGrid.is(status)
                ) routes.push([targetGrid]);
            }
    }

    return routes;
}