type StringProp = { [name: string]: string };
type SVGTypeMap = SVGElementTagNameMap;

const SVGNS = "http://www.w3.org/2000/svg";

export function RelatiSVG<T extends keyof SVGTypeMap>(type: T, prop: StringProp = {}): SVGTypeMap[T] {
    var element: SVGElement = document.createElementNS(SVGNS, type);
    RelatiSVG.update(element, prop);
    return element;
}

RelatiSVG.update = function (element: SVGElement, prop: StringProp) {
    for (var name in prop) element.setAttribute(name, prop[name]);
};

RelatiSVG.empty = function (element: SVGElement) {
    var count = element.childNodes.length;
    while (count--) element.removeChild(element.childNodes[0]);
};