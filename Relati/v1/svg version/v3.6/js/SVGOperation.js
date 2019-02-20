"use strict";
function createSVG(tagName, attribute) {
    var element = document.createElementNS("http://www.w3.org/2000/svg", tagName);
    if (attribute)
        updateSVG(element, attribute);
    return element;
}
function updateSVG(element, attribute) {
    for (var name in attribute) {
        var value = attribute[name];
        element.setAttribute(name, value);
    }
}
