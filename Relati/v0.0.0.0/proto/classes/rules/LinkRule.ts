import Board from '../../interfaces/Board';
import Mark from '../../interfaces/Mark';
import CoordinateChecker from '../checkers/CoordinateChecker';
import { relativeCoordinates } from '../utils/LinkRuleUtil';
import MarkRule from './MarkRule';

class LinkRule {
  constructor(protected coordinateChecker: CoordinateChecker, protected markRule: MarkRule) {}

  public checkHasAnyProviderPath(
    coordinate: Coordinate,
    board: Board,
    markShape: string
  ): boolean {
    const [x, y] = coordinate;

    const isProviderMark = (mark: Mark | null) =>
      !this.markRule.checkEmpty(mark) &&
      this.markRule.checkSameShape(mark, markShape) &&
      this.markRule.checkIsProvider(mark);

    const isCoordinateHasProviderMark = ([x, y]: Coordinate) =>
      this.coordinateChecker.checkValid([x, y], board) && isProviderMark(board.marks[x][y]);

    return relativeCoordinates
      .map(([dx, dy]) => [x + dx, y + dy] as Coordinate)
      .some(isCoordinateHasProviderMark);
  }
}

export default LinkRule;
