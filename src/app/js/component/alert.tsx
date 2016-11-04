import * as ReactDOM from "react-dom";
import * as React from "react";

import { CustomComponent } from "./../custom-component";
import { AlertType } from "./alert-list";

export class Alert extends CustomComponent<AlertProps, {}> {
    constructor(props: AlertProps) {
        super();

        this.props = props;
    }
    
    render() {
        return (
            <li className={this.props.alertType}>{this.props.message}</li>
        );
    }
}

export interface AlertProps {
    uuid: string;
    message: string;
    alertType: AlertType;
}
