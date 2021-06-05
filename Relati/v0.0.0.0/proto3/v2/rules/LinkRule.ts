import Action from '../../shared/interfaces/Action';
import Board from '../../shared/interfaces/Board';
import { relativePaths } from '../../shared/utils/LinkRuleUtil';
import LinkRuleV1 from '../../v1/rules/LinkRule';
import MarkRule from './MarkRule';

class LinkRule extends LinkRuleV1 {
  constructor(protected markRule: MarkRule) {
    super(markRule);
  }

  protected getPaths(coordinate: Coordinate, relativePath: Path<Coordinate>) {
    return relativePath.map((relativeCoordinate) =>
      this.getMovedCoordinate(coordinate, relativeCoordinate)
    );
  }

  public checkSameShapeProviderNearby(
    coordinate: Coordinate,
    board: Board,
    markShape: string
  ): boolean {
    return relativePaths
      .map((relativePath) => this.getPaths(coordinate, relativePath))
      .filter((path) => path.every(board.checkCoordinate))
      .some(
        ([[x, y], ...otherCoordinates]) =>
          !this.markRule.checkEmpty(board.marks[x][y]) &&
          this.markRule.checkSameShape(board.marks[x][y]!, markShape) &&
          this.markRule.checkProvider(board.marks[x][y]!) &&
          otherCoordinates.every(([x, y]) => this.markRule.checkEmpty(board.marks[x][y]))
      );
  }

  protected findRootCoordinate(board: Board): Coordinate[] {
    return board.coordinates.filter(([x, y]) => board.marks[x][y]?.type === 'root');
  }

  public handleAfterAction({ board }: Action): Board {
    const providerCoordinates = this.findRootCoordinate(board);
    const isProviderMark = board.marks.map((marks) => marks.map(() => false));
    const isProvidedMark = isProviderMark.map((isProviderMark) => [...isProviderMark]);

    for (const [x, y] of providerCoordinates) {
      isProviderMark[x][y] = true;
      isProvidedMark[x][y] = true;
    }

    for (const providerCoordinate of providerCoordinates) {
      const [px, py] = providerCoordinate;
      const playerMarkShape = board.marks[px][py]!.shape;

      const paths = relativePaths
        .map((relativePath) => this.getPaths(providerCoordinate, relativePath))
        .filter((path) => path.every(board.checkCoordinate))
        .filter(
          ([[x, y], ...otherCoordinates]) =>
            !this.markRule.checkEmpty(board.marks[x][y]) &&
            this.markRule.checkSameShape(board.marks[x][y]!, playerMarkShape) &&
            this.markRule.checkConsumer(board.marks[x][y]!) &&
            otherCoordinates.every(([x, y]) => this.markRule.checkEmpty(board.marks[x][y]))
        );

      for (const [coordinate] of paths) {
        const [x, y] = coordinate;

        if (!isProvidedMark[x][y]) {
          const action = { type: 'provide-mark', board, coordinate, playerMarkShape };

          board = this.markRule.handleProvide(action);

          const mark = board.marks[x][y];

          isProvidedMark[x][y] = true;

          isProviderMark[x][y] =
            !this.markRule.checkEmpty(mark) &&
            this.markRule.checkSameShape(mark, playerMarkShape) &&
            this.markRule.checkProvider(mark);

          if (isProviderMark[x][y]) {
            providerCoordinates.push(coordinate);
          }
        }
      }
    }

    const consumedCoordinates = board.coordinates.filter(([x, y]) => !isProvidedMark[x][y]);

    for (const coordinate of consumedCoordinates) {
      const [x, y] = coordinate;
      const playerMarkShape = board.marks[x][y]?.shape;

      if (playerMarkShape) {
        const action = { type: 'consume-mark', board, coordinate, playerMarkShape };
        board = this.markRule.handleConsume(action);
      }
    }

    return board;
  }
}

export default LinkRule;
