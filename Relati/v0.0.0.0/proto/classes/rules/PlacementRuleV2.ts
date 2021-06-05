import CoordinateChecker from '../checkers/CoordinateChecker';
import MarkRule from './MarkRule';
import LinkRuleV2 from './LinkRuleV2';
import PlacementRule from './PlacementRule';

class PlacementRuleV2 extends PlacementRule {
  constructor(
    protected coordinateChecker: CoordinateChecker,
    protected linkRule: LinkRuleV2,
    protected markRule: MarkRule
  ) {
    super(coordinateChecker, linkRule, markRule);
  }
}

export default PlacementRuleV2;
