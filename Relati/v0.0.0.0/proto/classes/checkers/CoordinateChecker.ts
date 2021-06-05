import Board from '../../interfaces/Board';
import BoardBasedCheck from '../../interfaces/BoardBasedCheck';

class CoordinateChecker implements BoardBasedCheck<Coordinate> {
  public checkValid(coordinate: Coordinate, board: Board): boolean {
    const [x, y] = coordinate;
    return x > -1 && x < board.width && y > -1 && y < board.height;
  }
}

export default CoordinateChecker;
