import GameRulesV2 from '../GameRules/GameRulesV2';
import GameV1 from './GameV1';

interface GameV2 extends GameV1 {
  readonly rules: GameRulesV2;
}

class GameV2 extends GameV1 {}

export default GameV2;
