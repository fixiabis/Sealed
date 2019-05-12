import { RelatiGame } from "../RelatiGame";
import { RelatiGrid } from "../RelatiBoard";
export declare class RelatiBoardView {
    game: RelatiGame;
    gridSize: number;
    width: number;
    height: number;
    layers: SVGGElement[];
    container: SVGSVGElement;
    background: SVGGElement;
    gridRenderers: RelatiGridRenderer[];
    boardRenderers: RelatiBoardRenderer[];
    constructor(game: RelatiGame, gridSize: number);
    render(): void;
}
export interface RelatiGridRenderer {
    render(grid: RelatiGrid, gridSize: number): SVGElement | undefined;
}
export interface RelatiBoardRenderer {
    boardView: RelatiBoardView;
    render(): void;
}
