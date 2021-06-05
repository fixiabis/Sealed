import Board from '../../interfaces/Board';
import { MarkType } from '../../types/Mark';

class PlayerV1 {
  constructor(public readonly usedMarkShape: string) {}

  public mark(type: MarkType) {
    const shape = this.usedMarkShape;
    return { shape, type };
  }

  public makeRootPlacement(coordinate: Coordinate, board: Board) {
    const mark = this.mark('root');
    const playerMarkShape = this.usedMarkShape;
    return { board, coordinate, mark, playerMarkShape };
  }

  public makePlacement(coordinate: Coordinate, board: Board) {
    const mark = this.mark('node');
    const playerMarkShape = this.usedMarkShape;
    return { board, coordinate, mark, playerMarkShape };
  }
}

export default PlayerV1;
