import ContinualActionsRule from '../../classes/rules/ContinualActionsRule';
import GameRulesV2 from './GameRulesV2';

interface GameRulesV3 extends GameRulesV2 {
  continualActions: ContinualActionsRule;
}

export default GameRulesV3;
