#ifndef __RELATI_ACTION__
#define __RELATI_ACTION__

#include "./RelatiBoard.h"
#include "./RelatiDebug.h"
#include "./RelatiRoutes.h"

void restore(RelatiGrid_t *grid, int routeType)
{
    if (grid IS(RELATI_REPEATER))
        return;
    grid GAIN(RELATI_REPEATER);

    RelatiGrid_t **relatiableGrids = getRelatiRoutes(grid, grid SYMBOL HAS RELATI_RECEIVER, routeType);
    int relatiableGridsLength = 0;

    while (relatiableGrids[relatiableGridsLength] != NULL)
    {
        RelatiGrid_t *targetGrid = relatiableGrids[relatiableGridsLength];
        restore(targetGrid, routeType);
        relatiableGridsLength++;
    }

    free(relatiableGrids);
}

void restoreRepeaterBy(RelatiBoard_t *board, int routeType)
{
    for (int i = 0; i < board->length; i++)
    {
        RelatiGrid_t *grid = board->grids[i];

        if (grid IS(RELATI_LAUNCHER))
        {
            printf("\nsource founded: ");
            printCoor(grid->x, grid->y);
            printf("\n");
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