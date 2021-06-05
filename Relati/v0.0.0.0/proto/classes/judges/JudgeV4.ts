import Board from '../../interfaces/Board';
import CannonAttack from '../../interfaces/CannonAttack';
import CannonChange from '../../interfaces/CannonChange';
import Game from '../../interfaces/Game';
import Mark from '../../interfaces/Mark';
import RootMovement from '../../interfaces/RootMovement';
import CannonAttackRule from '../rules/CannonAttackRule';
import CannonChangeRule from '../rules/CannonChangeRule';
import ContinualActionRule from '../rules/ContinualActionRule';
import LinkRuleV3 from '../rules/LinkRuleV3';
import MarkRuleV2 from '../rules/MarkRuleV2';
import PlacementRuleV2 from '../rules/PlacementRuleV2';
import RootMovementRule from '../rules/RootMovementRule';
import JudgeV3 from './JudgeV3';

class JudgeV4 extends JudgeV3 {
  constructor(
    protected placementRule: PlacementRuleV2,
    protected linkRule: LinkRuleV3,
    protected continualActionRule: ContinualActionRule,
    protected cannonChangeRule: CannonChangeRule,
    protected cannonAttackRule: CannonAttackRule,
    protected rootMovementRule: RootMovementRule,
    protected markRule: MarkRuleV2
  ) {
    super(placementRule, linkRule, continualActionRule);
  }

  protected getRootCoordinate(game: Game): Coordinate[] {
    return super
      .getRootCoordinate(game)
      .filter(([x, y]) => game.board.marks[x][y]!.type === 'root');
  }

  public checkCannonChange(cannonChange: CannonChange, game: Game) {
    const [x, y] = cannonChange.coordinate;

    return (
      this.cannonChangeRule.checkValid(cannonChange, game.board) &&
      !game.isOver &&
      game.board.marks[x][y]!.shape === game.currentPlayer?.usedMarkShape &&
      game.playerStates[game.currentPlayer!.usedMarkShape].actionRemaining > 0
    );
  }

  public handleCannonChange(cannonChange: CannonChange, prevGame: Game) {
    if (!this.checkCannonChange(cannonChange, prevGame)) {
      return prevGame;
    }

    const [x, y] = cannonChange.coordinate;
    const mark: Mark = { ...prevGame.board.marks[x][y]!, type: 'cannon-node' };
    const cannonChangedBoard = Board.placeMark(mark, cannonChange.coordinate, prevGame.board);
    const rootCoordinates = this.getRootCoordinate({ ...prevGame, board: cannonChangedBoard });
    const board = this.linkRule.interruptAndRestore(rootCoordinates, cannonChangedBoard);
    const game = { ...prevGame, board };
    const actionRemaining = this.calcCurrentPlayerActionRemaining(game, prevGame);

    const playerStates = Game.updatePlayerStates(
      game.currentPlayer!.usedMarkShape,
      { actionRemaining },
      game.playerStates
    );

    return { ...game, playerStates };
  }

  public checkCannonAttack(cannonAttack: CannonAttack, game: Game) {
    const [x, y] = cannonAttack.coordinate;

    return (
      this.cannonAttackRule.checkValid(cannonAttack, game.board) &&
      !game.isOver &&
      game.board.marks[x][y]!.shape === game.currentPlayer?.usedMarkShape &&
      game.playerStates[game.currentPlayer!.usedMarkShape].actionRemaining > 0
    );
  }

  public handleCannonAttack(cannonAttack: CannonAttack, prevGame: Game) {
    if (!this.checkCannonAttack(cannonAttack, prevGame)) {
      return prevGame;
    }

    const targetCoordinate = this.cannonAttackRule.findTargetCoordinate(
      cannonAttack,
      prevGame.board
    );

    if (!targetCoordinate) {
      return prevGame;
    }

    const [x, y] = cannonAttack.coordinate;

    const [targetX, targetY] = targetCoordinate;

    const mark: Mark = { ...prevGame.board.marks[x][y]!, type: 'exhausted-cannon-node' };

    const targetMark = this.markRule.handleCannonAttack(
      prevGame.board.marks[targetX][targetY]!,
      mark.shape
    );

    const cannonAttackedBoard = Board.placeMark(
      targetMark,
      targetCoordinate,
      Board.placeMark(mark, cannonAttack.coordinate, prevGame.board)
    );

    const rootCoordinates = this.getRootCoordinate({ ...prevGame, board: cannonAttackedBoard });
    const board = this.linkRule.interruptAndRestore(rootCoordinates, cannonAttackedBoard);
    const game = { ...prevGame, board };
    const actionRemaining = this.calcCurrentPlayerActionRemaining(game, prevGame);

    const playerStates = Game.updatePlayerStates(
      game.currentPlayer!.usedMarkShape,
      { actionRemaining },
      game.playerStates
    );

    return { ...game, playerStates };
  }

  public checkRootMovement(rootMovement: RootMovement, game: Game) {
    const [x, y] = rootMovement.coordinate;

    return (
      this.rootMovementRule.checkValid(rootMovement, game.board) &&
      this.rootMovementRule.checkAvailable(rootMovement, game.board) &&
      !game.isOver &&
      game.board.marks[x][y]!.shape === game.currentPlayer?.usedMarkShape &&
      game.playerStates[game.currentPlayer!.usedMarkShape].actionRemaining > 0
    );
  }

  public handleRootMovement(rootMovement: RootMovement, prevGame: Game) {
    if (!this.checkRootMovement(rootMovement, prevGame)) {
      return prevGame;
    }

    const [x, y] = rootMovement.coordinate;

    const rootCoordinate =
      prevGame.playerStates[prevGame.currentPlayer!.usedMarkShape].rootCoordinate!;

    const [rootX, rootY] = rootCoordinate;

    const mark: Mark = { ...prevGame.board.marks[x][y]!, type: 'root' };

    const rootMark: Mark = { ...prevGame.board.marks[rootX][rootY]!, type: 'dead-root' };

    const rootMovedBoard = Board.placeMark(
      mark,
      rootMovement.coordinate,
      Board.placeMark(rootMark, rootCoordinate, prevGame.board)
    );

    const prevPlayerStates = Game.updatePlayerStates(
      prevGame.currentPlayer!.usedMarkShape,
      { rootCoordinate: rootMovement.coordinate },
      prevGame.playerStates
    );

    const rootCoordinates = this.getRootCoordinate({
      ...prevGame,
      board: rootMovedBoard,
      playerStates: prevPlayerStates,
    });

    const board = this.linkRule.interruptAndRestore(rootCoordinates, rootMovedBoard);
    const game = { ...prevGame, board };
    const actionRemaining = this.calcCurrentPlayerActionRemaining(game, prevGame);

    const playerStates = Game.updatePlayerStates(
      game.currentPlayer!.usedMarkShape,
      { actionRemaining },
      prevPlayerStates
    );

    return { ...game, playerStates };
  }
}

export default JudgeV4;
