import { RelatiBoard, RelatiGrid } from "./RelatiBoard";
import { RelatiPlayer, RelatiCard } from "./RelatiPlayer";
import { RelatiRole } from "./RelatiRole";
import { RelatiSkill } from "./RelatiSkill";
import { GridBoard } from "./base/GridBoard";
import { RoleEffect } from "./skills/RoleEffect";
import { Judgement } from "./rules/Judgement";
import { RoleSummon } from "./skills/RoleSummon";

export type RelatiGameState = {
    game: RelatiGame,
    grid?: RelatiGrid,
    card?: RelatiCard,
    role?: RelatiRole,
    skill?: RelatiSkill
};

export type RelatiGameStep = (
    { grid: RelatiGrid } |
    { card: RelatiCard } |
    { role: RelatiRole, skill: RelatiSkill }
) & { turn: number };

export class RelatiGame {
    public turn = 0;
    public steps: RelatiGameStep[] = [];
    public board: RelatiBoard;
    public result?: string;
    public gridSelectable: boolean = false;
    public cardSelectable: boolean = false;
    public skillSelectable: boolean = false;
    public skillExecutable: boolean = false;

    constructor(
        public players: RelatiPlayer[] = [],
        size: number = 5
    ) { this.board = new GridBoard(size, size) as RelatiBoard; }

    async start() {
        var game = this;

        for (var player of game.players) {
            player.game = game;
            player.shuffle();
            player.draw(5);
        }

        while (!game.result) {
            var { nowPlayer: player } = game;
            player.draw();

            if (!Judgement.allow({ game })) {
                game.turn++;

                if (!Judgement.allow({ game })) game.result = "Draw";
                else game.result = game.nowPlayer.name + " Win";

                break;
            }

            game.gridSelectable = false;
            game.cardSelectable = false;
            game.skillSelectable = false;
            game.skillExecutable = false;

            await game.round(player);
        }
    }

    async round(player: RelatiPlayer) {
        var game = this;
        var { allPlayerReady } = this;

        var role: maybeExists<RelatiRole>;
        var grid: maybeExists<RelatiGrid>;
        var card: maybeExists<RelatiCard>;
        var skill: maybeExists<RelatiSkill>;

        do {
            grid = await new Promise<RelatiGrid>(select => player.gridSelect = select);
            game.gridSelectable = grid != undefined;
            if (game.gridSelectable) RoleEffect.do({ game, grid });
        } while (!game.gridSelectable);

        if (grid.role) {
            do {
                skill = await new Promise<RelatiSkill>(select => player.skillSelect = select);
                game.skillSelectable = skill != undefined;
                if (game.skillSelectable) RoleEffect.do({ game, role: grid.role, skill });
            } while (!game.skillSelectable);

            role = grid.role;
        } else {
            do {
                card = await new Promise<RelatiCard>(select => player.cardSelect = select);
                if (allPlayerReady && card) card = card.leader;
                game.cardSelectable = card != undefined;
                if (game.cardSelectable) RoleEffect.do({ game, card });
            } while (!game.cardSelectable);

            role = new RelatiRole(grid, player, card);
            skill = RoleSummon;
        }

        game.execute(skill, role);
    }

    addPlayer(player: RelatiPlayer) {
        this.players.push(player);
    }

    get playerCount() { return this.players.length; }
    get nowPlayer() { return this.players[this.turn % this.playerCount]; }
    get allPlayerReady() { return this.turn >= this.playerCount; }

    async execute(skill: RelatiSkill, role: RelatiRole) {
        if (this.nowPlayer != role.owner) return;
        await skill.do({ game: this, role });
        await RoleEffect.do({ game: this, role });
        this.turn++;
    }
}