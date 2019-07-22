import { RelatiGrid } from "./RelatiBoard";
import { RelatiGame } from "./RelatiGame";

export type RelatiSymbol = "" | "O" | "X";
export type RelatiStatus = (
    "relati-launcher" | "relati-repeater" | "relati-receiver" | "effect-activate"
);

export interface RelatiRule {
    allow?(...state: any[]): boolean;
    trace?(...state: any[]): any[];
    state?(...state: any[]): number;
}

export interface RelatiAction {
    do(grid: RelatiGrid, game: RelatiGame, ...state: any[]): boolean | Promise<boolean>;
}

export interface RelatiEffect {
    do(game: RelatiGame, ...state: any[]): void;
}

export let AllRelatiStatus: RelatiStatus[] = [
    "relati-launcher", "relati-repeater", "relati-receiver", "effect-activate"
];