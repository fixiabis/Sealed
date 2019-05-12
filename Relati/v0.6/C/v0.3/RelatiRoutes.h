#ifndef __RELATI_ROUTES__
#define __RELATI_ROUTES__

#include "./GridBoard.h"
#include "./RelatiBoard.h"
#include "./RelatiDebug.h"

/* 一般 Relati 的路徑 */
static const int NORMAL_RELATI_ROUTES[8] = {
    GRID_DRCT_F,
    GRID_DRCT_B,
    GRID_DRCT_R,
    GRID_DRCT_L,
    GRID_DRCT_FR,
    GRID_DRCT_FL,
    GRID_DRCT_BR,
    GRID_DRCT_BL};

/* 遠程一般 Relati 的路徑 */
static const int REMOTE_NORMAL_RELATI_ROUTES[8][2] = {
    {GRID_DRCT_2F, GRID_DRCT_F},
    {GRID_DRCT_2B, GRID_DRCT_B},
    {GRID_DRCT_2R, GRID_DRCT_R},
    {GRID_DRCT_2L, GRID_DRCT_L},
    {GRID_DRCT_2FR, GRID_DRCT_FR},
    {GRID_DRCT_2FL, GRID_DRCT_FL},
    {GRID_DRCT_2BR, GRID_DRCT_BR},
    {GRID_DRCT_2BL, GRID_DRCT_BL}};

/* 遠程穩定 Relati 的路徑 */
static const int REMOTE_STABLE_RELATI_ROUTES[24][3] = {
    {GRID_DRCT_FFR, GRID_DRCT_2F, GRID_DRCT_F},
    {GRID_DRCT_FFR, GRID_DRCT_FR, GRID_DRCT_F},
    {GRID_DRCT_FFR, GRID_DRCT_FR, GRID_DRCT_R},
    {GRID_DRCT_FFL, GRID_DRCT_2F, GRID_DRCT_F},
    {GRID_DRCT_FFL, GRID_DRCT_FL, GRID_DRCT_F},
    {GRID_DRCT_FFL, GRID_DRCT_FL, GRID_DRCT_L},
    {GRID_DRCT_BBR, GRID_DRCT_2B, GRID_DRCT_B},
    {GRID_DRCT_BBR, GRID_DRCT_BR, GRID_DRCT_B},
    {GRID_DRCT_BBR, GRID_DRCT_BR, GRID_DRCT_R},
    {GRID_DRCT_BBL, GRID_DRCT_2B, GRID_DRCT_B},
    {GRID_DRCT_BBL, GRID_DRCT_BL, GRID_DRCT_B},
    {GRID_DRCT_BBL, GRID_DRCT_BL, GRID_DRCT_L},
    {GRID_DRCT_FRR, GRID_DRCT_FR, GRID_DRCT_F},
    {GRID_DRCT_FRR, GRID_DRCT_2R, GRID_DRCT_R},
    {GRID_DRCT_FRR, GRID_DRCT_FR, GRID_DRCT_R},
    {GRID_DRCT_FLL, GRID_DRCT_FL, GRID_DRCT_F},
    {GRID_DRCT_FLL, GRID_DRCT_2L, GRID_DRCT_L},
    {GRID_DRCT_FLL, GRID_DRCT_FL, GRID_DRCT_L},
    {GRID_DRCT_BRR, GRID_DRCT_BR, GRID_DRCT_B},
    {GRID_DRCT_BRR, GRID_DRCT_2R, GRID_DRCT_R},
    {GRID_DRCT_BRR, GRID_DRCT_BR, GRID_DRCT_R},
    {GRID_DRCT_BLL, GRID_DRCT_BL, GRID_DRCT_B},
    {GRID_DRCT_BLL, GRID_DRCT_2L, GRID_DRCT_L},
    {GRID_DRCT_BLL, GRID_DRCT_BL, GRID_DRCT_L}};

/* 可連線的符號的模式 */
#define BY_NORMAL_RELATI 0
#define BY_COMMON_RELATI 1

/* 取得可連線的符號 */
RelatiGrid_t **getRelatiRoutes(RelatiGrid_t *grid, int status, int routeType)
{
    RelatiGrid_t **relatiableGrids = (RelatiGrid_t **)malloc(sizeof(RelatiGrid_t *) * grid->board->length);
    memset(relatiableGrids, 0, sizeof(RelatiGrid_t *) * grid->board->length);
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

    switch (routeType)
    {
    case BY_COMMON_RELATI:
        printf("\n    in remote stable routes\n");

        for (int i = 0; i < 24; i++)
        {
            RelatiGrid_t *targetGrid = getGridBy(GRID_DRCT_MODE, grid, REMOTE_STABLE_RELATI_ROUTES[i][0]);
            RelatiGrid_t *middleGrid1 = getGridBy(GRID_DRCT_MODE, grid, REMOTE_STABLE_RELATI_ROUTES[i][1]);
            RelatiGrid_t *middleGrid2 = getGridBy(GRID_DRCT_MODE, grid, REMOTE_STABLE_RELATI_ROUTES[i][2]);

            printf("    ");
            printDrct(REMOTE_STABLE_RELATI_ROUTES[i][0]);
            printf(" ");
            printDrct(REMOTE_STABLE_RELATI_ROUTES[i][1]);
            printf(" ");
            printDrct(REMOTE_STABLE_RELATI_ROUTES[i][2]);

            if (!targetGrid || !middleGrid1 || !middleGrid2)
            {
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

            if ((targetGrid IS(status)) == status && middleGrid1 IS_SPACE && middleGrid2 IS_SPACE)
            {
                printf(" is relatiable");
                printf(" %d %d", targetGrid->body, status);
                relatiableGrids[relatiableGridsLength++] = targetGrid;
            }

            printf("\n");
        }

        printf("\n    in remote normal routes\n");

        for (int i = 0; i < 8; i++)
        {
            RelatiGrid_t *targetGrid = getGridBy(GRID_DRCT_MODE, grid, REMOTE_NORMAL_RELATI_ROUTES[i][0]);
            RelatiGrid_t *middleGrid = getGridBy(GRID_DRCT_MODE, grid, REMOTE_NORMAL_RELATI_ROUTES[i][1]);

            printf("    ");
            printDrct(REMOTE_NORMAL_RELATI_ROUTES[i][0]);
            printf(" ");
            printDrct(REMOTE_NORMAL_RELATI_ROUTES[i][1]);

            if (!targetGrid || !middleGrid)
            {
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

            if ((targetGrid IS(status)) == status && middleGrid IS_SPACE)
            {
                printf(" is relatiable");
                printf(" %d %d", targetGrid->body, status);
                relatiableGrids[relatiableGridsLength++] = targetGrid;
            }

            printf("\n");
        }

    case BY_NORMAL_RELATI:

        printf("\n    in normal routes\n");

        for (int i = 0; i < 8; i++)
        {
            RelatiGrid_t *targetGrid = getGridBy(GRID_DRCT_MODE, grid, NORMAL_RELATI_ROUTES[i]);

            printf("    ");
            printDrct(NORMAL_RELATI_ROUTES[i]);

            if (targetGrid == NULL)
            {
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

            if ((targetGrid IS(status)) == status)
            {
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

#endif