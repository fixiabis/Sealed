import { RelatiGridRenderer } from "../RelatiBoardView";
import { RelatiSVG } from "../../RelatiSVG";
import { RelatiGrid } from "../../RelatiBoard";

export var Od: RelatiGridRenderer = {
    render(grid: RelatiGrid, gridSize: number) {
        if (!grid.role || grid.role.owner.badge != "O") return;

        var srtX = (grid.x + 0.2) * gridSize;
        var srtY = (grid.y + 0.2) * gridSize;
        var endX = (grid.x + 0.8) * gridSize;
        var endY = (grid.y + 0.8) * gridSize;

        var gridViews = RelatiSVG("g");
        var gridViewProp = {
            "d": `
                M ${srtX + 1.5} ${srtY + 1.5}
                m 0 -1.5
                a 1.5 1.5 0 0 1, 0 3
                a 1.5 1.5 0 0 1, 0 -3
            `,
            "stroke": "crimson",
            "stroke-width": `${gridSize * 0.12}`,
            "fill": "none"
        };
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