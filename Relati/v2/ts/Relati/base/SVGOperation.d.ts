interface SVGElementAttribute {
    [attrName: string]: string
}

declare function createSVG<T extends keyof SVGElementTagNameMap>(
    svgTagName: T, attribute?: SVGElementAttribute
): SVGElementTagNameMap[T];

declare function updateSVG(
    svgElement: SVGElement, attribute: SVGElementAttribute
): void;