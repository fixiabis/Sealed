import Board from '../../interfaces/Board';
import Placement from '../../interfaces/Placement';
import CoordinateChecker from '../checkers/CoordinateChecker';
import MarkRule from './MarkRule';
import BoardBasedCheck from '../../interfaces/BoardBasedCheck';
import LinkRule from './LinkRule';

class PlacementRule implements BoardBasedCheck<Placement> {
  constructor(
    protected coordinateChecker: CoordinateChecker,
    protected linkRule: LinkRule,
    protected markRule: MarkRule
  ) {}

  public checkValid(placement: Placement, board: Board): boolean {
    const coordinate = placement.coordinate;
    const [x, y] = coordinate;
    const isCoordinateValid = this.coordinateChecker.checkValid(coordinate, board);
    const isCoordinateCanBePlace = this.markRule.checkEmpty(board.marks[x][y]);
    return isCoordinateValid && isCoordinateCanBePlace;
  }

  public checkAvailable(placement: Placement, board: Board): boolean {
    const hasAnyProviderMark = this.linkRule.checkHasAnyProviderPath(
      placement.coordinate,
      board,
      placement.mark.shape
    );

    return placement.mark.type === 'node' && hasAnyProviderMark;
  }

  public checkAvailableForRoot(placement: Placement): boolean {
    return placement.mark.type === 'root';
  }
}

export default PlacementRule;
