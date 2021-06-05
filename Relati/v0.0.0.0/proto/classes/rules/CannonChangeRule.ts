import Board from '../../interfaces/Board';
import BoardBasedCheck from '../../interfaces/BoardBasedCheck';
import CannonChange from '../../interfaces/CannonChange';
import CoordinateChecker from '../checkers/CoordinateChecker';
import MarkRuleV2 from './MarkRuleV2';

class CannonChangeRule implements BoardBasedCheck<CannonChange> {
  constructor(protected coordinateChecker: CoordinateChecker, protected markRule: MarkRuleV2) {}

  public checkValid(cannonChange: CannonChange, board: Board) {
    const coordinate = cannonChange.coordinate;
    const [x, y] = coordinate;
    const isCoordinateValid = this.coordinateChecker.checkValid(coordinate, board);

    const isCoordinateCanBeCannon = () =>
      !this.markRule.checkEmpty(board.marks[x][y]) &&
      this.markRule.checkCanBeCannon(board.marks[x][y]!);

    return isCoordinateValid && isCoordinateCanBeCannon();
  }
}

export default CannonChangeRule;
