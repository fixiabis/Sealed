#ifndef __RELATI_ROUTES_H__
#define __RELATI_ROUTES_H__

#include "./RelatiBoard.h"
#include "./GridBoard/GridDrct.h"

static const int NORMAL_RELATI_ROUTES[8] = {
    GRID_DRCT_F,
    GRID_DRCT_B,
    GRID_DRCT_R,
    GRID_DRCT_L,
    GRID_DRCT_FR,
    GRID_DRCT_FL,
    GRID_DRCT_BR,
    GRID_DRCT_BL};

static const int REMOTE_NORMAL_RELATI_ROUTES[8][2] = {
    {GRID_DRCT_2F, GRID_DRCT_F},
    {GRID_DRCT_2B, GRID_DRCT_B},
    {GRID_DRCT_2R, GRID_DRCT_R},
    {GRID_DRCT_2L, GRID_DRCT_L},
    {GRID_DRCT_2FR, GRID_DRCT_FR},
    {GRID_DRCT_2FL, GRID_DRCT_FL},
    {GRID_DRCT_2BR, GRID_DRCT_BR},
    {GRID_DRCT_2BL, GRID_DRCT_BL}};

static const int REMOTE_STABLE_RELATI_ROUTES[24][3] = {
    {GRID_DRCT_FFR, GRID_DRCT_2F, GRID_DRCT_F},
    {GRID_DRCT_FFR, GRID_DRCT_FR, GRID_DRCT_F},
    {GRID_DRCT_FFR, GRID_DRCT_FR, GRID_DRCT_R},
    {GRID_DRCT_FFL, GRID_DRCT_2F, GRID_DRCT_F},
    {GRID_DRCT_FFL, GRID_DRCT_FL, GRID_DRCT_F},
    {GRID_DRCT_FFL, GRID_DRCT_FL, GRID_DRCT_L},
    {GRID_DRCT_BBR, GRID_DRCT_2B, GRID_DRCT_B},
    {GRID_DRCT_BBR, GRID_DRCT_BR, GRID_DRCT_B},
    {GRID_DRCT_BBR, GRID_DRCT_BR, GRID_DRCT_R},
    {GRID_DRCT_BBL, GRID_DRCT_2B, GRID_DRCT_B},
    {GRID_DRCT_BBL, GRID_DRCT_BL, GRID_DRCT_B},
    {GRID_DRCT_BBL, GRID_DRCT_BL, GRID_DRCT_L},
    {GRID_DRCT_FRR, GRID_DRCT_FR, GRID_DRCT_F},
    {GRID_DRCT_FRR, GRID_DRCT_2R, GRID_DRCT_R},
    {GRID_DRCT_FRR, GRID_DRCT_FR, GRID_DRCT_R},
    {GRID_DRCT_FLL, GRID_DRCT_FL, GRID_DRCT_F},
    {GRID_DRCT_FLL, GRID_DRCT_2L, GRID_DRCT_L},
    {GRID_DRCT_FLL, GRID_DRCT_FL, GRID_DRCT_L},
    {GRID_DRCT_BRR, GRID_DRCT_BR, GRID_DRCT_B},
    {GRID_DRCT_BRR, GRID_DRCT_2R, GRID_DRCT_R},
    {GRID_DRCT_BRR, GRID_DRCT_BR, GRID_DRCT_R},
    {GRID_DRCT_BLL, GRID_DRCT_BL, GRID_DRCT_B},
    {GRID_DRCT_BLL, GRID_DRCT_2L, GRID_DRCT_L},
    {GRID_DRCT_BLL, GRID_DRCT_BL, GRID_DRCT_L}};

#define BY_NORMAL_RELATI 0
#define BY_COMMON_RELATI 1

RelatiGrid_t **getRelatiRoutesBy(RelatiGrid_t *grid, int status, int routeType)
{
    RelatiGrid_t **routes = (RelatiGrid_t **)malloc(sizeof(RelatiGrid_t *) * grid->board->length);
    memset(routes, 0, sizeof(RelatiGrid_t *) * grid->board->length);
    int routesLength = 0;

    switch (routeType)
    {
    case BY_COMMON_RELATI:
        for (int i = 0; i < 24; i++)
        {
            RelatiGrid_t *targetGrid = getGridBy(GRID_DRCT_MODE, grid, REMOTE_STABLE_RELATI_ROUTES[i][0]);
            RelatiGrid_t *middleGrid1 = getGridBy(GRID_DRCT_MODE, grid, REMOTE_STABLE_RELATI_ROUTES[i][1]);
            RelatiGrid_t *middleGrid2 = getGridBy(GRID_DRCT_MODE, grid, REMOTE_STABLE_RELATI_ROUTES[i][2]);

            if (targetGrid && (targetGrid IS(status)) == status && middleGrid1 IS_SPACE && middleGrid2 IS_SPACE)
            {
                routes[routesLength++] = targetGrid;
            }
        }

        for (int i = 0; i < 8; i++)
        {
            RelatiGrid_t *targetGrid = getGridBy(GRID_DRCT_MODE, grid, REMOTE_NORMAL_RELATI_ROUTES[i][0]);
            RelatiGrid_t *middleGrid = getGridBy(GRID_DRCT_MODE, grid, REMOTE_NORMAL_RELATI_ROUTES[i][1]);

            if (targetGrid && (targetGrid IS(status)) == status && middleGrid IS_SPACE)
            {
                routes[routesLength++] = targetGrid;
            }
        }

    case BY_NORMAL_RELATI:
        for (int i = 0; i < 8; i++)
        {
            RelatiGrid_t *targetGrid = getGridBy(GRID_DRCT_MODE, grid, NORMAL_RELATI_ROUTES[i]);

            if (targetGrid && (targetGrid IS(status)) == status)
            {
                routes[routesLength++] = targetGrid;
            }
        }
    }

    return routes;
}

bool hasRelatiRoutesBy(RelatiGrid_t *grid, int status, int routeType)
{
    switch (routeType)
    {
    case BY_COMMON_RELATI:
        for (int i = 0; i < 24; i++)
        {
            RelatiGrid_t *targetGrid = getGridBy(GRID_DRCT_MODE, grid, REMOTE_STABLE_RELATI_ROUTES[i][0]);
            RelatiGrid_t *middleGrid1 = getGridBy(GRID_DRCT_MODE, grid, REMOTE_STABLE_RELATI_ROUTES[i][1]);
            RelatiGrid_t *middleGrid2 = getGridBy(GRID_DRCT_MODE, grid, REMOTE_STABLE_RELATI_ROUTES[i][2]);

            if (targetGrid && (targetGrid IS(status)) == status && middleGrid1 IS_SPACE && middleGrid2 IS_SPACE)
            {
                return true;
            }
        }

        for (int i = 0; i < 8; i++)
        {
            RelatiGrid_t *targetGrid = getGridBy(GRID_DRCT_MODE, grid, REMOTE_NORMAL_RELATI_ROUTES[i][0]);
            RelatiGrid_t *middleGrid = getGridBy(GRID_DRCT_MODE, grid, REMOTE_NORMAL_RELATI_ROUTES[i][1]);

            if (targetGrid && (targetGrid IS(status)) == status && middleGrid IS_SPACE)
            {
                return true;
            }
        }

    case BY_NORMAL_RELATI:
        for (int i = 0; i < 8; i++)
        {
            RelatiGrid_t *targetGrid = getGridBy(GRID_DRCT_MODE, grid, NORMAL_RELATI_ROUTES[i]);

            if (targetGrid && (targetGrid IS(status)) == status)
            {
                return true;
            }
        }
    }

    return false;
}

#endif