import Board from '../../interfaces/Board';
import Game from '../../interfaces/Game';
import Placement from '../../interfaces/Placement';
import PlacementRule from '../rules/PlacementRule';
import Player from '../Player';

class Judge {
  constructor(protected placementRule: PlacementRule) {}

  public startGame(players: Player[], board: Board): Game {
    const markShapes = players.map(({ usedMarkShape }) => usedMarkShape);
    let playerStates = Game.createPlayerStates(markShapes);
    playerStates = Game.updatePlayerStates(markShapes[0], { actionRemaining: 1 }, playerStates);

    return {
      board,
      currentPlayer: players[0],
      isOver: false,
      judge: this,
      players,
      playerStates,
      winner: null,
    };
  }

  protected checkBeforePlacement(placement: Placement, game: Game): boolean {
    return placement.mark.shape === game.currentPlayer?.usedMarkShape && !game.isOver;
  }

  public checkFirstPlacement(placement: Placement, game: Game): boolean {
    return (
      this.checkBeforePlacement(placement, game) &&
      !game.playerStates[placement.mark.shape].rootCoordinate &&
      this.placementRule.checkValid(placement, game.board) &&
      this.placementRule.checkAvailableForRoot(placement)
    );
  }

  public handleFirstPlacement(placement: Placement, game: Game): Game {
    if (!this.checkFirstPlacement(placement, game)) {
      return game;
    }

    const board = Board.placeMark(placement.mark, placement.coordinate, game.board);

    const playerStates = Game.updatePlayerStates(
      placement.mark.shape,
      { rootCoordinate: placement.coordinate },
      game.playerStates
    );

    return { ...game, board, playerStates };
  }

  public checkPlacement(placement: Placement, game: Game): boolean {
    return (
      this.checkBeforePlacement(placement, game) &&
      game.playerStates[placement.mark.shape].rootCoordinate !== null &&
      this.placementRule.checkValid(placement, game.board) &&
      this.placementRule.checkAvailable(placement, game.board)
    );
  }

  public handlePlacement(placement: Placement, game: Game): Game {
    if (!this.checkPlacement(placement, game)) {
      return game;
    }

    const mark = placement.mark;
    const board = Board.placeMark(mark, placement.coordinate, game.board);

    return { ...game, board };
  }

  public endGameOrChangeCurrentPlayer(game: Game): Game {
    const prevPlayer = game.currentPlayer;
    const nextPlayer = this.findNextPlayerWhoCanTakeAction(game);
    const isGameOver = nextPlayer === null || nextPlayer === prevPlayer;

    if (isGameOver) {
      return this.endGame(game, nextPlayer);
    }

    return { ...game, currentPlayer: nextPlayer };
  }

  public endGame(game: Game, winner: Player | null): Game {
    return { ...game, currentPlayer: null, isOver: true, winner };
  }

  protected findNextPlayerWhoCanTakeAction(game: Game) {
    const currentPlayerIndex = game.players.indexOf(game.currentPlayer!);
    const playersAfterCurrent = game.players.slice(currentPlayerIndex + 1);
    const playersBeforeCurrentWithCurrent = game.players.slice(0, currentPlayerIndex + 1);
    const players = playersAfterCurrent.concat(playersBeforeCurrentWithCurrent);

    const playerWhoCanTakeAction = players.find((player) =>
      this.checkPlayerCanTakeAction(player, game)
    );

    return playerWhoCanTakeAction || null;
  }

  protected checkPlayerCanTakeAction(player: Player, game: Game): boolean {
    const playerState = game.playerStates[player.usedMarkShape];

    if (!playerState.rootCoordinate) {
      return this.checkPlayerCanDoFirstPlacement(player, game);
    }

    return this.checkPlayerCanDoPlacement(player, game);
  }

  protected checkPlayerCanDoFirstPlacement(player: Player, game: Game): boolean {
    const isPlacementAvailable = (placement: Placement) =>
      this.placementRule.checkValid(placement, game.board) &&
      this.placementRule.checkAvailableForRoot(placement);

    return game.board.coordinates
      .map((coordinate) => player.makeFirstPlacement(coordinate, game.board))
      .some(isPlacementAvailable);
  }

  protected checkPlayerCanDoPlacement(player: Player, game: Game): boolean {
    const isPlacementAvailable = (placement: Placement) =>
      this.placementRule.checkValid(placement, game.board) &&
      this.placementRule.checkAvailable(placement, game.board);

    return game.board.coordinates
      .map((coordinate) => player.makePlacement(coordinate, game.board))
      .some(isPlacementAvailable);
  }
}

export default Judge;
