import { RelatiRole } from "./RelatiRole";
import { RelatiSkill } from "./RelatiSkill";
import { RelatiBoard, RelatiGrid } from "./RelatiBoard";
import { RelatiPlayer, RelatiCard, RelatiPlayerHasLeader } from "./RelatiPlayer";
import { RoleEffect } from "./skills/RoleEffect";
import { RoleInfoUpdate } from "./skills/RoleInfoUpdate";
import { RolePlacement } from "./skills/RolePlacement";
import { Judgement } from "./rules/Judgement";

export type RelatiGameResult = "O Win" | "X Win" | "Relati";

export interface RelatiGameState {
    game: RelatiGame;
    card?: RelatiCard;
    role?: RelatiRole;
    grid?: RelatiGrid;
    skill?: RelatiSkill;
}

export interface RelatiGameStep {
    turn: RelatiGame["turn"];
    role: RelatiRole;
    skill: RelatiSkill;
}

export class RelatiGame {
    public turn = 0;
    public steps: RelatiGameStep[] = [];
    public result?: RelatiGameResult;

    constructor(
        public board: RelatiBoard,
        public players: RelatiPlayer[] = []
    ) { }

    async start() {
        var game = this;

        for (var player of game.players) {
            player.game = game;
            player.shuffle();
            player.draw(5);
        }

        while (!game.result) {
            var player = game.nowPlayer;
            player.draw();

            if (!Judgement.allow({ game })) {
                game.turn++;

                if (!Judgement.allow({ game })) game.result = "Relati";
                else game.result = (
                    game.nowPlayer.badge + " Win"
                ) as RelatiGameResult;

                break;
            }

            var grid = await new Promise<RelatiGrid>(
                select => player.gridSelect = select
            );

            await RoleEffect.do({ game, grid });
            await RoleInfoUpdate.do({ game });

            if (grid.role && grid.role.owner == player) {
                var { role } = grid;
                var skill = await new Promise<maybeExists<RelatiSkill>>(
                    select => player.skillSelect = select
                );

                await RoleEffect.do({ game, role, skill });
                await RoleInfoUpdate.do({ game });

                if (!skill || skill.type != "action") continue;
                await game.execute(skill, grid.role);
                continue;
            }

            var card = await new Promise<maybeExists<RelatiCard>>(
                select => player.cardSelect = select
            );

            await RoleEffect.do({ game, card });
            await RoleInfoUpdate.do({ game });

            if (!card) continue;

            var allPlayerReady = game.turn >= game.playerCount;

            if (!allPlayerReady) {
                if (!card.leader) continue;
                card = card.leader;
            }

            var role = new RelatiRole(grid, player, card);
            await game.execute(RolePlacement, role);

            if (allPlayerReady) {
                if (grid.role == role) {
                    (
                        player as RelatiPlayerHasLeader
                    ).leader.points["summon-assets"] -= card.points["summon-cost"];
                }
            } else player.leader = role;
        }
    }

    get playerCount() { return this.players.length; }

    get nowPlayer() {
        return this.players[this.turn % this.playerCount];
    }

    addPlayer(player: RelatiPlayer) { this.players.push(player); }

    async execute(skill: RelatiSkill, role: RelatiRole) {
        var game = this;
        if (game.nowPlayer != role.owner) return;

        var { turn } = game;
        await skill.do({ game, role });
        game.steps.push({ turn, role, skill });

        await RoleEffect.do({ game });
        await RoleInfoUpdate.do({ game });
    }
}