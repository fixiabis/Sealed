import { RelatiRoleInfo, RelatiRole } from "./RelatiRole";
import { RelatiGame } from "./RelatiGame";
import { RelatiGrid } from "./RelatiBoard";
import { RelatiSkill } from "./RelatiSkill";

export type RelatiCard = RelatiRoleInfo;

export class RelatiPlayer {
    public deck: RelatiCard[] = [];
    public hand: RelatiCard[] = [];
    public game?: RelatiGame;
    public leader?: RelatiRole;
    public gridSelect?: (value: RelatiGrid) => void;
    public cardSelect?: (value?: RelatiCard) => void;
    public skillSelect?: (value?: RelatiSkill) => void;

    constructor(public name: string) { }

    draw(times = 1) {
        for (var i = 0; i < times; i++) this.hand.push(
            this.deck.pop() as RelatiCard
        );
    }

    shuffle() {
        var cardCount = this.deck.length;

        for (var i = 0; i < cardCount; i++) {
            var j = (Math.random() * cardCount) | 0;
            [this.deck[i], this.deck[j]] = [this.deck[j], this.deck[i]];
        }
    }

    join(game: RelatiGame) {
        this.game = game;
        game.addPlayer(this);
    }

    selectCard(cardIndex: number) {
        var card = this.hand.splice(cardIndex, 1)[0];

        if (this.cardSelect) {
            this.cardSelect(card);
            delete this.cardSelect;
        }
    }

    selectGrid(grid: RelatiGrid) {
        if (this.gridSelect) {
            this.gridSelect(grid);
            delete this.gridSelect;
        }
    }

    selectSkill(skill: RelatiSkill) {
        if (this.skillSelect) {
            this.skillSelect(skill);
            delete this.skillSelect;
        }
    }
}

export type RelatiPlayerHasLeader = RelatiPlayer & { leader: RelatiRole };