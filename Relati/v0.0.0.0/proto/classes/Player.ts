import Board from '../interfaces/Board';
import CannonAttack from '../interfaces/CannonAttack';
import CannonChange from '../interfaces/CannonChange';
import Mark from '../interfaces/Mark';
import Placement from '../interfaces/Placement';
import RootMovement from '../interfaces/RootMovement';
import { MarkType } from '../types/Mark';

class Player {
  constructor(public readonly usedMarkShape: string) {}

  public mark(type: MarkType): Mark {
    const shape = this.usedMarkShape;
    return { shape, type, shellsUsed: 0 };
  }

  public makeFirstPlacement(coordinate: Coordinate, board: Board): Placement {
    const mark = this.mark('root');
    return { board, coordinate, mark };
  }

  public makePlacement(coordinate: Coordinate, board: Board): Placement {
    const mark = this.mark('node');
    return { board, coordinate, mark };
  }

  public makeCannonChange(coordinate: Coordinate, board: Board): CannonChange {
    return { board, coordinate };
  }

  public makeCannonAttack(
    coordinate: Coordinate,
    direction: Coordinate,
    board: Board
  ): CannonAttack {
    return { board, coordinate, direction };
  }

  public makeRootMovement(coordinate: Coordinate, board: Board): RootMovement {
    return { board, coordinate };
  }
}

export default Player;
