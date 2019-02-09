function createSVG<T extends keyof SVGElementTagNameMap>(tagName: T, attribute?: { [name: string]: string }): SVGElementTagNameMap[T] {
    var element: SVGElement = document.createElementNS("http://www.w3.org/2000/svg", tagName);
    if (attribute) updateSVG(element, attribute);
    return element;
}

function updateSVG(element: SVGElement, attribute: { [name: string]: string }): void {
    for (var name in attribute) {
        var value: string = attribute[name]
        element.setAttribute(name, value);
    }
}