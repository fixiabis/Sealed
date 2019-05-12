#ifndef __RELATI_BOARD__
#define __RELATI_BOARD__

#include <stdio.h>
#include <stdlib.h>
#include <stdbool.h>
#include <string.h>
#include "color.h"

typedef int RelatiGrid_t;

typedef struct {
    RelatiGrid_t *grids;
    int width;
    int height;
    int length;
} RelatiBoard_t;

#define RELATI_SYMBOL_N  0b00000000
#define RELATI_SYMBOL_O  0b00000001
#define RELATI_SYMBOL_X  0b00000010
#define RELATI_SYMBOL_D  0b00000011
#define RELATI_SYMBOL_R  0b00000100
#define RELATI_SYMBOL_A  0b00000101

#define RELATI_RECEIVER  0b00001000
#define RELATI_REPEATER  0b00010000
#define RELATI_LAUNCHER  0b00100000

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

#define IS &
#define GAIN |=
#define LOST &= ~
#define SYMBOL & 0b00000111
#define SYMBOL_IS |=
#define IS_SPACE == RELATI_SYMBOL_N

#define BY_NORMAL_RELATI 0
#define BY_COMMON_RELATI 1

#define PUSH [length++] =
#define LAST [length-1]

const int NORMAL_RELATI_ROUTES[] = {
    RELATI_DIRECTION_F ,
    RELATI_DIRECTION_B ,
    RELATI_DIRECTION_R ,
    RELATI_DIRECTION_L ,
    RELATI_DIRECTION_FR,
    RELATI_DIRECTION_FL,
    RELATI_DIRECTION_BR,
    RELATI_DIRECTION_BL
};

const int REMOTE_NORMAL_RELATI_ROUTES[][2] = {
    { RELATI_DIRECTION_2F , RELATI_DIRECTION_F  },
    { RELATI_DIRECTION_2B , RELATI_DIRECTION_B  },
    { RELATI_DIRECTION_2R , RELATI_DIRECTION_R  },
    { RELATI_DIRECTION_2L , RELATI_DIRECTION_L  },
    { RELATI_DIRECTION_2FR, RELATI_DIRECTION_FR },
    { RELATI_DIRECTION_2FL, RELATI_DIRECTION_FL },
    { RELATI_DIRECTION_2BR, RELATI_DIRECTION_BR },
    { RELATI_DIRECTION_2BL, RELATI_DIRECTION_BL }
};

