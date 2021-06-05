import Action from '../../../interfaces/player-actions/Action';
import Rule from '../../../interfaces/Rule';
import MarkRuleV1 from '../MarkRule/MarkRuleV1';
import { relativeCoordinates } from './utils';

class LinkRuleV1 implements Rule<Action> {
  constructor(protected markRule: MarkRuleV1) {}

  public checkValid({ board, coordinate, playerMarkShape }: Action): boolean {
    const [x, y] = coordinate;
    const providerCoordinates = relativeCoordinates.map<Coordinate>(([dx, dy]) => [x + dx, y + dy]);

    const hasProviderMark = providerCoordinates
      .map((coordinate) => ({ board, coordinate, playerMarkShape }))
      .some((action) => this.markRule.checkValidForProvideLink(action));

    return hasProviderMark;
  }
}

export default LinkRuleV1;
