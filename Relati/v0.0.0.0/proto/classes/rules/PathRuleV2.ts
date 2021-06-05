import Board from '../../interfaces/Board';
import CoordinateChecker from '../checkers/CoordinateChecker';
import MarkRuleV2 from './MarkRuleV2';
import PathRule from './PathRule';

class PathRuleV2 extends PathRule {
  constructor(protected coordinateChecker: CoordinateChecker, protected markRule: MarkRuleV2) {
    super(coordinateChecker);
  }

  public checkAvailable([, ...otherCoordinates]: Path<Coordinate>, board: Board): boolean {
    return otherCoordinates.every(([x, y]) => this.markRule.checkCanThrough(board.marks[x][y]));
  }
}

export default PathRuleV2;
