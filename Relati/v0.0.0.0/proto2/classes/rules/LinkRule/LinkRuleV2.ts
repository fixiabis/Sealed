import Board from '../../../interfaces/Board';
import Action from '../../../interfaces/player-actions/Action';
import MarkRuleV2 from '../MarkRule/MarkRuleV2';
import LinkRuleV1 from './LinkRuleV1';
import { relativePaths } from './utils';

class LinkRuleV2 extends LinkRuleV1 {
  constructor(protected markRule: MarkRuleV2) {
    super(markRule);
  }

  public getValidPaths([x, y]: Coordinate, board: Board) {
    return relativePaths
      .map((relativePaths) => relativePaths.map<Coordinate>(([dx, dy]) => [x + dx, y + dy]))
      .filter((paths) => paths.every((coordinate) => Board.checkCoordinate(coordinate, board)));
  }

  public getAvailablePaths(coordinate: Coordinate, board: Board, playerMarkShape: string) {
    return this.getValidPaths(coordinate, board).filter(([, ...coordinates]) =>
      coordinates
        .map((coordinate) => ({ board, coordinate, playerMarkShape }))
        .every((action) => this.markRule.checkValidForLinkPath(action))
    );
  }

  public checkValid({ board, coordinate, playerMarkShape }: Action): boolean {
    return this.getAvailablePaths(coordinate, board, playerMarkShape).some(([coordinate]) =>
      this.markRule.checkValidForProvideLink({ board, coordinate, playerMarkShape })
    );
  }

  public findRootCoordinate(board: Board): Coordinate[] {
    return board.coordinates.filter(([x, y]) => board.marks[x][y]?.type === 'root');
  }

  public handleAction({ board }: Action): Board {
    const providerCoordinates = this.findRootCoordinate(board);
    const isProviderMark = board.marks.map((marks) => marks.map(() => false));
    const isProvidedMark = isProviderMark.map((isProviderMark) => [...isProviderMark]);

    for (const [x, y] of providerCoordinates) {
      isProviderMark[x][y] = true;
      isProvidedMark[x][y] = true;
    }

    for (const providerCoordinate of providerCoordinates) {
      const playerMarkShape = this.markRule.getMarkShape(providerCoordinate, board)!;

      const paths = this.getAvailablePaths(providerCoordinate, board, playerMarkShape).filter(
        ([coordinate]) =>
          this.markRule.checkValidForConsumeLink({ board, coordinate, playerMarkShape })
      );

      for (const [coordinate] of paths) {
        const [x, y] = coordinate;

        if (!isProvidedMark[x][y]) {
          const action = { board, coordinate, playerMarkShape };

          board = this.markRule.handleProvide(action);

          isProvidedMark[x][y] = true;

          isProviderMark[x][y] =
            board.marks[x][y] !== null && this.markRule.checkValidForProvideLink(action);

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
        const action = { board, coordinate, playerMarkShape };
        board = this.markRule.handleConsume(action);
      }
    }

    return board;
  }
}

export default LinkRuleV2;
