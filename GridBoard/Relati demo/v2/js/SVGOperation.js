"use strict";
function createSVG(svgTagName, attribute) {
    var svgElement = document.createElementNS("http://www.w3.org/2000/svg", svgTagName);
    if (attribute)
        updateSVG(svgElement, attribute);
    return svgElement;
}
function updateSVG(svgElement, attribute) {
    for (var name in attribute) {
        var value = attribute[name];
        svgElement.setAttribute(name, value);
    }
}
//# sourceMappingURL=SVGOperation.js.map