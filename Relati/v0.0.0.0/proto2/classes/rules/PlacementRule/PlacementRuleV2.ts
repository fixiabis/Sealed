import LinkRuleV2 from '../LinkRule/LinkRuleV2';
import MarkRuleV2 from '../MarkRule/MarkRuleV2';
import PlacementRuleV1 from './PlacementRuleV1';

class PlacementRuleV2 extends PlacementRuleV1 {
  constructor(protected markRule: MarkRuleV2, protected linkRule: LinkRuleV2) {
    super(markRule, linkRule);
  }
}

export default PlacementRuleV2;
