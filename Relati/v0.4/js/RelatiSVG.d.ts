declare type StringProp = {
    [name: string]: string;
};
declare type SVGTypeMap = SVGElementTagNameMap;
export declare function RelatiSVG<T extends keyof SVGTypeMap>(type: T, prop?: StringProp): SVGTypeMap[T];
export declare namespace RelatiSVG {
    var update: (element: SVGElement, prop: StringProp) => void;
    var empty: (element: SVGElement) => void;
}
export {};
