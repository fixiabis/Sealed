import Board from '../../interfaces/Board';
import Game from '../../interfaces/Game';
import Placement from '../../interfaces/Placement';
import LinkRuleV2 from '../rules/LinkRuleV2';
import PlacementRuleV2 from '../rules/PlacementRuleV2';
import Judge from './Judge';

class JudgeV2 extends Judge {
  constructor(protected placementRule: PlacementRuleV2, protected linkRule: LinkRuleV2) {
    super(placementRule);
  }

  protected getRootCoordinate(game: Game): Coordinate[] {
    return game.players
      .map(({ usedMarkShape }) => usedMarkShape)
      .map((markShape) => game.playerStates[markShape])
      .map(({ rootCoordinate }) => rootCoordinate!);
  }

  public handlePlacement(placement: Placement, prevGame: Game): Game {
    const game = super.handlePlacement(placement, prevGame);

    if (game === prevGame) {
      return prevGame;
    }

    const rootCoordinates = this.getRootCoordinate(game);
    const board = this.linkRule.interruptAndRestore(rootCoordinates, game.board);

    return { ...game, board };
  }
}

export default JudgeV2;
