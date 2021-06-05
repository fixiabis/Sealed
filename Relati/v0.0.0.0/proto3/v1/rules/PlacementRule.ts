import ActionRule from '../../shared/interfaces/ActionRule';
import Board from '../../shared/interfaces/Board';
import Placement from '../actions/Placement';
import LinkRule from './LinkRule';

class PlacementRule implements ActionRule<Placement> {
  constructor(protected linkRule: LinkRule) {}

  public checkValid({ board, coordinate }: Placement): boolean {
    const [x, y] = coordinate;
    return board.checkCoordinate(coordinate) && board.marks[x][y] === null;
  }

  public checkAvailable({ board, coordinate, playerMarkShape }: Placement): boolean {
    return this.linkRule.checkSameShapeNearby(coordinate, board, playerMarkShape);
  }

  public handleAction({ board, coordinate, mark }: Placement): Board {
    const [x, y] = coordinate;
    const marks = board.marks.map(([...marks]) => marks);
    marks[x][y] = mark;
    return { ...board, marks };
  }
}

export default PlacementRule;
