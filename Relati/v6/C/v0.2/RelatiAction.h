#ifndef __RELATI_ACTION__
#define __RELATI_ACTION__

#include "./color.h"
#include <string.h>

/* 符號
 * N: 無
 * O: 紅圈
 * X: 藍叉
 * D: 黃角
 * R: 綠方
 * A: 紫星
 */
#define RELATI_SYMBOL_N  0b00000000
#define RELATI_SYMBOL_O  0b00000001
#define RELATI_SYMBOL_X  0b00000010
#define RELATI_SYMBOL_D  0b00000011
#define RELATI_SYMBOL_R  0b00000100
#define RELATI_SYMBOL_A  0b00000101

/* 符號的狀態
 * RECEIVER 接收器
 * REPEATER 中繼器
 * LAUNCHER 啟動器
 */
#define RELATI_RECEIVER  0b00001000
#define RELATI_REPEATER  0b00010000
#define RELATI_LAUNCHER  0b00100000

/* 相對位置的方向
 * C: 目前位置
 * F: 棋盤格Y軸 - 1
 * B: 棋盤格Y軸 + 1
 * R: 棋盤格X軸 + 1
 * L: 棋盤格X軸 - 1
 */
#define RELATI_DIRECTION_C   0x0000
#define RELATI_DIRECTION_F   0x1000
#define RELATI_DIRECTION_B   0x0100
#define RELATI_DIRECTION_R   0x0010
#define RELATI_DIRECTION_L   0x0001
#define RELATI_DIRECTION_FR  0x1010
#define RELATI_DIRECTION_FL  0x1001
#define RELATI_DIRECTION_BR  0x0110
#define RELATI_DIRECTION_BL  0x0101
#define RELATI_DIRECTION_2F  0x2000
#define RELATI_DIRECTION_2B  0x0200
#define RELATI_DIRECTION_2R  0x0020
#define RELATI_DIRECTION_2L  0x0002
#define RELATI_DIRECTION_2FR 0x2020
#define RELATI_DIRECTION_2FL 0x2002
#define RELATI_DIRECTION_2BR 0x0220
#define RELATI_DIRECTION_2BL 0x0202
#define RELATI_DIRECTION_FFR 0x2010
#define RELATI_DIRECTION_FFL 0x2001
#define RELATI_DIRECTION_BBR 0x0210
#define RELATI_DIRECTION_BBL 0x0201
#define RELATI_DIRECTION_FRR 0x1020
#define RELATI_DIRECTION_FLL 0x1002
#define RELATI_DIRECTION_BRR 0x0120
#define RELATI_DIRECTION_BLL 0x0102

/* 將兩狀態結合 */
#define HAS |
/* 判斷狀態是否符合，若狀態超過一個時，必須使用相等來判斷 */
#define IS(status) ->body & (status)
/* 判斷是否為空格 */
#define IS_SPACE ->body == RELATI_SYMBOL_N
/* 取得符號 */
#define SYMBOL ->body & 0b00000111
/* 獲得狀態 */
#define GAIN(status) ->body |= (status)
/* 失去狀態 */
#define LOST(status) ->body &= ~(status)

/* 取得可連線的符號的模式 */
#define BY_NORMAL_RELATI 0
#define BY_COMMON_RELATI 1

/* 一般 Relati 的路徑 */
static const int NORMAL_RELATI_ROUTES[8] = {
    RELATI_DIRECTION_F ,
    RELATI_DIRECTION_B ,
    RELATI_DIRECTION_R ,
    RELATI_DIRECTION_L ,
    RELATI_DIRECTION_FR,
    RELATI_DIRECTION_FL,
    RELATI_DIRECTION_BR,
    RELATI_DIRECTION_BL
};

/* 遠程一般 Relati 的路徑 */
static const int REMOTE_NORMAL_RELATI_ROUTES[8][2] = {
    { RELATI_DIRECTION_2F , RELATI_DIRECTION_F  },
    { RELATI_DIRECTION_2B , RELATI_DIRECTION_B  },
    { RELATI_DIRECTION_2R , RELATI_DIRECTION_R  },
    { RELATI_DIRECTION_2L , RELATI_DIRECTION_L  },
    { RELATI_DIRECTION_2FR, RELATI_DIRECTION_FR },
    { RELATI_DIRECTION_2FL, RELATI_DIRECTION_FL },
    { RELATI_DIRECTION_2BR, RELATI_DIRECTION_BR },
    { RELATI_DIRECTION_2BL, RELATI_DIRECTION_BL }
};

