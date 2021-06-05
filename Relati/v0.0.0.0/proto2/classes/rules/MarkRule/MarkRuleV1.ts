import Action from '../../../interfaces/player-actions/Action';
import Rule from '../../../interfaces/Rule';

class MarkRuleV1 implements Rule<Action> {
  public checkValid({ board, coordinate }: Action) {
    const [x, y] = coordinate;
    return board.marks[x][y] !== null;
  }

  public checkValidForPlacement(action: Action) {
    return !this.checkValid(action);
  }

  public checkValidForProvideLink({ board, coordinate, playerMarkShape }: Action) {
    const [x, y] = coordinate;
    const mark = board.marks[x][y];
    const isSameShape = mark?.shape === playerMarkShape;
    const isProviderType = mark?.type === 'root' || mark?.type === 'node';
    return isSameShape && isProviderType;
  }
}

export default MarkRuleV1;
