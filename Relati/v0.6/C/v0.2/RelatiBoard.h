#ifndef __RELATI_BOARD__
#define __RELATI_BOARD__

#include <stddef.h>
#include <stdarg.h>

typedef struct RelatiBoard_t RelatiBoard_t;
typedef struct RelatiGrid_t RelatiGrid_t;

/* 棋盤格 */
struct RelatiGrid_t {
    int x; // X軸
    int y; // Y軸
    int i; // 索引
    int body; // 內容
    RelatiBoard_t* board; // 棋盤
};

/* 棋盤 */
struct RelatiBoard_t {
    int width; // 寬度
    int height; // 高度
    int length; // 棋盤格總數
    RelatiGrid_t** grids; // 棋盤格陣列
};

/* 建立棋盤格 */
RelatiGrid_t* new_RelatiGrid(RelatiBoard_t* board, int x, int y) {
    int i = x * board->width + y;
    RelatiGrid_t* grid = (RelatiGrid_t*) malloc(sizeof(RelatiGrid_t));
    grid->x = x;
    grid->y = y;
    grid->i = i;
    grid->body = 0;
    grid->board = board;
    return grid;
}

/* 刪除棋盤格 */
void delete_RelatiGrid(RelatiGrid_t* grid) {
    free(grid);
}

/* 建立棋盤 */
RelatiBoard_t* new_RelatiBoard(int boardWidth, int boardHeight) {
    int boardLength = boardWidth * boardHeight;
    RelatiBoard_t* board = (RelatiBoard_t*) malloc(sizeof(RelatiBoard_t));
    RelatiGrid_t** grids = (RelatiGrid_t**) malloc(sizeof(RelatiGrid_t*) * boardLength);

    board->width = boardWidth;
    board->height = boardHeight;
    board->length = boardLength;
    board->grids = grids;

    for (int x = 0; x < boardWidth; x++) {
        for (int y = 0; y < boardHeight; y++) {
            RelatiGrid_t* grid = new_RelatiGrid(board, x, y);
            grids[grid->i] = grid;
        }
    }

    return board;
}

/* 刪除棋盤 */
void delete_RelatiBoard(RelatiBoard_t *board) {
    for (int i = 0; i < board->length; i++) delete_RelatiGrid(board->grids[i]);
    free(board->grids);
    free(board);
}

/* 取得棋盤格模式 */
#define GRID_COOR_MODE    0
#define RELATI_COOR_MODE  1
#define RELATI_DRCT_MODE  2

/* 取得棋盤格
 * 提供三種模式
 * GRID_COOR_MODE   棋盤格座標模式，需要參數 RelatiBoard_t board, int x, int y
 * 範例：getGridBy(GRID_COOR_MODE, board, 0, 0);
 * RELATI_COOR_MODE Relati絕對座標模式，需要參數 RelatiBoard_t board, char* c
 * 範例：getGridBy(RELATI_COOR_MODE, board, "A1");
 * RELATI_DRCT_MODE Relati相對座標模式，需要參數 RelatiGrid_t grid, int d
 * 範例：getGridBy(RELATI_DRCT_MODE, grid, RELATI_DIRECTION_F);
 */
RelatiGrid_t* getGridBy(int mode, ...) {
    va_list arguments;

    switch (mode) {
        case GRID_COOR_MODE: {
            mode = 3;
            va_start(arguments, mode);

            RelatiBoard_t* board = va_arg(arguments, RelatiBoard_t*);
            int x = va_arg(arguments, int);
            int y = va_arg(arguments, int);

            int i = x * board->width + y;

            va_end(arguments);
            return board->grids[i];
        }

        case RELATI_COOR_MODE: {
            mode = 2;
            va_start(arguments, mode);

            RelatiBoard_t* board = va_arg(arguments, RelatiBoard_t*);
            char* c = va_arg(arguments, char*);

            int x = c[0] > 96 ? c[0] - 97 : c[0] - 65;
            c++;
            int y = atoi(c) - 1;
            int i = x * board->width + y;

            va_end(arguments);
            return board->grids[i];
        }

        case RELATI_DRCT_MODE: {
            mode = 2;
            va_start(arguments, mode);

            RelatiGrid_t* grid = va_arg(arguments, RelatiGrid_t*);
            int d = va_arg(arguments, int);

            RelatiBoard_t* board = grid->board;
            int F = (0xF000 & d) >> 12;
            int B = (0x0F00 & d) >> 8;
            int R = (0x00F0 & d) >> 4;
            int L = (0x000F & d);
            int x = grid->x + R - L;
            int y = grid->y + B - F;
            int i = x * board->width + y;

            va_end(arguments);
            return board->grids[i];
        }
    }

    return NULL;
}

#endif