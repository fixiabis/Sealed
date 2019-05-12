#ifndef __RELATI_BOARD__
#define __RELATI_BOARD__

#include <stdio.h>
#include <string.h>
#include "./color.h"
#include "./GridBoard.h"

/* 符號
 * N: 無
 * O: 紅圈
 * X: 藍叉
 * D: 黃角
 * R: 綠方
 * A: 紫星
 */
#define RELATI_SYMBOL_N 0b00000000
#define RELATI_SYMBOL_O 0b00000001
#define RELATI_SYMBOL_X 0b00000010
#define RELATI_SYMBOL_D 0b00000011
#define RELATI_SYMBOL_R 0b00000100
#define RELATI_SYMBOL_A 0b00000101

/* 符號的狀態
 * RECEIVER 接收器
 * REPEATER 中繼器
 * LAUNCHER 啟動器
 */
#define RELATI_RECEIVER 0b00001000
#define RELATI_REPEATER 0b00010000
#define RELATI_LAUNCHER 0b00100000

/* 將兩狀態結合 */
#define HAS |
/* 判斷狀態是否符合，若狀態超過一個時，必須使用相等來判斷 */
#define IS(status) ->body &(status)
/* 判斷是否為空格 */
#define IS_SPACE ->body == RELATI_SYMBOL_N
/* 取得符號 */
#define SYMBOL ->body & 0b00000111
/* 獲得狀態 */
#define GAIN(status) ->body |= (status)
/* 失去狀態 */
#define LOST(status) ->body &= ~(status)

typedef Grid_t RelatiGrid_t;
typedef GridBoard_t RelatiBoard_t;
#define new_RelatiBoard(...) new_GridBoard(__VA_ARGS__)
#define delete_RelatiBoard(...) delete_GridBoard(__VA_ARGS__)
#define new_RelatiGrid(...) new_GridGrid(__VA_ARGS__)
#define delete_RelatiGrid(...) delete_GridGrid(__VA_ARGS__)

/* 印出棋盤 */
void printGridsBy(RelatiBoard_t *board)
{
    printf("|   |");

    for (int x = 0; x < board->width; x++)
        printf(" %c |", x + 65);

    printf("\n");

    for (int y = 0; y < board->height; y++)
    {
        printf("| %d |", y + 1);

        for (int x = 0; x < board->width; x++)
        {
            RelatiGrid_t *grid = getGridBy(COOR_MODE, board, x, y);
            int symbol = grid SYMBOL;

            char color[6] = COLOR_FG_BRIGHT_BLACK;
            char gridSymbol = ' ';

            switch (symbol)
            {
            case RELATI_SYMBOL_O:
                gridSymbol = 'O';

                if (grid IS(RELATI_LAUNCHER))
                    strcpy(color, COLOR_BG_RED);
                else if (grid IS(RELATI_REPEATER))
                    strcpy(color, COLOR_FG_RED);

                break;
            case RELATI_SYMBOL_X:
                gridSymbol = 'X';

                if (grid IS(RELATI_LAUNCHER))
                    strcpy(color, COLOR_BG_BLUE);
                else if (grid IS(RELATI_REPEATER))
                    strcpy(color, COLOR_FG_BLUE);

                break;
            case RELATI_SYMBOL_D:
                gridSymbol = 'D';

                if (grid IS(RELATI_LAUNCHER))
                    strcpy(color, COLOR_BG_YELLOW);
                else if (grid IS(RELATI_REPEATER))
                    strcpy(color, COLOR_FG_YELLOW);

                break;
            case RELATI_SYMBOL_R:
                gridSymbol = 'R';

                if (grid IS(RELATI_LAUNCHER))
                    strcpy(color, COLOR_BG_GREEN);
                else if (grid IS(RELATI_REPEATER))
                    strcpy(color, COLOR_FG_GREEN);

                break;
            case RELATI_SYMBOL_A:
                gridSymbol = 'A';

                if (grid IS(RELATI_LAUNCHER))
                    strcpy(color, COLOR_BG_MAGENTA);
                else if (grid IS(RELATI_REPEATER))
                    strcpy(color, COLOR_FG_MAGENTA);

                break;
            }

            printf(" %s%c%s |", color, gridSymbol, COLOR_RESET);
        }

        printf("\n");
    }
}

#endif