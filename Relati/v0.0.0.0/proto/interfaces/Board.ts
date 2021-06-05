import Mark from './Mark';

interface Board {
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

    return { coordinates, height, marks, width };
  }

  static placeMark(mark: Mark | null, coordinate: Coordinate, board: Board): Board {
    const [x, y] = coordinate;
    const marks = board.marks.map((marks) => marks.map((mark) => mark));
    marks[x][y] = mark;
    return { ...board, marks };
  }

  static stringify(board: Board): string {
    const decorations = {
      ['root']: ['[', ']'],
      ['node']: [' ', ' '],
      ['missing-node']: ['-', '-'],
      ['cannon-node']: ['*', '*'],
      ['exhausted-cannon-node']: ['*', '/'],
      ['dead-root']: ['[', '='],
      ['dead-node']: ['=', '='],
      ['dead-cannon-node']: ['*', '='],
    };

    return (
      '|' +
      board.marks[0]
        .map((_, y) =>
          board.marks
            .map((_, x) => board.marks[x][y] || { type: 'node', shape: ' ' })
            .map(({ shape, type }) => {
              const [leftDeco, rightDeco] = decorations[type as keyof typeof decorations];

              return leftDeco + shape + rightDeco;
            })
            .join('|')
        )
        .join('|\n|') +
      '|'
    );
  }
}

export default Board;
