import { RelatiBoard, RelatiGrid } from "./RelatiBoard";
import { RelatiPlayer, RelatiCard } from "./RelatiPlayer";
import { RelatiRole } from "./RelatiRole";
import { RelatiSkill } from "./RelatiSkill";
import { RoleEffect } from "./skills/RoleEffect";
import { RoleInfoUpdate } from "./skills/RoleInfoUpdate";
import { Judgement } from "./rules/Judgement";
import { RolePlacement } from "./skills/RolePlacement";

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
    public skillExecuted: boolean = false;

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

            game.skillExecuted = false;

            while (!game.skillExecuted) {
                var grid: maybeExists<RelatiGrid>;
                var role: maybeExists<RelatiRole>;
                var skill: maybeExists<RelatiSkill>;
                var card: maybeExists<RelatiCard>;

                do {
                    grid = await new Promise<RelatiGrid>(
                        select => player.gridSelect = select
                    );
                    game.gridSelected = grid != undefined;

                    if (game.gridSelected) {
                        RoleEffect.do({ game, grid });
                        RoleInfoUpdate.do({ game });
                        if (grid.role && grid.role.owner != player) game.gridSelected = false;
                    }
                } while (!game.gridSelected);

                if (grid.role) do {
                    role = grid.role;
                    skill = await new Promise<RelatiSkill>(
                        select => player.skillSelect = select
                    );
                    game.skillSelected = skill != undefined;

                    if (game.skillSelected) {
                        RoleEffect.do({ game, role, skill });
                        RoleInfoUpdate.do({ game });
                    }
                } while (!game.skillSelected) else do {
                    card = await new Promise<RelatiCard>(
                        select => player.cardSelect = select
                    );
                    game.cardSelected = card != undefined;

                    if (game.cardSelected) {
                        RoleEffect.do({ game, card });
                        RoleInfoUpdate.do({ game });
                    }
                } while (!game.cardSelected);

                if (card) {
                    role = new RelatiRole(grid, player, card);
                    skill = RolePlacement;
                }

                game.execute(skill as RelatiSkill, role as RelatiRole);
            }
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
            game.skillExecuted = true;
        }
    }
}