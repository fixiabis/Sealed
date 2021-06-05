import Board from '../../interfaces/Board';
import CoordinateChecker from '../checkers/CoordinateChecker';
import { relativePaths } from '../utils/LinkRuleUtil';
import LinkRule from './LinkRule';
import MarkRule from './MarkRule';
import PathRule from './PathRule';

class LinkRuleV2 extends LinkRule {
  constructor(
    protected coordinateChecker: CoordinateChecker,
    protected markRule: MarkRule,
    protected pathRule: PathRule
  ) {
    super(coordinateChecker, markRule);
  }

  public checkHasAnyProviderPath(coordinate: Coordinate, board: Board, markShape: string): boolean {
    const [x, y] = coordinate;

    const isCoordinateHasProviderMark = ([x, y]: Coordinate) =>
      board.marks[x][y] !== null &&
      this.markRule.checkSameShape(board.marks[x][y]!, markShape) &&
      this.markRule.checkIsProvider(board.marks[x][y]!);

    const isPathHasProviderMark = (path: Path<Coordinate>) =>
      this.pathRule.checkValid(path, board) &&
      this.pathRule.checkAvailable(path, board) &&
      isCoordinateHasProviderMark(path[0]);

    return relativePaths
      .map((path) => path.map(([dx, dy]) => [x + dx, y + dy] as Coordinate))
      .some(isPathHasProviderMark);
  }

  public getProviderPaths(
    coordinate: Coordinate,
    board: Board,
    markShape: string
  ): Path<Coordinate>[] {
    const [x, y] = coordinate;

    const isCoordinateHasProviderMark = ([x, y]: Coordinate) =>
      board.marks[x][y] !== null &&
      this.markRule.checkSameShape(board.marks[x][y]!, markShape) &&
      this.markRule.checkIsProvider(board.marks[x][y]!);

    const isPathHasProviderMark = (path: Path<Coordinate>) =>
      this.pathRule.checkValid(path, board) &&
      this.pathRule.checkAvailable(path, board) &&
      isCoordinateHasProviderMark(path[0]);

    return relativePaths
      .map((path) => path.map(([dx, dy]) => [x + dx, y + dy] as Coordinate))
      .filter(isPathHasProviderMark);
  }

  public getConsumerPaths(
    coordinate: Coordinate,
    board: Board,
    markShape: string
  ): Path<Coordinate>[] {
    const [x, y] = coordinate;

    const isCoordinateHasConsumerMark = ([x, y]: Coordinate) =>
      board.marks[x][y] !== null &&
      this.markRule.checkSameShape(board.marks[x][y]!, markShape) &&
      this.markRule.checkIsConsumer(board.marks[x][y]!);

    const isPathHasConsumerMark = (path: Path<Coordinate>) =>
      this.pathRule.checkValid(path, board) &&
      this.pathRule.checkAvailable(path, board) &&
      isCoordinateHasConsumerMark(path[0]);

    return relativePaths
      .map((path) => path.map(([dx, dy]) => [x + dx, y + dy] as Coordinate))
      .filter(isPathHasConsumerMark);
  }

  public interruptAndRestore(rootCoordinates: Coordinate[], board: Board): Board {
    const providerCoordinates = [...rootCoordinates];

    const isProviderMark = board.marks.map((marks, x) =>
      marks.map((_, y) => rootCoordinates.some(([rootX, rootY]) => x === rootX && y === rootY))
    );

    const isProvidedMark = isProviderMark.map((isProviderMark) =>
      isProviderMark.map((isProvidedMark) => isProvidedMark)
    );

    for (const providerCoordinate of providerCoordinates) {
      const [providerX, providerY] = providerCoordinate;
      const providerMark = board.marks[providerX][providerY]!;
      const consumerPaths = this.getConsumerPaths(providerCoordinate, board, providerMark.shape);

      for (const [coordinate] of consumerPaths) {
        const [x, y] = coordinate;
        const mark = board.marks[x][y]!;

        if (!isProvidedMark[x][y]) {
          const providedMark = this.markRule.handleProvide(mark);

          board = Board.placeMark(providedMark, coordinate, board);
          isProvidedMark[x][y] = true;

          isProviderMark[x][y] =
            !this.markRule.checkEmpty(providedMark) && this.markRule.checkIsProvider(providedMark);

          if (isProviderMark[x][y]) {
            providerCoordinates.push(coordinate);
          }
        }
      }
    }

    const consumedCoordinates = board.coordinates.filter(([x, y]) => !isProvidedMark[x][y]);

    for (const consumedCoordinate of consumedCoordinates) {
      const [consumedX, consumedY] = consumedCoordinate;
      const consumedMark = board.marks[consumedX][consumedY]!;
      const mark = this.markRule.handleConsume(consumedMark);
      board = Board.placeMark(mark, consumedCoordinate, board);
    }

    return board;
  }
}

export default LinkRuleV2;
