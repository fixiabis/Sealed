import Placement from '../../v1/actions/Placement';
import PlacementRuleV1 from '../../v1/rules/PlacementRule';
import LinkRule from './LinkRule';

class PlacementRule extends PlacementRuleV1 {
  constructor(protected linkRule: LinkRule) {
    super(linkRule);
  }

  public checkAvailable({ board, coordinate, playerMarkShape }: Placement): boolean {
    return this.linkRule.checkSameShapeProviderNearby(coordinate, board, playerMarkShape);
  }
}

export default PlacementRule;
