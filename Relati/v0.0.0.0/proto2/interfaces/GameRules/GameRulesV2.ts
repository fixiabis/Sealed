import LinkRuleV2 from '../../classes/rules/LinkRule/LinkRuleV2';
import PlacementRuleV2 from '../../classes/rules/PlacementRule/PlacementRuleV2';
import GameRulesV1 from './GameRulesV1';

interface GameRulesV2 extends GameRulesV1 {
  readonly placement: PlacementRuleV2;
  readonly link: LinkRuleV2;
}

export default GameRulesV2;
