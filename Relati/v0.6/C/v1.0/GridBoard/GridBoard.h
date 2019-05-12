#ifndef __GRID_BOARD_H__
#define __GRID_BOARD_H__

#include <stdlib.h>
#include <stdarg.h>
#include <stddef.h>

struct Grid_t
{
    int x;
    int y;
    int i;
    int body;
    struct GridBoard_t *board;
};

struct GridBoard_t
{
    int width;
    int height;
    int length;
    struct Grid_t **grids;
};

Grid_t *new_Grid(GridBoard_t *board, int x, int y)
{
    int i = x * board->width + y;
    Grid_t *grid = (Grid_t *)malloc(sizeof(Grid_t));

    grid->x = x;
    grid->y = y;
    grid->i = i;
    grid->body = 0;
    grid->board = board;

    return grid;
}

GridBoard_t *new_GridBoard(int width, int height)
{
    int length = width * height;
    GridBoard_t *board = (GridBoard_t *)malloc(sizeof(GridBoard_t));
    Grid_t **grids = (Grid_t **)malloc(sizeof(Grid_t *) * length);

    board->grids = grids;
    board->width = width;
    board->height = height;
    board->length = length;

    for (int x = 0; x < width; x++)
    {
        for (int y = 0; y < height; y++)
        {
            Grid_t *grid = new_Grid(board, x, y);
            grids[grid->i] = grid;
        }
    }

    return board;
}

void delete_Grid(Grid_t *grid)
{
    free(grid);
}

void delete_GridBoard(GridBoard_t *board)
{
    for (int i = 0; i < board->length; i++)
    {
        delete_Grid(board->grids[i]);
    }

    free(board->grids);
    free(board);
}

#define COOR_MODE 0
#define GRID_COOR_MODE 1
#define GRID_DRCT_MODE 2

Grid_t *getGridBy(int mode, ...)
{
    va_list arguments;
    GridBoard_t *board;
    int x, y, i;

    switch (mode)
    {
    case COOR_MODE:
    {
        mode = 3;

        va_start(arguments, mode);
        board = va_arg(arguments, GridBoard_t *);
        x = va_arg(arguments, int);
        y = va_arg(arguments, int);
        va_end(arguments);
        break;
    }

    case GRID_COOR_MODE:
    {
        mode = 2;

        va_start(arguments, mode);
        board = va_arg(arguments, GridBoard_t *);
        char *coor = va_arg(arguments, char *);
        va_end(arguments);

        x = coor[0] > 96 ? coor[0] - 97 : coor[0] - 65;
        y = atoi(&coor[1]) - 1;
        break;
    }

    case GRID_DRCT_MODE:
    {
        mode = 2;

        va_start(arguments, mode);
        Grid_t *grid = va_arg(arguments, Grid_t *);
        int drct = va_arg(arguments, int);
        va_end(arguments);

        int F = (0xF000 & drct) >> 12;
        int B = (0x0F00 & drct) >> 8;
        int R = (0x00F0 & drct) >> 4;
        int L = (0x000F & drct);

        board = grid->board;
        x = grid->x + R - L;
        y = grid->y + B - F;
        break;
    }
    }

    if (x < 0 || x >= board->width || y < 0 || y >= board->height)
        return NULL;

    i = x * board->width + y;
    return board->grids[i];
}

#endif