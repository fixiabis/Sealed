type Coordinate = readonly [number, number];

type Path<T> = readonly T[];

type Mutable<T> = {
  -readonly [P in keyof T]: T[P];
};
