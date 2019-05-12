type maybeExists<T> = T | undefined;
type primitive = boolean | number | string;
type actual = primitive | object | symbol;
type defined = actual | null;