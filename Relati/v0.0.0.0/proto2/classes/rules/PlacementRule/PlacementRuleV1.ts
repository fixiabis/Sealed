import Placement from '../../../interfaces/player-actions/Placement';
import Rule from '../../../interfaces/Rule';
import LinkRuleV1 from '../LinkRule/LinkRuleV1';
import MarkRuleV1 from '../MarkRule/MarkRuleV1';

class PlacementRuleV1 implements Rule<Placement> {
  constructor(protected markRule: MarkRuleV1, protected linkRule: LinkRuleV1) {}

  public checkValid(action: Placement) {
    return this.markRule.checkValidForPlacement(action) && this.linkRule.checkValid(action);
  }

  public checkValidForRoot(action: Placement) {
    return this.markRule.checkValidForPlacement(action);
  }

  public handleAction({ board, coordinate, mark }: Placement) {
    const [x, y] = coordinate;
    const marks = board.marks.map((marks) => [...marks]);
    marks[x][y] = mark;
    return { ...board, marks };
  }
}

export default PlacementRuleV1;
