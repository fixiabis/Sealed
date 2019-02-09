namespace Relati {
    export namespace RelatiCards {
        export class Normal implements RelatiCard {
            public actions: RelatiAction[] = [];
            public effects: RelatiAction[] = [];
            constructor(public owner: RelatiPlayer) { }

            select(game: RelatiGame) {
                var { owner } = this;

                for (var grid of game.board.gridList) {
                    if (grid.role) continue;

                    if (game.turn < 2 || RelatiRules.Relati.allow({ owner, grid })) {
                        grid.selectable = true;
                    }
                }
            }

            launch(game: RelatiGame, grid: RelatiGrid) {
                var { owner } = this;

                if (grid.role) return;

                if (game.turn < 2 || RelatiRules.Relati.allow({ owner, grid })) {
                    grid.role = new RelatiRoles.Normal(owner, grid);

                    var cardIndex = owner.hand.indexOf(this);
                    owner.hand.splice(cardIndex, 1);
                    grid.cards.push(this);

                    game.board.gridList.forEach(
                        grid => grid.selectable = false
                    );

                    if (game.turn < 2) {
                        grid.role.gain("relati-launcher");
                        grid.role.type = "leader";
                        this.effects.push(RelatiBlock);
                    } else {
                        grid.role.gain("relati-repeater");
                        grid.role.gain("relati-recepter");
                    }
                }
            }
        }
    }
}