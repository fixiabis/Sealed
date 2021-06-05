import GameRulesV3 from '../GameRules/GameRulesV3';
import PlayerStateV2 from '../PlayerState/PlayerStateV2';
import GameV2 from './GameV2';

interface GameV3 extends GameV2 {
  readonly playerStates: Readonly<Record<string, PlayerStateV2>>;
  readonly rules: GameRulesV3;
}

class GameV3 extends GameV2 {
  static createPlayerStates(markShapes: string[]): GameV3['playerStates'] {
    const playerStates = super.createPlayerStates(markShapes) as GameV3['playerStates'];

    for (const markShape of markShapes) {
      playerStates[markShape].actionsRemaining = 0;
    }

    return playerStates;
  }
}

export default GameV3;
