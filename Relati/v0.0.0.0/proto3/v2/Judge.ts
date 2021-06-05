import Action from '../shared/interfaces/Action';
import Game from '../shared/interfaces/Game';
import JudgeV1, { State } from '../v1/Judge';
import LinkRule from './rules/LinkRule';
import PlacementRule from './rules/PlacementRule';

class Judge extends JudgeV1 {
  constructor(protected placementRule: PlacementRule, protected linkRule: LinkRule) {
    super(placementRule);
  }

  protected handleAfterAction(action: Action, game: Game<State>): Game<State> {
    const board = this.linkRule.handleAfterAction({ ...action, board: game.board });
    return this.endGameOrChangeCurrentPlayer({ ...game, board });
  }
}

export default Judge;
