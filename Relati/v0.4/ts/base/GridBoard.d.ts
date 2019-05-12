/**
 * @overview 可供查詢的棋盤與棋盤格
 * @author fixiabis <fixiabis@github.com>
 * @version 1.1
 */
/** 棋盤格查詢暫存器 */
declare class GridQueryCache {
    /** 查詢結果暫存(單數) */
    protected _queryCache: {
        [command: string]: Grid;
    };
    /** 查詢結果暫存(複數) */
    protected _queriesCache: {
        [command: string]: Grid[];
    };
    /** 暫存查詢結果(單數) */
    protected _cacheQueryResult(command: string, result: Grid): Grid;
    /** 暫存查詢結果(複數) */
    protected _cacheQueriesResult(commmands: string, results: Grid[]): Grid[];
}
/** 棋盤格 */
export declare class Grid extends GridQueryCache {
    readonly board: GridBoard;
    readonly x: number;
    readonly y: number;
    /** 座標(英數) */
    coordinate: string;
    /** 複數查詢簡化語法 */
    static readonly simplifyDirectionList: RegExp[];
    /** 複數查詢簡化語法對應 */
    static readonly originalDirectionLists: string[][];
    /**
     * 建立棋盤格，並設置座標
     * @param board 所屬棋盤
     * @param x 數學X座標
     * @param y 數學Y座標
     */
    constructor(board: GridBoard, x: number, y: number);
    /**
     * 使用相對座標進行棋盤格查詢，查詢後暫存，
     * 若下次有相同查詢請求時將直接返回查詢結果
     * 相對座標格式:
     *     "F" = (y - 1)
     *     "B" = (y + 1)
     *     "R" = (x + 1)
     *     "L" = (x - 1)
     * @param directionCommand 相對座標指令(單數)
     *
     * @example
     * // 一般:取得前方(y - 1)的棋盤格
     * query("F");
     * // 一般:取得前方(y - 2)兩單位的棋盤格
     * query("FF");
     *
     * @example
     * // 單位:取得後方二單位(x - 2)的棋盤格
     * query("2B");
     *
     * @example
     * // 多向:取得左前方(x - 1, y - 1)的棋盤格
     * query("FL");
     *
     * @example
     * // 反向:取得右後方反向(x + -1, y + -1)的棋盤格(即左前方)
     * query("-BR");
     */
    query(directionCommand: string): Grid;
    /**
     * 使用相對座標進行棋盤格查詢，查詢後暫存，
     * 若下次有相同查詢請求時將直接返回查詢結果
     * 相對座標格式擴充:
     *     "," 分隔多個相對座標
     *     "I" = F,B
     *     "H" = R,L
     *     "T" = I,H
     *     "X" = IH
     *     "O" = T,X
     *     ";" 分隔多個相對座標指令
     * @param directionCommands 相對座標指令(複數)
     *
     * @example
     * // 一般:取得前方(y - 1)與後方(y + 1)的棋盤格
     * queries("F,B");
     *
     * @example
     * // 簡寫:取得前方(y - 1)與後方(y + 1)的棋盤格
     * queries("I");
     * // 簡寫:取得左方(x - 1)與右方(x + 1)的棋盤格
     * queries("H");
     * // 簡寫:取得四方
     * // 四方:前(y - 1), 後(y + 1), 左(x - 1), 右(x + 1)
     * queries("T");
     * // 簡寫:取得斜四方的棋盤格
     * // 斜四方:右前(x + 1, y - 1), 左前(x - 1, y - 1), 右後(x + 1, y + 1), 左後(x - 1, y + 1)
     * queries("X");
     * // 簡寫: 取得八方的棋盤格
     * // 八方: 四方與斜四方
     * queries("O");
     *
     * @example
     * // 多向簡寫:取得右前方(x + 1, y - 1)與右後方(x + 1, y + 1)的棋盤格
     * queries("IR");
     * // 多向簡寫:取得前一單位的斜四方的棋盤格
     * queries("FX");
     *
     * @example
     * // 指令分離:取得前後方與左右方
     * queries("I;H");
     *
     * // 一般查詢與指令分離的差異
     * // 一般查詢時，會將所有簡寫皆轉換為對應，再開始查詢
     * // 指令分離查詢，會先將指令分離，再開始進行一般查詢
     *
     * // 一般查詢過程:
     * //         I,H
     * //       /     \
     * //    F,H       B,H
     * //   /   \     /   \
     * // F,R   F,L B,R   B,L => F,R,F,L,B,R,B,L
     *
     * // 指令分離查詢過程
     * //     I;H
     * //    /   \
     * //   I     H
     * //  / \   / \
     * // F   B R   L => F,B,R,L
     *
     * @example
     * // 範圍:取得前方從一至三單位
     * queries("~3F");
     * // 範圍:取得前方從二至四單位
     * queries("2~4F");
     * // 範圍:取得前方從四至二單位
     * queries("4~2F");
     * // 範圍:取得前方從三至一單位
     * queries("3~F");
     */
    queries(directionCommands: string): Grid[];
}
/** 棋盤 */
export declare class GridBoard extends GridQueryCache {
    readonly width: number;
    readonly height: number;
    /** 棋盤格(二維陣列) */
    readonly grids: Grid[][];
    /** 棋盤格(一維陣列) */
    readonly gridList: Grid[];
    /**
     * 建立棋盤，並依照所給的寬度與長度建立指定數量的棋盤格
     * @param width 棋盤格寬度
     * @param height 棋盤格長度
     */
    constructor(width: number, height: number);
    /**
     * 使用絕對座標進行棋盤格查詢，查詢後暫存，
     * 若下次有相同查詢請求時將直接返回查詢結果
     * 絕對座標格式: x, y 皆從0開始，x為英文字母，從A開始，y為數字，從1開始
     * @param coordinateCommand 絕對座標指令(單數)
     *
     * @example
     * // 一般:取得位於左上角(x = 0, y = 0)的格子
     * query("A1");
     * // 一般:取得位於(x = 4, y = 2)的格子
     * query("E3");
     */
    query(coordinateCommand: string): Grid;
    /**
     * 使用絕對座標進行棋盤格查詢，查詢後暫存，
     * 若下次有相同查詢請求時將直接返回查詢結果
     * 絕對座標格式擴充:
     *     "," 分隔多個絕對座標與絕對座標指令
     *     ":" 從前者到後者之間的所有座標
     * @param coordinateCommands 絕對座標指令(複數)
     *
     * @example
     * // 一般:取得A1與D4
     * queries("A1,D4");
     *
     * @example
     * // 單一範圍:取得A列
     * queries("A");
     * // 單一範圍:取得5行
     * queries("5");
     *
     * @example
     * // 複合範圍:取得A列至5行
     * queries("A1:5");
     * // 複合範圍:取得5行至B列
     * queries("A:B5");
     * // 複合範圍:取得A4到B5間的矩型
     * queries("A4:B5");
     *
     * // 複合範圍是具有方向性的，
     * // 雖與上面範例取得的格子皆一樣，但是順序不同
     * queries("A5:B4");
     */
    queries(coordinateCommands: string): Grid[];
}
export {};
