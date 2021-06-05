import Game from '../../interfaces/Game';
import Placement from '../../interfaces/Placement';
import ContinualActionRule from '../rules/ContinualActionRule';
import LinkRuleV2 from '../rules/LinkRuleV2';
import PlacementRuleV2 from '../rules/PlacementRuleV2';
import JudgeV2 from './JudgeV2';

class JudgeV3 extends JudgeV2 {
  constructor(
    protected placementRule: PlacementRuleV2,
    protected linkRule: LinkRuleV2,
    protected continualActionRule: ContinualActionRule
  ) {
    super(placementRule, linkRule);
  }

  protected checkBeforePlacement(placement: Placement, game: Game): boolean {
    return (
      super.checkBeforePlacement(placement, game) &&
      game.playerStates[game.currentPlayer!.usedMarkShape].actionRemaining > 0
    );
  }

  public handleFirstPlacement(placement: Placement, prevGame: Game): Game {
    const game = super.handleFirstPlacement(placement, prevGame);

    const playerStates = Game.updatePlayerStates(
      prevGame.currentPlayer!.usedMarkShape,
      { actionRemaining: 0 },
      game.playerStates
    );

    return { ...game, playerStates };
  }

  protected calcCurrentPlayerActionRemaining(game: Game, prevGame: Game) {
    return (
      game.playerStates[game.currentPlayer!.usedMarkShape].actionRemaining -
      1 +
      this.continualActionRule.getAdditionalActionRemaining(game, prevGame, game.currentPlayer!)
    );
  }

  public handlePlacement(placement: Placement, prevGame: Game): Game {
    const game = super.handlePlacement(placement, prevGame);

    if (game === prevGame) {
      return prevGame;
    }

    const actionRemaining = this.calcCurrentPlayerActionRemaining(game, prevGame);

    const playerStates = Game.updatePlayerStates(
      game.currentPlayer!.usedMarkShape,
      { actionRemaining },
      game.playerStates
    );

    return { ...game, playerStates };
  }

  public endGameOrChangeCurrentPlayer(prevGame: Game): Game {
    const prevPlayer = prevGame.currentPlayer!;
    const prevPlayerState = prevGame.playerStates[prevPlayer.usedMarkShape]!;
    const game = super.endGameOrChangeCurrentPlayer(prevGame);

    if (game.isOver) {
      return game;
    }

    if (prevPlayerState.actionRemaining) {
      return { ...game, currentPlayer: prevPlayer };
    }

    const playerStates = Game.updatePlayerStates(
      game.currentPlayer!.usedMarkShape,
      { actionRemaining: 1 },
      game.playerStates
    );

    return { ...game, playerStates };
  }
}

export default JudgeV3;
