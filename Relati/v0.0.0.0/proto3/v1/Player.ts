import Board from '../shared/interfaces/Board';
import Mark from '../shared/interfaces/Mark';
import { MarkType } from '../shared/types/Mark';
import Placement from './actions/Placement';

class Player {
  constructor(public readonly usedMarkShape: string) {}

  public mark(type: MarkType): Mark {
    const shape = this.usedMarkShape;
    return { shape, type };
  }

  public makeRootPlacement(coordinate: Coordinate, board: Board): Placement {
    const mark = this.mark('root');
    const playerMarkShape = this.usedMarkShape;
    const type = 'root-placement';
    return { board, coordinate, mark, playerMarkShape, type };
  }

  public makePlacement(coordinate: Coordinate, board: Board): Placement {
    const mark = this.mark('node');
    const playerMarkShape = this.usedMarkShape;
    const type = 'placement';
    return { board, coordinate, mark, playerMarkShape, type };
  }
}

export default Player;
