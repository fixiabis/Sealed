import Board from '../../interfaces/Board';
import BoardBasedCheck from '../../interfaces/BoardBasedCheck';
import RootMovement from '../../interfaces/RootMovement';
import CoordinateChecker from '../checkers/CoordinateChecker';
import LinkRuleV3 from './LinkRuleV3';
import MarkRuleV2 from './MarkRuleV2';

class RootMovementRule implements BoardBasedCheck<RootMovement> {
  constructor(
    protected coordinateChecker: CoordinateChecker,
    protected markRule: MarkRuleV2,
    protected linkRule: LinkRuleV3
  ) {}

  public checkValid(rootMovement: RootMovement, board: Board) {
    const coordinate = rootMovement.coordinate;
    const [x, y] = coordinate;
    const isCoordinateValid = this.coordinateChecker.checkValid(coordinate, board);

    const isCoordinateCanBeCannon = () =>
      !this.markRule.checkEmpty(board.marks[x][y]) &&
      this.markRule.checkCanBeRoot(board.marks[x][y]!);

    return isCoordinateValid && isCoordinateCanBeCannon();
  }

  public checkAvailable(rootMovement: RootMovement, board: Board) {
    const coordinate = rootMovement.coordinate;
    const [x, y] = coordinate;
    const markShape = board.marks[x][y]!.shape;
    const providerPaths = this.linkRule.getProviderPaths(coordinate, board, markShape);

    for (const [providerCoordinate] of providerPaths) {
      const [providerX, providerY] = providerCoordinate;
      const providerMark = board.marks[providerX][providerY]!;

      if (providerMark.shape === markShape && providerMark.type === 'root') {
        return true;
      }
    }

    return false;
  }
}

export default RootMovementRule;
