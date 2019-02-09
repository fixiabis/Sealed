type SVGElementAttribute = {
    [attrName: string]: string
};

function createSVG<T extends keyof SVGElementTagNameMap>(svgTagName: T, attribute?: SVGElementAttribute): SVGElementTagNameMap[T] {
    var svgElement: SVGElement = document.createElementNS("http://www.w3.org/2000/svg", svgTagName);
    if (attribute) updateSVG(svgElement, attribute);
    return svgElement;
}

function updateSVG(svgElement: SVGElement, attribute: SVGElementAttribute): void {
    for (var name in attribute) {
        var value: string = attribute[name];
        svgElement.setAttribute(name, value);
    }
}