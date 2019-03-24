import { RelatiRoleInfo, RelatiRole } from "./RelatiRole";
import { RelatiGame } from "./RelatiGame";
import { RelatiGrid } from "./RelatiBoard";
import { RelatiSkill } from "./RelatiSkill";

export type RelatiCard = RelatiRoleInfo;
export type RelatiAction<value> = (
    (value: value) => void
);

export class RelatiPlayer {
    public game?: RelatiGame;

    public deck: RelatiCard[] = [];
    public hand: RelatiCard[] = [];
    public leader?: RelatiRole;

    public gridSelect?: RelatiAction<RelatiGrid>;
    public cardSelect?: RelatiAction<RelatiCard>;
    public skillSelect?: RelatiAction<RelatiSkill>;

    constructor(public name: string) { }

    draw(times = 1) {
        for (let i = 0; i < times; i++) this.hand.push(
            this.deck.pop() as RelatiCard
        );
    }

    shuffle() {
        let cardCount = this.deck.length;

        for (let i = 0; i < cardCount; i++) {
            let j = (Math.random() * cardCount) | 0;
            [this.deck[i], this.deck[j]] = [this.deck[j], this.deck[i]];
        }
    }

    join(game: RelatiGame) {
        this.game = game;
        game.addPlayer(this);
    }

    selectCard(cardIndex: number) {
        let card = this.hand.splice(cardIndex, 1)[0];

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