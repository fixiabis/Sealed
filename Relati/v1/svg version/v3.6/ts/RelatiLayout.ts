class RelatiBackground extends GridBoardView {
    public lineAttribute = {
        "d": "",
        "stroke": "#888",
        "stroke-width": "0.4",
        "fill": "none"
    };

    constructor(public board: RelatiBoard) { super(); }

    render(viewerBody: SVGSVGElement) {
        var { board, lineAttribute } = this;

        for (var d = 1; d < 9; d++) {
            var lineX: SVGPathElement = createSVG("path");
            var lineY: SVGPathElement = createSVG("path");

            for (var s = 1; s < 4; s++) {
                lineAttribute.d = `M ${d * 5} 0 V ${board.width * 5 * s / 3}`;
                updateSVG(lineX, lineAttribute);
                viewerBody.appendChild(lineX);

                lineAttribute.d = `M 0 ${d * 5} H ${board.height * 5 * s / 3}`;
                updateSVG(lineY, lineAttribute);
                viewerBody.appendChild(lineY);

                if ((d - 1) * 3 + (s - 1) == this.status) {
                    return this.status++;
                }
            }
        }
    }
}

interface RelatiGridSymbol {
    grid: RelatiGrid;
    srtX: number;
    srtY: number;
    endX: number;
    endY: number;
    next: string;
}

class RelatiGridSymbol extends GridBoardView implements RelatiGridSymbol {
    public symbolAttribute = {
        "d": "",
        "stroke-width": "0.6",
        "stroke": "",
        "fill": "none",
        "stroke-dasharray": ""
    };

    constructor(public grid: RelatiGrid) {
        super();
        this.srtX = grid.x * 5 + 1;
        this.srtY = grid.y * 5 + 1;
        this.endX = grid.x * 5 + 4;
        this.endY = grid.y * 5 + 4;
    }

    render(viewerBody: SVGSVGElement) {
        this.symbolAttribute["stroke-width"] = "0.6";

        switch (this.grid.symbol) {
            case "O":
                this.drawO(viewerBody);
                break;
            case "X":
                this.drawX(viewerBody);
                break;
            default:
                if (!this.next) this.status = 0;
                else this.drawDot(viewerBody);
                break;
        }
    }

    drawO(viewerBody: SVGSVGElement) {
        var { symbolAttribute, grid, status, srtX, srtY, endX, endY } = this;

        symbolAttribute.stroke = grid.is("forbid")
            ? "#666"
            : grid.is("broken|defeat")
                ? "#bbb"
                : "crimson";

        symbolAttribute.d = `
            M ${srtX + 1.5} ${srtY + 1.5}
            m 0 -1.5
            a 1.5 1.5 0 0 1, 0 3
            a 1.5 1.5 0 0 1, 0 -3
        `;

        symbolAttribute["stroke-dasharray"] = `${
            Math.PI * 3 / 100 * this.status
            } ${Math.PI * 3}`;

        if (grid.is("source|defeat")) {
            symbolAttribute["stroke-width"] = "1";
            viewerBody.appendChild(createSVG("path", symbolAttribute));
            symbolAttribute.stroke = "#f2f2f2";
            symbolAttribute["stroke-width"] = "0.5";
            viewerBody.appendChild(createSVG("path", symbolAttribute));
        } else {
            viewerBody.appendChild(createSVG("path", symbolAttribute));
        }

        if (status == 100) return;
        return this.status += 10;
    }

    drawX(viewerBody: SVGSVGElement) {
        var { symbolAttribute, grid, status, srtX, srtY, endX, endY } = this;

        symbolAttribute.stroke = grid.status == "forbid"
            ? "#666"
            : grid.is("broken|defeat")
                ? "#bbb"
                : "royalblue";

        symbolAttribute.d = `
            M ${srtX} ${srtY} L ${endX} ${endY}
            M ${endX} ${srtY} L ${srtX} ${endY}
        `;

        symbolAttribute["stroke-dasharray"] = `${
            (endX - srtX + endY - srtY) / 100 * this.status % 50
            } ${endX - srtX + endY - srtY}`;

        if (grid.is("source|defeat")) {
            symbolAttribute["stroke-width"] = "1";
            viewerBody.appendChild(createSVG("path", symbolAttribute));
            symbolAttribute.stroke = "#f2f2f2";
            symbolAttribute["stroke-width"] = "0.5";
            viewerBody.appendChild(createSVG("path", symbolAttribute));
        } else {
            viewerBody.appendChild(createSVG("path", symbolAttribute));
        }

        if (status == 100) return;
        return this.status += 10;
    }

    drawDot(viewerBody: SVGSVGElement) {
        var { grid, next } = this;

        viewerBody.appendChild(createSVG("circle", {
            "cx": `${grid.x * 5 + 2.5}`,
            "cy": `${grid.y * 5 + 2.5}`,
            "r": "0.4",
            "fill": next == "O" ? "crimson" : "royalblue"
        }));
    }
}