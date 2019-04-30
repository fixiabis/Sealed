#include "./RelatiBoard.h"
#include "./RelatiAction.h"

int main() {
    printf("Welcome to Relati!\n");

    char* userInput = (char*) malloc(sizeof(char) * 3);
    int boardSize = 0;

    while (boardSize < 5 || boardSize > 15) {
        printf("Board Size:");
        scanf(" %s", userInput);
        boardSize = atoi(userInput);
    }

    int turn = 0;
    int routeType = boardSize == 5 ? BY_NORMAL_RELATI : BY_COMMON_RELATI;
    RelatiBoard_t *board = new_RelatiBoard(boardSize, boardSize);
    RelatiGrid_t *grid;
    int symbol;

    printf("\n");
    printGridsBy(board);
    printf("\n");

    while (true) {
        printf("Turn%d:", turn + 1);
        scanf(" %s", userInput);
        grid = getGridBy(RELATI_COOR_MODE, board, userInput);
        symbol = turn % 2 + 1;

        if (grid == NULL) {
            printf("can't locate to grid: %s\n", userInput);
            continue;
        }

        if (grid IS_SPACE) {
            printf("\ntarget founded: %s\n", userInput);

            if (turn < 2) {
                grid GAIN(RELATI_LAUNCHER);
            } else if (getRelatiableGridsBy(grid, symbol HAS RELATI_REPEATER, routeType)[0]) {
                grid GAIN(RELATI_RECEIVER);
            } else {
                printf("can't relati to grid: %s\n", userInput);
                continue;
            }

            grid GAIN((turn % 2) + 1);
            turn++;
        } else {
            printf("can't relati to grid: %s\n", userInput);
            continue;
        }

        destoryRepeaterBy(board);
        restoreRepeaterBy(board, routeType);
        printf("\n");
        printGridsBy(board);
        printf("\n");
    }

    delete_RelatiBoard(board);
    free(userInput);
    return 0;
}