/// <reference path="./global.d.ts" />

import { RelatiBoard, RelatiGrid } from "./RelatiBoard";
import { RelatiRole } from "./RelatiRole";
import { RelatiSkill } from "./RelatiSkill";
import { RelatiPlayer, RelatiCard } from "./RelatiPlayer";

import { RoleEffect } from "./skills/RoleEffect";
import { RoleInfoUpdate } from "./skills/RoleInfoUpdate";
import { RolePlacement } from "./skills/RolePlacement";
import { Judgement } from "./rules/Judgement";

export type RelatiGameStep = {
    turn: RelatiGame["turn"],
} & ({
    grid: RelatiGrid
} | {
    card: RelatiCard
} | {
    role: RelatiRole,
    skill: RelatiSkill
});

export type RelatiGameState = {
    game: RelatiGame
    grid?: RelatiGrid;
    card?: RelatiCard;
    role?: RelatiRole;
    skill?: RelatiSkill;
};

export class RelatiGame {
    public turn = 0;
    public steps: RelatiGameStep[] = [];
    public result?: string;
    public gridSelected: boolean = false;
    public cardSelected: boolean = false;
    public skillSelected: boolean = false;
    public skillAllowed: boolean = false;

    constructor(
        public board: RelatiBoard,
        public players: RelatiPlayer[]
    ) { }

    addPlayer(player: RelatiPlayer) {
        this.players.push(player);
    }

    get playerCount() { return this.players.length; }
    get nowPlayer() { return this.players[this.turn % this.playerCount]; }
    get allPlayerReady() { return this.turn >= this.playerCount; }

    async start() {
        var game = this;

        for (var player of game.players) {
            player.game = game;
            player.shuffle();
            player.draw(5);
        }

        while (!game.result) {
            var { nowPlayer: player, allPlayerReady } = game;
            player.draw();

            if (!Judgement.allow({ game })) {
                game.turn++;

                if (!Judgement.allow({ game })) game.result = "Relati";
                else game.result = game.nowPlayer.name + " Win";

                break;
            }

            do {
                var grid = await new Promise<RelatiGrid>(
                    select => player.gridSelect = select
                );

                game.gridSelected = grid != undefined;

                if (grid) {
                    RoleEffect.do({ game, grid });
                    RoleInfoUpdate.do({ game });

                    if (grid.role && grid.role.owner != player) {
                        game.gridSelected = false;
                    }
                }
            } while (!game.gridSelected);

            if (grid.role) do {
                var skill = await new Promise<maybeExists<RelatiSkill>>(
                    select => player.skillSelect = select
                );
                var { role } = grid;

                game.skillSelected = skill != undefined;

                if (skill) {
                    RoleEffect.do({ game, role, skill });
                    RoleInfoUpdate.do({ game });
                }
            } while (!game.skillSelected) else do {
                var card = await new Promise<maybeExists<RelatiCard>>(
                    select => player.cardSelect = select
                );

                game.cardSelected = card != undefined;

                if (card) {
                    RoleEffect.do({ game, card });
                    RoleInfoUpdate.do({ game });

                    if (!allPlayerReady) {
                        if (card.leader) card = card.leader;
                        else game.cardSelected = false;
                    }
                }
            } while (!game.cardSelected);

            if (card) {
                var role = new RelatiRole(grid, player, card);
                skill = RolePlacement;
            }

            if (skill) await game.execute(skill, role);

            if (!allPlayerReady) player.leader = role;
        }
    }

    async execute(skill: RelatiSkill, role: RelatiRole) {
        if (this.nowPlayer != role.owner) return;

        var game = this;
        game.skillAllowed = true;
        await RoleEffect.do({ game, role, skill });
        await RoleInfoUpdate.do({ game });

        if (game.skillAllowed) {
            await skill.do({ game, role });
        }
    }
}