/* 遠程穩定 Relati 的路徑 */
static const int REMOTE_STABLE_RELATI_ROUTES[24][3] = {
    { RELATI_DIRECTION_FFR, RELATI_DIRECTION_2F, RELATI_DIRECTION_F },
    { RELATI_DIRECTION_FFR, RELATI_DIRECTION_FR, RELATI_DIRECTION_F },
    { RELATI_DIRECTION_FFR, RELATI_DIRECTION_FR, RELATI_DIRECTION_R },
    { RELATI_DIRECTION_FFL, RELATI_DIRECTION_2F, RELATI_DIRECTION_F },
    { RELATI_DIRECTION_FFL, RELATI_DIRECTION_FL, RELATI_DIRECTION_F },
    { RELATI_DIRECTION_FFL, RELATI_DIRECTION_FL, RELATI_DIRECTION_L },
    { RELATI_DIRECTION_BBR, RELATI_DIRECTION_2B, RELATI_DIRECTION_B },
    { RELATI_DIRECTION_BBR, RELATI_DIRECTION_BR, RELATI_DIRECTION_B },
    { RELATI_DIRECTION_BBR, RELATI_DIRECTION_BR, RELATI_DIRECTION_R },
    { RELATI_DIRECTION_BBL, RELATI_DIRECTION_2B, RELATI_DIRECTION_B },
    { RELATI_DIRECTION_BBL, RELATI_DIRECTION_BL, RELATI_DIRECTION_B },
    { RELATI_DIRECTION_BBL, RELATI_DIRECTION_BL, RELATI_DIRECTION_L },
    { RELATI_DIRECTION_FRR, RELATI_DIRECTION_FR, RELATI_DIRECTION_F },
    { RELATI_DIRECTION_FRR, RELATI_DIRECTION_2R, RELATI_DIRECTION_R },
    { RELATI_DIRECTION_FRR, RELATI_DIRECTION_FR, RELATI_DIRECTION_R },
    { RELATI_DIRECTION_FLL, RELATI_DIRECTION_FL, RELATI_DIRECTION_F },
    { RELATI_DIRECTION_FLL, RELATI_DIRECTION_2L, RELATI_DIRECTION_L },
    { RELATI_DIRECTION_FLL, RELATI_DIRECTION_FL, RELATI_DIRECTION_L },
    { RELATI_DIRECTION_BRR, RELATI_DIRECTION_BR, RELATI_DIRECTION_B },
    { RELATI_DIRECTION_BRR, RELATI_DIRECTION_2R, RELATI_DIRECTION_R },
    { RELATI_DIRECTION_BRR, RELATI_DIRECTION_BR, RELATI_DIRECTION_R },
    { RELATI_DIRECTION_BLL, RELATI_DIRECTION_BL, RELATI_DIRECTION_B },
    { RELATI_DIRECTION_BLL, RELATI_DIRECTION_2L, RELATI_DIRECTION_L },
    { RELATI_DIRECTION_BLL, RELATI_DIRECTION_BL, RELATI_DIRECTION_L }
};

void printCoor(int, int);
void printDrct(int);
void printSymbol(int);
void printStatus(int);

