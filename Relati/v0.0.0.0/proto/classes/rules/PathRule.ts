import Board from '../../interfaces/Board';
import BoardBasedCheck from '../../interfaces/BoardBasedCheck';
import CoordinateChecker from '../checkers/CoordinateChecker';

class PathRule implements BoardBasedCheck<Path<Coordinate>> {
  constructor(protected coordinateChecker: CoordinateChecker) {}

  public checkValid(path: Path<Coordinate>, board: Board): boolean {
    return path.every((coordinate) => this.coordinateChecker.checkValid(coordinate, board));
  }

  public checkAvailable([, ...otherCoordinates]: Path<Coordinate>, board: Board): boolean {
    return otherCoordinates.every(([x, y]) => board.marks[x][y] === null);
  }
}

export default PathRule;
