import Board from './Board';

interface Action {
  readonly board: Board;
  readonly coordinate: Coordinate;
  readonly playerMarkShape: string;
  readonly type: string;
}

export default Action;