/* 取得可連線的符號 */
RelatiGrid_t** getRelatiableGridsBy(RelatiGrid_t* grid, int status, int routeType) {
    RelatiGrid_t** relatiableGrids = (RelatiGrid_t**) malloc(sizeof(RelatiGrid_t*) * grid->board->length);
    memset(relatiableGrids, 0, sizeof(RelatiGrid_t*) * grid->board->length);
    int relatiableGridsLength = 0;

    printf("    locate '");
    printCoor(grid->x, grid->y);
    printf("' (");
    printSymbol(grid->body);
    printf(" ");
    printStatus(grid->body);
    printf("), ");
    printf("find (");
    printSymbol(status);
    printf(" ");
    printStatus(status);
    printf(")");

    switch (routeType) {
        case BY_COMMON_RELATI:
            printf("\n    in remote stable routes\n");

            for (int i = 0; i < 24; i++) {
                RelatiGrid_t* targetGrid  = getGridBy(RELATI_DRCT_MODE, grid, REMOTE_STABLE_RELATI_ROUTES[i][0]);
                RelatiGrid_t* middleGrid1 = getGridBy(RELATI_DRCT_MODE, grid, REMOTE_STABLE_RELATI_ROUTES[i][1]);
                RelatiGrid_t* middleGrid2 = getGridBy(RELATI_DRCT_MODE, grid, REMOTE_STABLE_RELATI_ROUTES[i][2]);
                
                printf("    ");
                printDrct(REMOTE_STABLE_RELATI_ROUTES[i][0]);
                printf(" ");
                printDrct(REMOTE_STABLE_RELATI_ROUTES[i][1]);
                printf(" ");
                printDrct(REMOTE_STABLE_RELATI_ROUTES[i][2]);

                if (targetGrid == NULL) {
                    printf("\n");
                    continue;
                }

                printf(": '");
                printCoor(targetGrid->x, targetGrid->y);
                printf("' ");
                printf("(");
                printSymbol(targetGrid->body);
                printf(" ");
                printStatus(targetGrid->body);
                printf(")");
                printf(", '");
                printCoor(middleGrid1->x, middleGrid1->y);
                printf("' ");
                printf("(");
                printSymbol(middleGrid1->body);
                printf(" ");
                printStatus(middleGrid1->body);
                printf(")");
                printf(", '");
                printCoor(middleGrid2->x, middleGrid2->y);
                printf("' ");
                printf("(");
                printSymbol(middleGrid2->body);
                printf(" ");
                printStatus(middleGrid2->body);
                printf(")");

                if ((targetGrid IS(status)) == status && middleGrid1 IS_SPACE && middleGrid2 IS_SPACE) {
                    printf(" is relatiable");
                    printf(" %d %d", targetGrid->body, status);
                    relatiableGrids[relatiableGridsLength++] = targetGrid;
                }

                printf("\n");
            }

            printf("\n    in remote normal routes\n");

            for (int i = 0; i < 8; i++) {
                RelatiGrid_t* targetGrid = getGridBy(RELATI_DRCT_MODE, grid, REMOTE_NORMAL_RELATI_ROUTES[i][0]);
                RelatiGrid_t* middleGrid = getGridBy(RELATI_DRCT_MODE, grid, REMOTE_NORMAL_RELATI_ROUTES[i][1]);

                printf("    ");
                printDrct(REMOTE_NORMAL_RELATI_ROUTES[i][0]);
                printf(" ");
                printDrct(REMOTE_NORMAL_RELATI_ROUTES[i][1]);

                if (targetGrid == NULL) {
                    printf("\n");
                    continue;
                }

                printf(": '");
                printCoor(targetGrid->x, targetGrid->y);
                printf("' ");
                printf("(");
                printSymbol(targetGrid->body);
                printf(" ");
                printStatus(targetGrid->body);
                printf(")");
                printf(", '");
                printCoor(middleGrid->x, middleGrid->y);
                printf("' ");
                printf("(");
                printSymbol(middleGrid->body);
                printf(" ");
                printStatus(middleGrid->body);
                printf(")");

                if ((targetGrid IS(status)) == status && middleGrid IS_SPACE) {
                    printf(" is relatiable");
                    printf(" %d %d", targetGrid->body, status);
                    relatiableGrids[relatiableGridsLength++] = targetGrid;
                }

                printf("\n");
            }

        case BY_NORMAL_RELATI:

            printf("\n    in normal routes\n");

            for (int i = 0; i < 8; i++) {
                RelatiGrid_t* targetGrid = getGridBy(RELATI_DRCT_MODE, grid, NORMAL_RELATI_ROUTES[i]);

                printf("    ");
                printDrct(NORMAL_RELATI_ROUTES[i]);

                if (targetGrid == NULL) {
                    printf("\n");
                    continue;
                }

                printf(": '");
                printCoor(targetGrid->x, targetGrid->y);
                printf("' ");
                printf("(");
                printSymbol(targetGrid->body);
                printf(" ");
                printStatus(targetGrid->body);
                printf(")");

                if ((targetGrid IS(status)) == status) {
                    printf(" is relatiable");
                    printf(" %d %d", targetGrid->body, status);
                    relatiableGrids[relatiableGridsLength++] = targetGrid;
                }

                printf("\n");
            }
    }

    printf("\n");

    return relatiableGrids;
}

void restore(RelatiGrid_t* grid, int routeType) {
    if (grid IS(RELATI_REPEATER)) return;
    grid GAIN(RELATI_REPEATER);

    RelatiGrid_t** relatiableGrids = getRelatiableGridsBy(grid, grid SYMBOL HAS RELATI_RECEIVER, routeType);
    int relatiableGridsLength = 0;

    while (relatiableGrids[relatiableGridsLength] != NULL) {
        RelatiGrid_t* targetGrid = relatiableGrids[relatiableGridsLength];
        restore(targetGrid, routeType);
        relatiableGridsLength++;
    }

    free(relatiableGrids);
}

