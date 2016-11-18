import * as React from "react";

import { ComponentsRefs } from "./../../components-refs";
import { Button } from "./button";

export class SwitchButton extends Button<{}, {}> {

    constructor() {
        super();

        this.onClick = this.onClick.bind(this);

        ComponentsRefs.switchButton = this;
    }

    render() {
        return (
            <div className="switch button" onClick={this.onClick}>
                <i className="fa fa-arrow-left"></i>
            </div>
        );
    }
    onClick(event: React.MouseEvent<HTMLElement>) {
        document.querySelector("body").classList.remove("show-article");
    }
}
