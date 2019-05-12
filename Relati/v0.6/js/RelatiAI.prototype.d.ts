import { RelatiBoard } from "./RelatiBoard";
import { RelatiPlayer } from "./RelatiPlayer";
import { RelatiRoleConstructor } from "./RelatiRole";
import { RelatiGame } from "./RelatiGame";
export declare class RelatiAI {
    game: RelatiGame;
    RoleConstructors: RelatiRoleConstructor[];
    constructor(game: RelatiGame, RoleConstructors: RelatiRoleConstructor[]);
    analysis(board: RelatiBoard, owner: RelatiPlayer): {
        ownerPoint: number;
        otherPoint: number;
    };
    cloneBoard(board: RelatiBoard): RelatiBoard;
    printBoard(board: RelatiBoard, type?: "node-console" | "dev-console"): void;
    traceStep(board: RelatiBoard, owner: RelatiPlayer, other: RelatiPlayer, level: number, route?: string[], isOwn?: boolean, inOwn?: RelatiAIStep, inOth?: RelatiAIStep): Promise<RelatiAIStep>;
}
export interface RelatiAIStep {
    coor?: string;
    title: string;
    point: number;
    route: string[];
    steps?: RelatiAIStep[];
}
