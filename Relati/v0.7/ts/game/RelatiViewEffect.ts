import { createSVG } from "./RelatiView";
import { RelatiGrid, RELATI_LAUNCHER, RELATI_RECEIVER } from "../core/RelatiBoard";
import { RelatiGame } from "../main/RelatiGame";
import { getRelatiTracesBy } from "../core/RelatiRoutes";

const RELATI_VISITIED = 0b10000000;
const SYMBOL_COLOR = ["#666", "crimson", "royalblue"];

let dotAttr = {
    "cx": "",
    "cy": "",
    "r": "0.5",
    "fill": ""
};

function createDot(color: string, x: number, y: number) {
    dotAttr["cx"] = `${x * 5 + 2.5}`;
    dotAttr["cy"] = `${y * 5 + 2.5}`;
    dotAttr["fill"] = color;
    return createSVG("circle", dotAttr);
}

export function createHint(grids: RelatiGrid[], symbol: number, view: SVGElement) {
    let color = SYMBOL_COLOR[symbol];
    for (let { x, y } of grids) {
        view.appendChild(createDot(color, x, y));
    }
}

let lineAttr = {
    "d": "",
    "stroke-width": "0.5",
    "stroke": "",
    "fill": "none",
    "class": "relati-effect-line"
};

function createLine(source: RelatiGrid, traces: RelatiGrid[], color: string, view: SVGElement) {
    lineAttr["d"] = `M ${source.x * 5 + 2.5} ${source.y * 5 + 2.5}`;
    lineAttr["stroke"] = color;

    for (let grid of traces) {
        lineAttr["d"] += ` L ${grid.x * 5 + 2.5} ${grid.y * 5 + 2.5}`;
    }

    var path = createSVG("path", lineAttr);
    view.appendChild(path);
}

export function createRelatiEffect(symbol: number, game: RelatiGame) {
    let { board, routeType, turn } = game;
    let color = SYMBOL_COLOR[symbol];

    for (let grid of board.grids) {
        grid.lost(RELATI_VISITIED);
    }

    for (let grid of board.grids) {
        if (grid.is(RELATI_LAUNCHER) && grid.symbol == symbol) {
            relatiEffect(grid, routeType, color, game, turn);
        }
    }
}

function relatiEffect(grid: RelatiGrid, routeType: number, color: string, game: RelatiGame, turn: number) {
    if (grid.is(RELATI_VISITIED) || game.turn > turn) return;
    grid.gain(RELATI_VISITIED);
    game.boardView.update();

    setTimeout(() => {
        if (game.turn > turn) return;
        let traces = getRelatiTracesBy(grid, grid.symbol | RELATI_RECEIVER, routeType);

        for (let grids of traces) {
            let targetGrid = grids[grids.length - 1];

            if (!targetGrid.is(RELATI_VISITIED)) {
                createLine(grid, grids, color, game.boardView.background);
                relatiEffect(targetGrid, routeType, color, game, turn);
            }
        }
    }, 250);
}