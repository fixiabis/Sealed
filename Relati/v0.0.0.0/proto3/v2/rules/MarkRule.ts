import Action from '../../shared/interfaces/Action';
import Mark from '../../shared/interfaces/Mark';
import MarkRuleV1 from '../../v1/rules/MarkRule';

class MarkRule extends MarkRuleV1 {
  public checkProvider({ type }: Mark): boolean {
    return type === 'root' || type === 'node';
  }

  public checkConsumer({ type }: Mark): boolean {
    return type === 'missing-node' || type === 'node';
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

export default MarkRule;
