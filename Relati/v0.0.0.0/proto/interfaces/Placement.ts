import Board from './Board';
import Mark from './Mark';

interface Placement {
  readonly board: Board;
  readonly coordinate: Coordinate;
  readonly mark: Mark;
}

export default Placement;
