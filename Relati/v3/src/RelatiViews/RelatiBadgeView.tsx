import * as React from "react";
import { RelatiGrid } from "../../relati/Relati";

export interface RelatiBadgeViewProp {
    grid: RelatiGrid;
}

export class RelatiBadgeView extends React.Component<RelatiBadgeViewProp> {
    render() {
        var grid = this.props.grid;
        var badge: JSX.Element[] = [];

        var srtX = grid.x * 5 + 1;
        var srtY = grid.y * 5 + 1;
        var endX = grid.x * 5 + 4;
        var endY = grid.y * 5 + 4;

        var badgeAttr = {
            "d": "",
            "strokeWidth": "0.6",
            "stroke": "",
            "fill": "none",
            "key": "1"
        };

        if (!grid.role) return <g key={grid.coordinate}>{badge}</g>;

        switch (grid.role.owner.badge) {
            case "O":
                badgeAttr["d"] = `
                    M ${srtX + 1.5} ${srtY + 1.5}
                    m 0 -1.5
                    a 1.5 1.5 0 0 1, 0 3
                    a 1.5 1.5 0 0 1, 0 -3
                `;
                badgeAttr["stroke"] = "crimson";
                break;
            case "X":
                badgeAttr["d"] = `
                    M ${srtX} ${srtY} L ${endX} ${endY}
                    M ${endX} ${srtY} L ${srtX} ${endY}
                `;
                badgeAttr["stroke"] = "royalblue";
                break;
        }

        if (grid.role.is("relati-launcher")) {
            badgeAttr["strokeWidth"] = "1";
            badge.push(React.createElement("path", badgeAttr));
            badgeAttr["key"] = "2";
            badgeAttr["stroke"] = "#f2f2f2";
            badgeAttr["strokeWidth"] = "0.5";
            badge.push(React.createElement("path", badgeAttr));
        } else if (grid.role.is("relati-repeater")) {
            badge.push(React.createElement("path", badgeAttr));
        } else {
            badgeAttr["stroke"] = "#666";
            badge.push(React.createElement("path", badgeAttr));
        }

        return <g key={grid.coordinate}>{badge}</g>;
    }
}