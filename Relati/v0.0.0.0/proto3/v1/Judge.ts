import Action from '../shared/interfaces/Action';
import Board from '../shared/interfaces/Board';
import Game from '../shared/interfaces/Game';
import Placement from './actions/Placement';
import Player from './Player';
import PlacementRule from './rules/PlacementRule';

export interface State {
  readonly playerRootCoordinates: Readonly<Partial<Record<string, Coordinate>>>;
}

class Judge {
  constructor(protected placementRule: PlacementRule) {}

  public startGame(players: Player[], board: Board): Game<State> {
    const currentPlayer = players[0];
    const isOver = false;
    const judge = this;
    const state = { playerRootCoordinates: {} };
    const winner = null;
    return { board, currentPlayer, isOver, judge, players, state, winner };
  }

  public handleAction(action: Action, game: Game<State>): Game<State> {
    switch (action.type) {
      case 'placement': {
        return this.handlePlacement(action as Placement, game);
      }

      case 'root-placement': {
        return this.handleRootPlacement(action as Placement, game);
      }

      default: {
        return game;
      }
    }
  }

  public endGame(game: Game<State>, winner: Player | null): Game<State> {
    const currentPlayer = null;
    const isOver = true;
    return { ...game, currentPlayer, isOver, winner };
  }

  protected handlePlacement(action: Placement, game: Game<State>): Game<State> {
    const isAllowed =
      action.playerMarkShape === game.currentPlayer!.usedMarkShape &&
      this.placementRule.checkValid(action) &&
      this.placementRule.checkAvailable(action);

    if (!isAllowed) {
      return game;
    }

    const board = this.placementRule.handleAction(action);
    return this.handleAfterAction(action, { ...game, board });
  }

  protected handleRootPlacement(action: Placement, game: Game<State>): Game<State> {
    const playerMarkShape = game.currentPlayer!.usedMarkShape;

    const isAllowed =
      action.playerMarkShape === playerMarkShape &&
      this.placementRule.checkValid(action) &&
      !game.state.playerRootCoordinates[playerMarkShape];

    if (!isAllowed) {
      return game;
    }

    const board = this.placementRule.handleAction(action);

    const playerRootCoordinates = {
      ...game.state.playerRootCoordinates,
      [playerMarkShape]: action.coordinate,
    };

    const state = { ...game.state, playerRootCoordinates };
    return this.handleAfterAction(action, { ...game, board, state });
  }

  protected handleAfterAction(action: Action, game: Game<State>): Game<State> {
    return this.endGameOrChangeCurrentPlayer(game);
  }

  protected endGameOrChangeCurrentPlayer(game: Game<State>): Game<State> {
    const prevPlayer = game.currentPlayer;
    const nextPlayer = this.findNextPlayerWhoCanTakeAction(game);
    const isGameOver = nextPlayer === null || nextPlayer === prevPlayer;

    if (isGameOver) {
      return this.endGame(game, nextPlayer);
    }

    return { ...game, currentPlayer: nextPlayer };
  }

  protected findNextPlayerWhoCanTakeAction(game: Game<State>): Player | null {
    const currentPlayerIndex = game.players.indexOf(game.currentPlayer!);
    const playersAfterCurrent = game.players.slice(currentPlayerIndex + 1);
    const playersBeforeCurrentWithCurrent = game.players.slice(0, currentPlayerIndex + 1);
    const players = playersAfterCurrent.concat(playersBeforeCurrentWithCurrent);

    const playerWhoCanTakeAction = players.find((player) =>
      this.checkPlayerCanTakeAction(player, game)
    );

    return playerWhoCanTakeAction || null;
  }

  protected checkPlayerCanTakeRootPlacement(player: Player, game: Game<State>): boolean {
    const rootCoordinate = game.state.playerRootCoordinates[player.usedMarkShape];

    if (rootCoordinate) {
      return false;
    }

    const actions = game.board.coordinates.map((coordinate) =>
      player.makeRootPlacement(coordinate, game.board)
    );

    return actions.some((action) => this.placementRule.checkValid(action));
  }

  protected checkPlayerCanTakePlacement(player: Player, game: Game<State>): boolean {
    const actions = game.board.coordinates.map((coordinate) =>
      player.makePlacement(coordinate, game.board)
    );

    return actions.some(
      (action) => this.placementRule.checkValid(action) && this.placementRule.checkAvailable(action)
    );
  }

  protected checkPlayerCanTakeAction(player: Player, game: Game<State>): boolean {
    return (
      this.checkPlayerCanTakeRootPlacement(player, game) ||
      this.checkPlayerCanTakePlacement(player, game)
    );
  }
}

export default Judge;
