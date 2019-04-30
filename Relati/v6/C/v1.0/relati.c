#include <stdio.h>
#include <stddef.h>
#include <stdbool.h>
#include "./RelatiBoard.h"
#include "./RelatiRoutes.h"
#include "./RelatiAction.h"

int main()
{
    printf("Welcome to Relati!\n");

    char *userInput = (char *)malloc(sizeof(char) * 4);
    int boardSize = 0;

    while (boardSize < 5 || boardSize > 15 || boardSize % 2 == 0)
    {
        printf("Board Size:");
        scanf(" %s", userInput);
        boardSize = atoi(userInput);
    }

    int turn = 0;
    int routeType = boardSize == 5 ? BY_NORMAL_RELATI : BY_COMMON_RELATI;
    RelatiBoard_t *board = new_RelatiBoard(boardSize, boardSize);
    RelatiGrid_t *grid;
    char *gameResult = (char *)malloc(sizeof(char) * 6);
    int symbol;

    printf("\n");
    printGridsBy(board);
    printf("\n");

    while (true)
    {
        printf("Turn%d:", turn + 1);
        scanf(" %s", userInput);
        grid = getGridBy(GRID_COOR_MODE, board, userInput);
        symbol = turn % 2 + 1;

        if (grid == NULL)
        {
            printf("can't locate to grid: %s\n", userInput);
            continue;
        }

        if (grid IS_SPACE)
        {
            if (turn < 2)
            {
                grid GAIN(RELATI_LAUNCHER);
            }
            else if (hasRelatiRoutesBy(grid, symbol HAS RELATI_REPEATER, routeType))
            {
                grid GAIN(RELATI_RECEIVER);
            }
            else
            {
                printf("can't relati to grid: %s\n", userInput);
                continue;
            }

            grid GAIN(symbol);
            turn++;
        }
        else
        {
            printf("can't relati to grid: %s\n", userInput);
            continue;
        }

        destoryRepeaterBy(board);
        restoreRepeaterBy(board, routeType);
        printf("\n");
        printGridsBy(board);
        printf("\n");

        if (turn > 2)
        {
            bool allHasNoStep = true;
            bool OHasStep = false;
            bool XHasStep = false;

            for (int symbol = 1; symbol < 3; symbol++)
                for (int i = 0; i < board->length; i++)
                {
                    if (!board->grids[i]->body)
                    {
                        if (getRelatiRoutesBy(
                                board->grids[i],
                                symbol HAS RELATI_REPEATER,
                                routeType)[0])
                        {
                            allHasNoStep = false;
                            if (symbol == RELATI_SYMBOL_O)
                                OHasStep = true;
                            else
                                XHasStep = true;
                            break;
                        }
                    }
                }

            if (allHasNoStep)
            {
                strcpy(gameResult, "Draw");
                goto gameOver;
            }
            else if (!OHasStep)
            {
                strcpy(gameResult, "X Win");
                goto gameOver;
            }
            else if (!XHasStep)
            {
                strcpy(gameResult, "O Win");
                goto gameOver;
            }
        }
    }

gameOver:
    printf("%s\n", gameResult);
    delete_RelatiBoard(board);
    free(userInput);
    return 0;
}