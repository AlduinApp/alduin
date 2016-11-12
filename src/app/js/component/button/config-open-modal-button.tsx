import * as React from "react";

import { ComponentsRefs } from "./../../components-refs";
import { Button } from "./button";

export class ConfigOpenModalButton extends Button<{}, {}> {

    constructor() {
        super();

        this.onClick = this.onClick.bind(this);
    }

    render() {
        return (
            <li id="configuration-button" className="active" onClick={this.onClick}>
                <i className="fa fa-cog" aria-hidden="true"></i>
            </li>
        );
    }

    onClick(event: React.MouseEvent<HTMLElement>) {
        ComponentsRefs.configModal.display();
    }
}


