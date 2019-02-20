import * as React from "react";

import {
    RelatiGame,
    RelatiGrid,
    RelatiRules,
    RelatiPlayer
} from "../../relati/Relati";

import { RelatiBadgeView } from "./RelatiBadgeView";
import { RelatiPathLine } from "./RelatiPathLine";
import { Color } from "csstype";

export interface RelatBoardViewProp {
    game: RelatiGame,
    gridSize: number
}

export class RelatiBoardView extends React.Component<RelatBoardViewProp> {
    public game: RelatiGame;
    public gridSize: number;
    public state: { [state: string]: any };
    public gameTurn = 0;
    public gridVisited: RelatiGrid[] = [];

    constructor(prop: RelatBoardViewProp) {
        super(prop);
        this.game = prop.game;
        this.gridSize = prop.gridSize;

        this.state = {
            background: [],
            gridList: this.game.board.gridList,
            gridLinePaths: []
        };

        var { board } = this.game;
        var { gridSize } = this;

        for (var x = 1; x < board.width; x++) {
            this.state.gridLinePaths.push(
                `M ${x * gridSize} 0 V ${board.height * gridSize}`
            );
        }

        for (var y = 1; y < board.height; y++) {
            this.state.gridLinePaths.push(
                `M 0 ${y * gridSize} H ${board.width * gridSize}`
            );
        }

        (window as any).comp = this;
    }

    private _onClick(reactEvent: React.MouseEvent) {
        var event = reactEvent.nativeEvent;
        var { board } = this.game;

        var x: number = Math.floor(event.offsetX / 5),
            y: number = Math.floor(event.offsetY / 5),
            grid = board.grids[x] && board.grids[x][y];

        this.game.selectGrid(grid);
        this.state.background = [];
        this.forceUpdate();

        setTimeout(function (this: RelatiBoardView) {
            this.createMaintainEffect();
        }.bind(this), 50);
    }

    createGridView(grid: RelatiGrid) {
        if (grid.role) return <RelatiBadgeView grid={grid} key={grid.coordinate} />;

        var { game } = this;
        var owner = game.getNowPlayer();
        var color = owner.badge == "O" ? "crimson" : "royalblue";

        var srtX = grid.x * 5 + 1;
        var srtY = grid.y * 5 + 1;
        var endX = grid.x * 5 + 4;
        var endY = grid.y * 5 + 4;

        if (RelatiRules.RelatiBySource.allow({ game, grid, owner })) {
            return (
                <g key={grid.coordinate}>
                    {React.createElement("path", {
                        "d": `
                            M ${srtX + 1.5} ${srtY + 1.5}
                            m 0 -0.4
                            a 0.4 0.4 0 0 1, 0 0.8
                            a 0.4 0.4 0 0 1, 0 -0.8
                        `,
                        "stroke": "none",
                        "fill": color
                    })}
                </g>
            );
        }
    }

    createMaintainEffect() {
        var { game } = this;
        var owner = game.players[(game.turn - 1) % game.players.length];
        var color = owner.badge == "O" ? "crimson" : "royalblue";

        this.gridVisited = [];

        for (var grid of game.board.gridList) {
            if (!grid.role || grid.role.owner != owner) continue;

            if (grid.role.status["relati-launcher"]) {
                this.createMaintainPath(grid, owner, game.turn, color);
            }
        }
    }

    createMaintainPath(
        grid: RelatiGrid,
        owner: RelatiPlayer,
        turn: number,
        color: Color,
        sourceGrid?: RelatiGrid
    ) {
        if (this.gridVisited.indexOf(grid) > -1 || turn < this.gameTurn) return;
        this.gridVisited.push(grid);
        this.gameTurn = turn;

        var ruleTraces = RelatiRules.RelatiToTarget.trace({ owner, grid });

        for (let trace of ruleTraces) {
            if (trace.target == sourceGrid) continue;
            this.state.background.push(
                <RelatiPathLine sourceGrid={grid} trace={trace} color={color} key={
                    `${grid.coordinate}-${trace.routes.map(
                        grid => grid.coordinate
                    ).join("-")}-${trace.target.coordinate}`
                } />
            );

            setTimeout(function (this: RelatiBoardView) {
                this.createMaintainPath(
                    trace.target,
                    owner,
                    turn,
                    color,
                    grid
                );
            }.bind(this), 250);
        }

        this.forceUpdate();
    }

    render() {
        return (
            <svg width="45" height="45" className="relati-board" onClick={this._onClick.bind(this)}>
                <g>{this.state.background}</g>
                <g>{this.state.gridLinePaths.map((path: string, i: number) => (
                    <path d={path} stroke="#888" strokeWidth="0.4" key={i}></path>
                ))}</g>
                <g>{this.state.gridList.map(function (this: RelatiBoardView, grid: RelatiGrid) {
                    return this.createGridView(grid);
                }.bind(this))}</g>
            </svg>
        );
    }
}