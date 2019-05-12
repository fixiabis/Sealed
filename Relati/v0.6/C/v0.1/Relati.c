#include "RelatiBoard.h"

int main() {
    printf("Welcome to Relati!\n");

    int board_size = 9;

    while (board_size < 5 || board_size > 15) {
        printf("Input Board size:");
        scanf(" %d", &board_size);
    }

    int turn = 0;
    int route_type = board_size == 5 ? BY_NORMAL_RELATI : BY_COMMON_RELATI;
    RelatiBoard_t *board = new_RelatiBoard(board_size, board_size);
    RelatiGrid_t *grid;
    char x = 0;
    int y = 0;

    // -- test start

    turn = 2;

    grid = get_grid_by(board, 4, 4, RELATI_DIRECTION_C);
    *grid SYMBOL_IS RELATI_SYMBOL_O;
    *grid GAIN RELATI_LAUNCHER;
    *grid GAIN RELATI_REPEATER;

    grid = get_grid_by(board, 5, 4, RELATI_DIRECTION_C);
    *grid SYMBOL_IS RELATI_SYMBOL_X;
    *grid GAIN RELATI_LAUNCHER;
    *grid GAIN RELATI_REPEATER;

    // -- test end

    print_grid_by(board);

    while (true) {
        printf("Input Coordinate:");
        scanf(" %c%d", &x, &y);

        x -= x > 96 ? 97 : 65;
        y--;

        grid = get_grid_by(board, x, y, RELATI_DIRECTION_C);

        if (grid == NULL) {
            printf("can't locate to grid: %c%d\n", x + 65, y + 1);
            continue;
        }

        if (*grid IS_SPACE) {
            if (turn < 2) {
                *grid GAIN RELATI_LAUNCHER;
            } else if (get_relatiable_grid_indexes_by(
                board, x, y,
                (turn % 2) + 1,
                RELATI_REPEATER,
                route_type
            )[0] != -1) {
                *grid GAIN RELATI_RECEIVER;
            } else {
                printf("can't relati to grid: %c%d,\n", x + 65, y + 1);
                printf("because grid can't relati with other owned grid.\n");
                continue;
            }

            *grid SYMBOL_IS (turn % 2) + 1;
            turn++;
        } else {
            printf("can't relati to grid: %c%d,\n", x + 65, y + 1);
            printf("because grid is not space.\n");
            continue;
        }
        
        destory_repeater_by(board);
        restore_repeater_by(board, route_type);
        print_grid_by(board);
    }

    delete_RelatiBoard(board);
    return 0;
}