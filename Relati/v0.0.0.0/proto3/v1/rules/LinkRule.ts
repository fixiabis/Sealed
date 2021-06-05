import ActionRule from '../../shared/interfaces/ActionRule';
import Board from '../../shared/interfaces/Board';
import { relativeCoordinates } from '../../shared/utils/LinkRuleUtil';
import Link from '../actions/Link';
import MarkRule from './MarkRule';

class LinkRule implements ActionRule<Link> {
  constructor(protected markRule: MarkRule) {}

  protected getMovedCoordinate([x, y]: Coordinate, [dx, dy]: Coordinate): Coordinate {
    return [x + dx, y + dy];
  }

  protected checkCoordinateEq([ax, ay]: Coordinate, [bx, by]: Coordinate): boolean {
    return ax === bx && ay === by;
  }

  public checkValid({ board, coordinate, playerMarkShape, targetCoordinate }: Link): boolean {
    const [targetX, targetY] = targetCoordinate;

    return (
      board.checkCoordinate(coordinate) &&
      board.checkCoordinate(targetCoordinate) &&
      board.marks[targetX][targetY]?.shape === playerMarkShape
    );
  }

  public checkAvailable({ board, coordinate, playerMarkShape, targetCoordinate }: Link): boolean {
    return relativeCoordinates
      .map((relativeCoordinate) => this.getMovedCoordinate(coordinate, relativeCoordinate))
      .filter(board.checkCoordinate)
      .filter(
        ([x, y]) =>
          !this.markRule.checkEmpty(board.marks[x][y]) &&
          this.markRule.checkSameShape(board.marks[x][y]!, playerMarkShape)
      )
      .some((coordinate) => this.checkCoordinateEq(coordinate, targetCoordinate));
  }

  public checkSameShapeNearby(coordinate: Coordinate, board: Board, markShape: string): boolean {
    return relativeCoordinates
      .map((relativeCoordinate) => this.getMovedCoordinate(coordinate, relativeCoordinate))
      .filter(board.checkCoordinate)
      .some(
        ([x, y]) =>
          !this.markRule.checkEmpty(board.marks[x][y]) &&
          this.markRule.checkSameShape(board.marks[x][y]!, markShape)
      );
  }

  public handleAction(action: Link): Board {
    return action.board;
  }
}

export default LinkRule;
