import Board from '../../interfaces/Board';
import GameV3 from '../../interfaces/Game/GameV3';
import GameRulesV3 from '../../interfaces/GameRules/GameRulesV3';
import Action from '../../interfaces/player-actions/Action';
import Placement from '../../interfaces/player-actions/Placement';
import PlayerStateV2 from '../../interfaces/PlayerState/PlayerStateV2';
import PlayerV1 from '../Player/PlayerV1';
import JudgeV2 from './JudgeV2';

class JudgeV3 extends JudgeV2 {
  public startGame(players: PlayerV1[], board: Board, rules: GameRulesV3): GameV3 {
    const game = super.startGame(players, board, rules) as GameV3;
    const markShapes = game.players.map(({ usedMarkShape }) => usedMarkShape);

    const playerStates = GameV3.updatePlayerStates(
      game.currentPlayer!.usedMarkShape,
      { actionsRemaining: 1 } as PlayerStateV2,
      GameV3.createPlayerStates(markShapes)
    ) as GameV3['playerStates'];

    return { ...game, playerStates };
  }

  public endGame(game: GameV3, winner: PlayerV1 | null): GameV3 {
    return super.endGame(game, winner) as GameV3;
  }

  public endGameOrChangeCurrentPlayer(game: GameV3): GameV3 {
    const prevPlayer = game.currentPlayer!;
    const prevPlayerState = game.playerStates[prevPlayer.usedMarkShape]!;
    const nextGame = super.endGameOrChangeCurrentPlayer(game) as GameV3;

    if (nextGame.isOver) {
      return nextGame;
    }

    if (prevPlayerState.actionsRemaining) {
      return { ...nextGame, currentPlayer: prevPlayer };
    }

    const playerStates = GameV3.updatePlayerStates(
      nextGame.currentPlayer!.usedMarkShape,
      { actionsRemaining: 1 } as PlayerStateV2,
      nextGame.playerStates
    ) as GameV3['playerStates'];

    return { ...nextGame, playerStates };
  }

  protected checkActionAllowed(action: Action, game: GameV3): boolean {
    return (
      super.checkActionAllowed(action, game) &&
      game.playerStates[game.currentPlayer!.usedMarkShape].actionsRemaining > 0
    );
  }

  protected calcCurrentPlayerActionsRemaining(game: GameV3, prevGame: GameV3): number {
    const markShapes = game.players.map(({ usedMarkShape }) => usedMarkShape);
    const playerMarkShape = game.currentPlayer!.usedMarkShape;

    return (
      game.playerStates[game.currentPlayer!.usedMarkShape].actionsRemaining -
      1 +
      game.rules.continualActions.getAdditionalActionsRemaining(
        game.board,
        prevGame.board,
        markShapes,
        playerMarkShape
      )
    );
  }

  public handleAfterAction(game: GameV3, prevGame: GameV3): GameV3 {
    if (game === prevGame) {
      return game;
    }

    const actionsRemaining = this.calcCurrentPlayerActionsRemaining(game, prevGame);

    const playerStates = GameV3.updatePlayerStates(
      game.currentPlayer!.usedMarkShape,
      { actionsRemaining } as PlayerStateV2,
      game.playerStates
    ) as GameV3['playerStates'];

    return { ...game, playerStates };
  }

  public handleRootPlacement(placement: Placement, game: GameV3): GameV3 {
    const handledGame = super.handleRootPlacement(placement, game) as GameV3;
    return this.handleAfterAction(handledGame, game);
  }

  public handlePlacement(placement: Placement, game: GameV3): GameV3 {
    const handledGame = super.handlePlacement(placement, game) as GameV3;
    return this.handleAfterAction(handledGame, game);
  }
}

export default JudgeV3;
