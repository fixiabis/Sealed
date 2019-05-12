import { RelatiPlayer } from "./RelatiPlayer";
import { RelatiBoard } from "./RelatiBoard";
import { RelatiRole, RelatiRoleInfo } from "./RelatiRole";
import { RelatiSkill } from "./RelatiSkill";
export interface RelatGame {
    do(type: "role-create", role: RelatiRole): Promise<void>;
    do(type: "role-update", role: RelatiRole, info: RelatiRoleInfo): Promise<void>;
    do(type: "role-delete", role: RelatiRole): Promise<void>;
    do(type: "role-leader", role: RelatiRole): Promise<void>;
    do(type: "next-player"): Promise<void>;
}
export declare class RelatiGame {
    board: RelatiBoard;
    turn: number;
    players: RelatiPlayer[];
    eventPrevented: boolean;
    private listeners;
    constructor(board: RelatiBoard, playerNames: string[]);
    readonly playerCount: number;
    readonly playerNow: RelatiPlayer;
    on(type: RelatiGameEventType, owner: RelatiRole, skill: RelatiSkill<RelatiGameEventState>): void;
    do(type: RelatiGameEventType, role?: RelatiRole, info?: RelatiRoleInfo): Promise<{}>;
}
export interface RelatiGameState {
    game: RelatiGame;
    role: RelatiRole;
}
export declare type RelatiGameEventType = ("grid-select" | "role-create" | "role-update" | "role-delete" | "role-leader" | "next-player");
export interface RelatiGameEvent {
    owner: RelatiRole;
    skill: RelatiSkill<RelatiGameEventState>;
}
export interface RelatiGameEventState {
    game: RelatiGame;
    role?: RelatiRole;
    info?: RelatiRoleInfo;
    owner: RelatiRole;
}
