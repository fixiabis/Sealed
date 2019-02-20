import * as React from "react";
import { Color } from "csstype";
import { RelatiIcon, RelatiIconType } from "./RelatiIcon";

export interface RelatiButtonProp {
    iconType: RelatiIconType
    iconColor: Color;
    buttonColor: Color;
    onClick?: React.MouseEventHandler
}

export class RelatiButton extends React.Component<RelatiButtonProp> {
    render() {
        return (
            <div className="relati-button" style={{
                width: 40,
                height: 40,
                backgroundColor: this.props.buttonColor,
                borderRadius: 5
            }} onClick={this.props.onClick}>
                <RelatiIcon type={this.props.iconType} color={this.props.iconColor} />
            </div>
        );
    }
}