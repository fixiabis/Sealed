import Judge from '../classes/judges/Judge';
import Player from '../classes/Player';
import Board from './Board';
import PlayerState from './PlayerState';

interface Game {
  readonly board: Board;
  readonly currentPlayer: Player | null;
  readonly isOver: boolean;
  readonly judge: Judge;
  readonly players: readonly Player[];
  readonly playerStates: Readonly<Record<Player['usedMarkShape'], PlayerState>>;
  readonly winner: Player | null;
}

class Game {
  static createPlayerStates(markShapes: string[]): Game['playerStates'] {
    return markShapes.reduce(
      (playerStates, markShape) => ({
        ...playerStates,
        [markShape]: {
          rootCoordinate: null,
          actionRemaining: 0,
          isCannonAttacking: false,
        },
      }),
      {} as Game['playerStates']
    );
  }

  static updatePlayerStates(
    markShape: string,
    partialPlayerState: Partial<PlayerState>,
    playerStates: Game['playerStates']
  ) {
    const playerState = { ...playerStates[markShape], ...partialPlayerState };
    return { ...playerStates, [markShape]: playerState };
  }
}

export default Game;
