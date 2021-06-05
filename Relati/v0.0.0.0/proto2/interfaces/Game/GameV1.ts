import JudgeV1 from '../../classes/Judge/JudgeV1';
import PlayerV1 from '../../classes/Player/PlayerV1';
import Board from '../Board';
import GameRulesV1 from '../GameRules/GameRulesV1';
import PlayerStateV1 from '../PlayerState/PlayerStateV1';

interface GameV1 {
  readonly board: Board;
  readonly currentPlayer: PlayerV1 | null;
  readonly isOver: boolean;
  readonly judge: JudgeV1;
  readonly players: readonly PlayerV1[];
  readonly playerStates: Readonly<Record<string, PlayerStateV1>>;
  readonly rules: GameRulesV1;
  readonly winner: PlayerV1 | null;
}

class GameV1 {
  static createPlayerStates(markShapes: string[]): GameV1['playerStates'] {
    return markShapes.reduce(
      (playerStates, markShape) => ({
        ...playerStates,
        [markShape]: { rootCoordinate: null },
      }),
      {} as GameV1['playerStates']
    );
  }

  static updatePlayerStates(
    markShape: string,
    partialPlayerState: Partial<PlayerStateV1>,
    playerStates: GameV1['playerStates']
  ) {
    const playerState = { ...playerStates[markShape], ...partialPlayerState };
    return { ...playerStates, [markShape]: playerState };
  }
}

export default GameV1;