/* 恢復連線 */
void restoreRepeaterBy(RelatiBoard_t* board, int routeType) {
    for (int i = 0; i < board->length; i++) {
        RelatiGrid_t* grid = board->grids[i];

        if (grid IS(RELATI_LAUNCHER)) {
            printf("\nsource founded: ");
            printCoor(grid->x, grid->y);
            printf("\n");
            restore(grid, routeType);
        }
    }
}

/* 破壞連線 */
void destoryRepeaterBy(RelatiBoard_t* board) {
    for (int i = 0; i < board->length; i++) {
        RelatiGrid_t* grid = board->grids[i];
        grid LOST(RELATI_REPEATER);
    }
}

/* 印出符號 */
void printSymbol(int symbol) {
    switch (symbol & 0b00000111) {
        case RELATI_SYMBOL_O: printf("\x1b[31mO\x1b[0m"); break;
        case RELATI_SYMBOL_X: printf("\x1b[34mX\x1b[0m"); break;
        case RELATI_SYMBOL_D: printf("\x1b[33mD\x1b[0m"); break;
        case RELATI_SYMBOL_R: printf("\x1b[32mR\x1b[0m"); break;
        case RELATI_SYMBOL_A: printf("\x1b[35mA\x1b[0m"); break;
        default: printf(" ");
    }
}

/* 印出狀態 */
void printStatus(int status) {
    if (status & RELATI_LAUNCHER) printf("source");
    else if (status & RELATI_REPEATER) printf("normal");
    else if (status & RELATI_RECEIVER) printf("frozen");
    else printf("      ");
}

/* 印出方向 */
void printDrct(int d) {
    int F = (0xF000 & d) >> 12;
    int B = (0x0F00 & d) >> 8;
    int R = (0x00F0 & d) >> 4;
    int L = (0x000F & d);

    if (F) for (int i = 0; i < F; i++) printf("F");
    if (B) for (int i = 0; i < B; i++) printf("B");
    if (R) for (int i = 0; i < R; i++) printf("R");
    if (L) for (int i = 0; i < L; i++) printf("L");
}

/* 印出座標 */
void printCoor(int x, int y) {
    printf("%c%d", x + 65, y + 1);
}

/* 印出棋盤 */
void printGridsBy(RelatiBoard_t* board) {
    printf("|   |");
    for (int x = 0; x < board->width; x++) printf(" %c |", x + 65);
    printf("\n");

    for (int y = 0; y < board->height; y++) {
        printf("| %d |", y + 1);

        for (int x = 0; x < board->width; x++) {
            RelatiGrid_t* grid = getGridBy(GRID_COOR_MODE, board, x, y);
            int symbol = grid SYMBOL;

            char color[6] = COLOR_FG_BRIGHT_BLACK;
            char gridSymbol = ' ';

            switch (symbol) {
                case RELATI_SYMBOL_O:
                    gridSymbol = 'O';

                    if (grid IS(RELATI_LAUNCHER)) strcpy(color, COLOR_BG_RED);
                    else if (grid IS(RELATI_REPEATER)) strcpy(color, COLOR_FG_RED);

                    break;
                case RELATI_SYMBOL_X:
                    gridSymbol = 'X';

                    if (grid IS(RELATI_LAUNCHER)) strcpy(color, COLOR_BG_BLUE);
                    else if (grid IS(RELATI_REPEATER)) strcpy(color, COLOR_FG_BLUE);

                    break;
                case RELATI_SYMBOL_D:
                    gridSymbol = 'D';

                    if (grid IS(RELATI_LAUNCHER)) strcpy(color, COLOR_BG_YELLOW);
                    else if (grid IS(RELATI_REPEATER)) strcpy(color, COLOR_FG_YELLOW);

                    break;
                case RELATI_SYMBOL_R:
                    gridSymbol = 'R';

                    if (grid IS(RELATI_LAUNCHER)) strcpy(color, COLOR_BG_GREEN);
                    else if (grid IS(RELATI_REPEATER)) strcpy(color, COLOR_FG_GREEN);

                    break;
                case RELATI_SYMBOL_A:
                    gridSymbol = 'A';

                    if (grid IS(RELATI_LAUNCHER)) strcpy(color, COLOR_BG_MAGENTA);
                    else if (grid IS(RELATI_REPEATER)) strcpy(color, COLOR_FG_MAGENTA);

                    break;
            }

            printf(" %s%c%s |", color, gridSymbol, COLOR_RESET);
        }

        printf("\n");
    }
}

#endif