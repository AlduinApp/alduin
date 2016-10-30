import * as ReactDOM from "react-dom";
import * as React from "react";

import { CustomComponent } from "./../../custom-component";
import { Button } from "./button";
import {AddFeedModal} from "./../modal/add-feed-modal";

export class AddFeedOpenModalButton extends Button<{}, {}> {

    public modal: AddFeedModal;

    constructor() {
        super();
        this.onClick = this.onClick.bind(this);
    }

    render() {
        return (
            <li id="add-feed-button" onClick={this.onClick}>
                <i className="fa fa-plus" aria-hidden="true"></i>
            </li>
        );
    }
    onClick(event: React.MouseEvent<HTMLElement>) {
        this.modal.display();
    }
}
