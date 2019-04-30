export interface RelatiInfo {
    name: string;
    detail: string;
}
export declare type primitive = boolean | number | string;
export declare type actual = primitive | object | symbol | Function;
export declare type defined = actual | null;
export declare type JSONData<value = any> = {
    [name: string]: value;
};
