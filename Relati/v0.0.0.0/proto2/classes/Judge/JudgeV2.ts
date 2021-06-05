import Board from '../../interfaces/Board';
import GameV2 from '../../interfaces/Game/GameV2';
import GameRulesV2 from '../../interfaces/GameRules/GameRulesV2';
import Placement from '../../interfaces/player-actions/Placement';
import PlayerV1 from '../Player/PlayerV1';
import JudgeV1 from './JudgeV1';

class JudgeV2 extends JudgeV1 {
  public startGame(players: PlayerV1[], board: Board, rules: GameRulesV2): GameV2 {
    return super.startGame(players, board, rules) as GameV2;
  }

  public endGame(game: GameV2, winner: PlayerV1 | null): GameV2 {
    return super.endGame(game, winner) as GameV2;
  }

  public endGameOrChangeCurrentPlayer(game: GameV2): GameV2 {
    return super.endGameOrChangeCurrentPlayer(game) as GameV2;
  }

  public handleRootPlacement(placement: Placement, game: GameV2): GameV2 {
    return super.handleRootPlacement(placement, game) as GameV2;
  }

  public handlePlacement(placement: Placement, game: GameV2): GameV2 {
    const handledGame = super.handlePlacement(placement, game) as GameV2;
    const board = game.rules.link.handleAction({ ...placement, board: handledGame.board });
    return { ...handledGame, board };
  }
}

export default JudgeV2;
