type maybeExists<T> = T | undefined;
type primitive = boolean | number | string;
type actual = primitive | object | symbol;
type defined = actual | null;
type JSONData<value = any> = { [name: string]: value };