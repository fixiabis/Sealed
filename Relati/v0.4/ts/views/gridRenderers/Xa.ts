import { RelatiGridRenderer } from "../RelatiBoardView";
import { RelatiSVG } from "../../RelatiSVG";
import { RelatiGrid } from "../../RelatiBoard";

export var Xa: RelatiGridRenderer = {
    render(grid: RelatiGrid, gridSize: number) {
        if (!grid.role || grid.role.owner.badge != "X") return;
        var gridViews = RelatiSVG("g");
        var gridViewProp = {
            "d": "",
            "stroke": "royalblue",
            "stroke-width": `${gridSize * 0.12}`,
            "fill": "none"
        };

        var srtX = (grid.x + 0.2) * gridSize;
        var srtY = (grid.y + 0.2) * gridSize;
        var endX = (grid.x + 0.8) * gridSize;
        var endY = (grid.y + 0.8) * gridSize;

        gridViewProp["d"] = `
                M ${srtX} ${srtY} L ${endX} ${endY}
                M ${endX} ${srtY} L ${srtX} ${endY}
            `;

        if (grid.role.is("relati-launcher")) {
            gridViewProp["stroke-width"] = `${gridSize * 0.2}`;
            gridViews.appendChild(RelatiSVG("path", gridViewProp));
            gridViewProp["stroke"] = "#f2f2f2";
            gridViewProp["stroke-width"] = `${gridSize * 0.1}`;
            gridViews.appendChild(RelatiSVG("path", gridViewProp));
        } else if (grid.role.is("relati-repeater")) {
            gridViews.appendChild(RelatiSVG("path", gridViewProp));
        } else {
            gridViewProp["stroke"] = "#666";
            gridViews.appendChild(RelatiSVG("path", gridViewProp));
        }

        return gridViews;
    }
};