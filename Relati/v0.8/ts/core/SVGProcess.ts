const SVGNS = "http://www.w3.org/2000/svg";
type SVGAttr = { [name: string]: string };

/**
 * 建立SVG元素
 * @param tagName SVG標籤名稱
 * @param attribute SVG屬性
 */
export function createSVG<T extends keyof SVGElementTagNameMap>(tagName: T, attribute?: SVGAttr): SVGElementTagNameMap[T] {
    let element = document.createElementNS(SVGNS, tagName);
    if (attribute) updateSVG(element, attribute);
    return element;
}

/**
 * 變更SVG屬性
 * @param element SVG元素
 * @param attribute SVG屬性
 */
export function updateSVG(element: SVGElement, attribute: SVGAttr) {
    for (let name in attribute) {
        element.setAttribute(name, attribute[name]);
    }
}