export interface RelatiInfo {
    name: string;
    detail: string;
}

export type primitive = boolean | number | string;
export type actual = primitive | object | symbol | Function;
export type defined = actual | null;
export type JSONData<value = any> = { [name: string]: value };