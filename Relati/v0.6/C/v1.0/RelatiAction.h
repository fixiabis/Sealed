#ifndef __RELATI_ACTION_H__
#define __RELATI_ACTION_H__

#include "./RelatiBoard.h"
#include "./RelatiRoutes.h"

void restore(RelatiGrid_t *grid, int routeType)
{
    if (grid IS(RELATI_REPEATER))
        return;

    grid GAIN(RELATI_REPEATER);

    RelatiGrid_t **routes = getRelatiRoutesBy(grid, grid SYMBOL HAS RELATI_RECEIVER, routeType);
    int routesLength = 0;

    while (routes[routesLength] != NULL)
    {
        RelatiGrid_t *targetGrid = routes[routesLength];
        restore(targetGrid, routeType);
        routesLength++;
    }

    free(routes);
}

void restoreRepeaterBy(RelatiBoard_t *board, int routeType)
{
    for (int i = 0; i < board->length; i++)
    {
        RelatiGrid_t *grid = board->grids[i];

        if (grid IS(RELATI_LAUNCHER))
        {
            restore(grid, routeType);
        }
    }
}

void destoryRepeaterBy(RelatiBoard_t *board)
{
    for (int i = 0; i < board->length; i++)
    {
        RelatiGrid_t *grid = board->grids[i];
        grid LOST(RELATI_REPEATER);
    }
}

#endif