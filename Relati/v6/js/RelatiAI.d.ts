import { RelatiBoard } from "./RelatiBoard";
export declare class RelatiAI {
    analysis(board: BinaryBoard, owner: number): {
        ownerPoint: number;
        otherPoint: number;
    };
    syncTraceStep(board: BinaryBoard, owner: number, other: number, level: number, route?: number[], isOwn?: boolean, inOwn?: RelatiAIStep, inOth?: RelatiAIStep): RelatiAIStep;
    getGridCoor(idx: number, board: BinaryBoard): string;
}
export interface RelatiAIStep {
    idx?: number;
    in: number;
    point: number;
    route: number[];
    steps?: RelatiAIStep[];
}
export declare class BinaryBoard extends Int8Array {
    width: number;
    height: number;
    constructor(board: RelatiBoard | BinaryBoard);
    getCoor(i: number): number[];
    getIdx(x: number, y: number): number;
    getGrid(x: number, y: number): number;
}
