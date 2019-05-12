import * as React from "react";
import { Color } from "csstype";

export type RelatiIconType = "allow" | "deny" | "check" | "play" | "question";

export interface RelatiIconProp {
    type: RelatiIconType;
    color: Color;
}

export class RelatiIcon extends React.Component<RelatiIconProp> {
    private _create(type: RelatiIconType, color: Color) {
        var iconAttr = {
            "d": "",
            "strokeWidth": "5",
            "stroke": color,
            "fill": "none"
        };

        switch (type) {
            case "allow":
                iconAttr["d"] = `
                    M 20 20
                    m 0 -10
                    a 10 10 0 0 1, 0  20
                    a 10 10 0 0 1, 0 -20
                `;
                break;
            case "deny":
                iconAttr["d"] = `
                    M 10 10 L 30 30
                    M 30 10 L 10 30
                `;
                break;
            case "check":
                iconAttr["d"] = `
                    M 10 20 L 15 30
                    L 30 10
                `;
                break;
            case "play":
                iconAttr["d"] = "M 10 10 L 40 25 L 10 40 Z";
                iconAttr["stroke"] = "none";
                iconAttr["fill"] = color;
                break;
        }

        return React.createElement("path", iconAttr);
    }

    render() {
        return (
            <svg width="40" height="40">{
                this._create(this.props.type, this.props.color)
            }</svg>
        );
    }
}