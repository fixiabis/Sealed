import Board from '../../../interfaces/Board';
import Action from '../../../interfaces/player-actions/Action';
import MarkRuleV1 from './MarkRuleV1';

class MarkRuleV2 extends MarkRuleV1 {
  public checkValidForLinkPath({ board, coordinate }: Action) {
    const [x, y] = coordinate;
    return board.marks[x][y] === null;
  }

  public checkValidForConsumeLink({ board, coordinate, playerMarkShape }: Action) {
    const [x, y] = coordinate;
    const mark = board.marks[x][y];
    const isSameShape = mark?.shape === playerMarkShape;
    const isConsumeType = mark?.type === 'node' || mark?.type === 'missing-node';
    return isSameShape && isConsumeType;
  }

  public getMarkShape(coordinate: Coordinate, board: Board) {
    const [x, y] = coordinate;
    return board.marks[x][y]?.shape;
  }

  public handleProvide({ board, coordinate, playerMarkShape }: Action) {
    const [x, y] = coordinate;
    const mark = board.marks[x][y];

    if (mark?.type === 'missing-node' && mark.shape === playerMarkShape) {
      const marks = board.marks.map((marks) => [...marks]);
      marks[x][y] = { ...mark, type: 'node' };
      return { ...board, marks };
    }

    return board;
  }

  public handleConsume({ board, coordinate }: Action) {
    const [x, y] = coordinate;
    const mark = board.marks[x][y]!;

    if (mark?.type === 'node') {
      const marks = board.marks.map((marks) => [...marks]);
      marks[x][y] = { ...mark, type: 'missing-node' };
      return { ...board, marks };
    }

    return board;
  }
}

export default MarkRuleV2;
