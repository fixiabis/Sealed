#ifndef __GRID_BOARD__
#define __GRID_BOARD__

#include <stdlib.h>
#include <stdarg.h>
#include <stddef.h>

/* 相對位置的方向
 * C: 目前位置
 * F: 棋盤格Y軸 - 1
 * B: 棋盤格Y軸 + 1
 * R: 棋盤格X軸 + 1
 * L: 棋盤格X軸 - 1
 * 格式: 0xFBRL
 * 範例: 0x1000 = F
 */
#define GRID_DRCT_C 0x0000
#define GRID_DRCT_F 0x1000
#define GRID_DRCT_B 0x0100
#define GRID_DRCT_R 0x0010
#define GRID_DRCT_L 0x0001
#define GRID_DRCT_FR 0x1010
#define GRID_DRCT_FL 0x1001
#define GRID_DRCT_BR 0x0110
#define GRID_DRCT_BL 0x0101
#define GRID_DRCT_2F 0x2000
#define GRID_DRCT_2B 0x0200
#define GRID_DRCT_2R 0x0020
#define GRID_DRCT_2L 0x0002
#define GRID_DRCT_2FR 0x2020
#define GRID_DRCT_2FL 0x2002
#define GRID_DRCT_2BR 0x0220
#define GRID_DRCT_2BL 0x0202
#define GRID_DRCT_FFR 0x2010
#define GRID_DRCT_FFL 0x2001
#define GRID_DRCT_BBR 0x0210
#define GRID_DRCT_BBL 0x0201
#define GRID_DRCT_FRR 0x1020
#define GRID_DRCT_FLL 0x1002
#define GRID_DRCT_BRR 0x0120
#define GRID_DRCT_BLL 0x0102

typedef struct GridBoard_t GridBoard_t;
typedef struct Grid_t Grid_t;

/* 棋盤格 */
struct Grid_t
{
    int x;              // X軸
    int y;              // Y軸
    int i;              // 索引
    int body;           // 內容
    GridBoard_t *board; // 棋盤
};

/* 棋盤 */
struct GridBoard_t
{
    int width;      // 寬度
    int height;     // 高度
    int length;     // 棋盤格總數
    Grid_t **grids; // 棋盤格陣列
};

/* 建立棋盤格 */
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

/* 建立棋盤 */
GridBoard_t *new_GridBoard(int boardWidth, int boardHeight)
{
    int boardLength = boardWidth * boardHeight;
    GridBoard_t *board = (GridBoard_t *)malloc(sizeof(GridBoard_t));
    Grid_t **grids = (Grid_t **)malloc(sizeof(Grid_t *) * boardLength);

    board->width = boardWidth;
    board->height = boardHeight;
    board->length = boardLength;
    board->grids = grids;

    for (int x = 0; x < boardWidth; x++)
    {
        for (int y = 0; y < boardHeight; y++)
        {
            Grid_t *grid = new_Grid(board, x, y);
            grids[grid->i] = grid;
        }
    }

    return board;
}

/* 刪除棋盤格 */
void delete_Grid(Grid_t *grid)
{
    free(grid);
}

/* 刪除棋盤 */
void delete_GridBoard(GridBoard_t *board)
{
    for (int i = 0; i < board->length; i++)
    {
        delete_Grid(board->grids[i]);
    }

    free(board->grids);
    free(board);
}

/* 取得棋盤格模式 */
#define COOR_MODE 0
#define GRID_COOR_MODE 1
#define GRID_DRCT_MODE 2

/* 取得棋盤格
 * 提供三種模式
 * COOR_MODE   棋盤格座標模式，需要參數 GridBoard_t board, int x, int y
 * 範例：getGridBy(COOR_MODE, board, 0, 0);
 * GRID_COOR_MODE Relati絕對座標模式，需要參數 GridBoard_t board, char* c
 * 範例：getGridBy(GRID_COOR_MODE, board, "A1");
 * GRID_DRCT_MODE Relati相對座標模式，需要參數 Grid_t grid, int d
 * 範例：getGridBy(GRID_DRCT_MODE, grid, RELATI_DIRECTION_F);
 */
Grid_t *getGridBy(int mode, ...)
{
    va_list arguments;

    switch (mode)
    {
    case COOR_MODE:
    {
        mode = 3;
        va_start(arguments, mode);

        GridBoard_t *board = va_arg(arguments, GridBoard_t *);
        int x = va_arg(arguments, int);
        int y = va_arg(arguments, int);

        int i = x * board->width + y;

        va_end(arguments);
        return board->grids[i];
    }

    case GRID_COOR_MODE:
    {
        mode = 2;
        va_start(arguments, mode);

        GridBoard_t *board = va_arg(arguments, GridBoard_t *);
        char *coor = va_arg(arguments, char *);

        int x = coor[0] > 96 ? coor[0] - 97 : coor[0] - 65;
        int y = atoi(&coor[1]) - 1;

        if (
            x < 0 || x >= board->width ||
            y < 0 || y >= board->height)
            return NULL;

        int i = x * board->width + y;

        va_end(arguments);
        return board->grids[i];
    }

    case GRID_DRCT_MODE:
    {
        mode = 2;
        va_start(arguments, mode);

        Grid_t *grid = va_arg(arguments, Grid_t *);
        int drct = va_arg(arguments, int);

        GridBoard_t *board = grid->board;
        int F = (0xF000 & drct) >> 12;
        int B = (0x0F00 & drct) >> 8;
        int R = (0x00F0 & drct) >> 4;
        int L = (0x000F & drct);
        int x = grid->x + R - L;
        int y = grid->y + B - F;
        int i = x * board->width + y;

        va_end(arguments);

        if (x < 0 || x >= board->width ||
            y < 0 || y >= board->height)
            return NULL;

        return board->grids[i];
    }
    }

    return NULL;
}

#endif