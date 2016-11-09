import * as React from "react";

import { ComponentsRefs } from "./../../components-refs";
import { Button } from "./button";

export class AddFeedOpenModalButton extends Button<{}, {}> {

    constructor() {
        super();

        this.onClick = this.onClick.bind(this);

        ComponentsRefs.addFeedOpenModalButton = this;
    }

    render() {
        return (
            <li id="add-feed-button" onClick={this.onClick}>
                <i className="fa fa-plus" aria-hidden="true"></i>
            </li>
        );
    }
    onClick(event: React.MouseEvent<HTMLElement>) {
        ComponentsRefs.addFeedModal.display();
    }
}
