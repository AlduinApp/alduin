import * as React from "react";

import { ComponentsRefs } from "./../../components-refs";
import { Button } from "./button";

export class PinSidebarButton extends Button<{}, {}> {

    constructor() {
        super();
        this.onClick = this.onClick.bind(this);
    }

    render() {
        return (
            <li id="pin-button" onClick={this.onClick}>
                <i className="fa fa-thumb-tack" aria-hidden="true"></i>
            </li>
        );
    }
    onClick(event: React.MouseEvent<HTMLElement>) {
        ComponentsRefs.sidebar.togglePin();
    }
}
