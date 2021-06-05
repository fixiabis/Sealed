import CoordinateChecker from '../checkers/CoordinateChecker';
import LinkRuleV2 from './LinkRuleV2';
import MarkRuleV2 from './MarkRuleV2';
import PathRuleV2 from './PathRuleV2';

class LinkRuleV3 extends LinkRuleV2 {
  constructor(
    protected coordinateChecker: CoordinateChecker,
    protected markRule: MarkRuleV2,
    protected pathRule: PathRuleV2
  ) {
    super(coordinateChecker, markRule, pathRule);
  }
}

export default LinkRuleV3;
