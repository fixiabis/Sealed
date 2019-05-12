#ifndef __RELATI_DEBUG__
#define __RELATI_DEBUG__

#include <stdio.h>
#include "./RelatiBoard.h"

/* 印出符號 */
void printSymbol(int symbol)
{
    switch (symbol & 0b00000111)
    {
    case RELATI_SYMBOL_O:
        printf("\x1b[31mO\x1b[0m");
        break;
    case RELATI_SYMBOL_X:
        printf("\x1b[34mX\x1b[0m");
        break;
    case RELATI_SYMBOL_D:
        printf("\x1b[33mD\x1b[0m");
        break;
    case RELATI_SYMBOL_R:
        printf("\x1b[32mR\x1b[0m");
        break;
    case RELATI_SYMBOL_A:
        printf("\x1b[35mA\x1b[0m");
        break;
    default:
        printf(" ");
    }
}

/* 印出狀態 */
void printStatus(int status)
{
    if (status & RELATI_LAUNCHER)
        printf("source");
    else if (status & RELATI_REPEATER)
        printf("normal");
    else if (status & RELATI_RECEIVER)
        printf("frozen");
    else
        printf("      ");
}

/* 印出方向 */
void printDrct(int d)
{
    int F = (0xF000 & d) >> 12;
    int B = (0x0F00 & d) >> 8;
    int R = (0x00F0 & d) >> 4;
    int L = (0x000F & d);

    if (F)
        for (int i = 0; i < F; i++)
            printf("F");
    if (B)
        for (int i = 0; i < B; i++)
            printf("B");
    if (R)
        for (int i = 0; i < R; i++)
            printf("R");
    if (L)
        for (int i = 0; i < L; i++)
            printf("L");
}

/* 印出座標 */
void printCoor(int x, int y)
{
    printf("%c%d", x + 65, y + 1);
}

#endif