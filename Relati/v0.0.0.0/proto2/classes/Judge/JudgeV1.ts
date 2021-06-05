import Board from '../../interfaces/Board';
import GameV1 from '../../interfaces/Game/GameV1';
import GameRulesV1 from '../../interfaces/GameRules/GameRulesV1';
import Action from '../../interfaces/player-actions/Action';
import Placement from '../../interfaces/player-actions/Placement';
import PlayerV1 from '../Player/PlayerV1';

class JudgeV1 {
  public startGame(players: PlayerV1[], board: Board, rules: GameRulesV1): GameV1 {
    const playerMarkShapes = players.map(({ usedMarkShape }) => usedMarkShape);
    const playerStates = GameV1.createPlayerStates(playerMarkShapes);

    return {
      board,
      currentPlayer: players[0],
      isOver: false,
      judge: this,
      players,
      playerStates,
      rules,
      winner: null,
    };
  }

  public endGame(game: GameV1, winner: PlayerV1 | null): GameV1 {
    return { ...game, currentPlayer: null, isOver: true, winner };
  }

  public endGameOrChangeCurrentPlayer(game: GameV1): GameV1 {
    const prevPlayer = game.currentPlayer;
    const nextPlayer = this.findNextPlayerWhoCanTakeAction(game);
    const isGameOver = nextPlayer === null || nextPlayer === prevPlayer;

    if (isGameOver) {
      return this.endGame(game, nextPlayer);
    }

    return { ...game, currentPlayer: nextPlayer };
  }

  protected findNextPlayerWhoCanTakeAction(game: GameV1): PlayerV1 | null {
    const currentPlayerIndex = game.players.indexOf(game.currentPlayer!);
    const playersAfterCurrent = game.players.slice(currentPlayerIndex + 1);
    const playersBeforeCurrentWithCurrent = game.players.slice(0, currentPlayerIndex + 1);
    const players = playersAfterCurrent.concat(playersBeforeCurrentWithCurrent);

    const playerWhoCanTakeAction = players.find((player) =>
      this.checkPlayerCanTakeAction(player, game)
    );

    return playerWhoCanTakeAction || null;
  }

  protected checkPlayerCanTakeRootPlacement(player: PlayerV1, game: GameV1): boolean {
    const playerState = game.playerStates[player.usedMarkShape];

    if (playerState.rootCoordinate !== null) {
      return false;
    }

    const rootPlacements = game.board.coordinates.map((coordinate) =>
      player.makeRootPlacement(coordinate, game.board)
    );

    return rootPlacements.some((placement) => game.rules.placement.checkValidForRoot(placement));
  }

  protected checkPlayerCanTakePlacement(player: PlayerV1, game: GameV1): boolean {
    const placements = game.board.coordinates.map((coordinate) =>
      player.makePlacement(coordinate, game.board)
    );

    return placements.some((placement) => game.rules.placement.checkValid(placement));
  }

  protected checkPlayerCanTakeAction(player: PlayerV1, game: GameV1): boolean {
    return (
      this.checkPlayerCanTakeRootPlacement(player, game) ||
      this.checkPlayerCanTakePlacement(player, game)
    );
  }

  protected checkActionAllowed(action: Action, game: GameV1): boolean {
    return action.playerMarkShape === game.currentPlayer?.usedMarkShape;
  }

  protected checkRootPlacementAllowed(action: Placement, game: GameV1): boolean {
    return game.playerStates[action.playerMarkShape].rootCoordinate === null;
  }

  public handleRootPlacement(action: Placement, game: GameV1): GameV1 {
    const isAllowed =
      this.checkActionAllowed(action, game) &&
      this.checkRootPlacementAllowed(action, game) &&
      game.rules.placement.checkValidForRoot(action);

    if (!isAllowed) {
      return game;
    }

    const board = game.rules.placement.handleAction(action);
    const playerStates = { ...game.playerStates };

    playerStates[action.playerMarkShape] = {
      ...playerStates[action.playerMarkShape],
      rootCoordinate: action.coordinate,
    };

    return { ...game, board, playerStates };
  }

  public handlePlacement(action: Placement, game: GameV1): GameV1 {
    const isAllowed =
      this.checkActionAllowed(action, game) && game.rules.placement.checkValid(action);

    if (!isAllowed) {
      return game;
    }

    const board = game.rules.placement.handleAction(action);
    return { ...game, board };
  }
}

export default JudgeV1;
