import * as React from "react";
import { RelatiButton, RelatiButtonProp } from "./RelatiButton";

export interface RelatiMessageBoxProp {
    message: string;
    buttonTypes?: RelatiButtonProp[];
}

export class RelatiMessageBox extends React.Component<RelatiMessageBoxProp> {
    render() {
        return (
            <div className="relati-message-box">
                <div className="message-content">{this.props.message}</div>
                <div className="message-buttons">{this.props.buttonTypes.map(
                    buttonType => React.createElement(RelatiButton, buttonType)
                )}</div>
            </div>
        );
    }
}