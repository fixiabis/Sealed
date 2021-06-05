import Judge from '../../v1/Judge';
import Player from '../../v1/Player';
import Board from './Board';

interface Game<State extends {}> {
  readonly board: Board;
  readonly currentPlayer: Player | null;
  readonly isOver: boolean;
  readonly judge: Judge;
  readonly players: readonly Player[];
  readonly state: State;
  readonly winner: Player | null;
}

export default Game;
