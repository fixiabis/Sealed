import Mark from './Mark';

interface Board {
  readonly checkCoordinate: (coordinate: Coordinate) => boolean;
  readonly coordinates: Coordinate[];
  readonly height: number;
  readonly marks: readonly (readonly (Mark | null)[])[];
  readonly width: number;
}

class Board {
  static create(width: number, height: number): Board {
    const marks = Array<null[]>(width)
      .fill(Array<null>(height).fill(null))
      .map((marks) => marks.map((mark) => mark));

    const coordinates = marks.reduce<Coordinate[]>(
      (coordinates, marks, x) => coordinates.concat(marks.map((_, y) => [x, y])),
      []
    );

    const checkCoordinate = ([x, y]: Coordinate) => x > -1 && x < width && y > -1 && y < height;

    return { checkCoordinate, coordinates, height, marks, width };
  }
}

export default Board;
