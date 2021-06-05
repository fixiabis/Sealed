import Board from './Board';

interface CannonChange {
  readonly board: Board;
  readonly coordinate: Coordinate;
}

export default CannonChange;