const int REMOTE_STABLE_RELATI_ROUTES[][3] = {
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

RelatiBoard_t *new_RelatiBoard(int boardWidth, int boardHeight) {
    int boardLength = boardWidth * boardHeight;

    RelatiBoard_t *board = (RelatiBoard_t*) malloc(sizeof(RelatiBoard_t));
    RelatiGrid_t *grids = (RelatiGrid_t*) malloc(sizeof(RelatiGrid_t) * boardLength);

    memset(grids, 0, sizeof(RelatiGrid_t) * boardLength);

    board->width = boardWidth;
    board->height = boardHeight;
    board->length = boardLength;
    board->grids = grids;

    return board;
}

void delete_RelatiBoard(RelatiBoard_t *board) {
    free(board->grids);
    free(board);
}

int get_grid_index_by(RelatiBoard_t *board, int x, int y, int d) {
    int F = (0xF000 & d) >> 12;
    int B = (0x0F00 & d) >> 8;
    int R = (0x00F0 & d) >> 4;
    int L = (0x000F & d);

    x += R - L;
    y += B - F;

    return x * board->width + y;
}

RelatiGrid_t *get_grid_by(RelatiBoard_t *board, int x, int y, int d) {
    int i = get_grid_index_by(board, x, y, d);
    return i < 0 || i >= board->length ? NULL : &board->grids[i];
}

void print_grid_by(RelatiBoard_t *board) {
    printf("\n|   |");
    
    for (int x = 0; x < board->width; x++) {
        printf(" %c |", x + 65);
    }

    printf("\n");

    for (int y = 0; y < board->height; y++) {
        printf("| %d |", y + 1);

        for (int x = 0; x < board->width; x++) {
            RelatiGrid_t *grid = get_grid_by(board, x, y, RELATI_DIRECTION_C);
            int symbol = *grid SYMBOL;

            char color[6] = COLOR_FG_BRIGHT_BLACK;
            char grid_symbol = ' ';

            switch (symbol) {
                case RELATI_SYMBOL_O:
                    grid_symbol = 'O';

                    if (*grid IS RELATI_LAUNCHER) strcpy(color, COLOR_BG_RED);
                    else if (*grid IS RELATI_REPEATER) strcpy(color, COLOR_FG_RED);

                    break;
                case RELATI_SYMBOL_X:
                    grid_symbol = 'X';

                    if (*grid IS RELATI_LAUNCHER) strcpy(color, COLOR_BG_BLUE);
                    else if (*grid IS RELATI_REPEATER) strcpy(color, COLOR_FG_BLUE);

                    break;
                case RELATI_SYMBOL_D:
                    grid_symbol = 'D';

                    if (*grid IS RELATI_LAUNCHER) strcpy(color, COLOR_BG_YELLOW);
                    else if (*grid IS RELATI_REPEATER) strcpy(color, COLOR_FG_YELLOW);

                    break;
                case RELATI_SYMBOL_R:
                    grid_symbol = 'R';

                    if (*grid IS RELATI_LAUNCHER) strcpy(color, COLOR_BG_GREEN);
                    else if (*grid IS RELATI_REPEATER) strcpy(color, COLOR_FG_GREEN);

                    break;
                case RELATI_SYMBOL_A:
                    grid_symbol = 'A';

                    if (*grid IS RELATI_LAUNCHER) strcpy(color, COLOR_BG_MAGENTA);
                    else if (*grid IS RELATI_REPEATER) strcpy(color, COLOR_FG_MAGENTA);

                    break;
            }

            printf(" %s%c%s |", color, grid_symbol, COLOR_RESET);
        }

        printf("\n");
    }

    printf("\n");
}

void print_coordinate(int x, int y) {
    printf("%c%d", x + 65, y + 1);
}

void print_direction(int d) {
    int F = (0xF000 & d) >> 12;
    int B = (0x0F00 & d) >> 8;
    int R = (0x00F0 & d) >> 4;
    int L = (0x000F & d);
    if (F) printf("F:%d", F);
    if (B) printf("B:%d", B);
    if (R) printf("R:%d", R);
    if (L) printf("L:%d", L);
}

int *get_relatiable_grid_indexes_by(RelatiBoard_t *board, int x, int y, int symbol, int status, int route_type) {
    int grid_indexes[board->length];
    int *relatiable_grid_indexes = grid_indexes;
    int length = 0;

    memset(grid_indexes, -1, sizeof(int) * board->length);

    switch (route_type) {
        case BY_COMMON_RELATI:
            for (int i = 0; i < 24; i++) {
                int target_grid_index = get_grid_index_by(board, x, y, REMOTE_STABLE_RELATI_ROUTES[i][0]);
                RelatiGrid_t *target_grid = &board->grids[target_grid_index];
                RelatiGrid_t *middle_grid1 = get_grid_by(board, x, y, REMOTE_STABLE_RELATI_ROUTES[i][1]);
                RelatiGrid_t *middle_grid2 = get_grid_by(board, x, y, REMOTE_STABLE_RELATI_ROUTES[i][2]);
                
                if (target_grid == NULL) continue;
                if (*target_grid IS symbol && *target_grid IS status && *middle_grid1 IS_SPACE && *middle_grid2 IS_SPACE) {
                    grid_indexes PUSH target_grid_index;
                }
            }

            for (int i = 0; i < 8; i++) {
                int target_grid_index = get_grid_index_by(board, x, y, REMOTE_NORMAL_RELATI_ROUTES[i][0]);
                RelatiGrid_t *target_grid = &board->grids[target_grid_index];
                RelatiGrid_t *middle_grid = get_grid_by(board, x, y, REMOTE_NORMAL_RELATI_ROUTES[i][1]);

                if (target_grid == NULL) continue;
                if (*target_grid IS symbol && *target_grid IS status && *middle_grid IS_SPACE) {
                    grid_indexes PUSH target_grid_index;
                }
            }

        case BY_NORMAL_RELATI:
            for (int i = 0; i < 8; i++) {
                int target_grid_index = get_grid_index_by(board, x, y, NORMAL_RELATI_ROUTES[i]);
                RelatiGrid_t *target_grid = &board->grids[target_grid_index];

                if (target_grid == NULL) continue;
                if (*target_grid IS symbol && *target_grid IS status) {
                    grid_indexes PUSH target_grid_index;
                }
            }
    }

    return relatiable_grid_indexes;
}

void restore(RelatiBoard_t *board, int x, int y, int route_type) {
    RelatiGrid_t *grid = get_grid_by(board, x, y, RELATI_DIRECTION_C);

    if (*grid IS RELATI_REPEATER) return;
    *grid GAIN RELATI_REPEATER;

    RelatiGrid_t *relatiableGridIndexes = get_relatiable_grid_indexes_by(
        board, x, y, *grid SYMBOL, RELATI_RECEIVER, route_type
    );

    while (*relatiableGridIndexes != -1) {
        int i = *relatiableGridIndexes;
        int y = i % board->height;
        int x = (i - y) / board->width;
        restore(board, x, y, route_type);
        relatiableGridIndexes++;
    }
}

void restore_repeater_by(RelatiBoard_t *board, int route_type) {
    for (int i = 0; i < board->length; i++) {
        RelatiGrid_t *grid = &board->grids[i];
        
        if (*grid IS RELATI_LAUNCHER) {
            int y = i % board->height;
            int x = (i - y) / board->width;
            restore(board, x, y, route_type);
        }
    }
}

void destory_repeater_by(RelatiBoard_t *board) {
    for (int i = 0; i < board->length; i++) {
        RelatiGrid_t *grid = &board->grids[i];
        *grid LOST RELATI_REPEATER;
    }
}

#endif