import * as React from "react";
import { RelatiGrid, RelatiRuleTrace } from "../../relati/Relati";

export interface RelatiPathLineProp {
    sourceGrid: RelatiGrid;
    trace: RelatiRuleTrace;
    color: string;
}

export class RelatiPathLine extends React.Component<RelatiPathLineProp> {
    render() {
        var { trace, sourceGrid, color } = this.props;
        var targetGrid = trace.target;

        var pathAttr = {
            "d": `M ${sourceGrid.x * 5 + 2.5} ${sourceGrid.y * 5 + 2.5}`,
            "strokeWidth": "0.5",
            "stroke": color,
            "fill": "none",
            "className": "relati-path"
        };

        for (var grid of trace.routes) {
            pathAttr["d"] += ` L ${grid.x * 5 + 2.5} ${grid.y * 5 + 2.5}`;
        }

        pathAttr["d"] += ` L ${targetGrid.x * 5 + 2.5} ${targetGrid.y * 5 + 2.5}`;

        return React.createElement("path", pathAttr);
    }
}