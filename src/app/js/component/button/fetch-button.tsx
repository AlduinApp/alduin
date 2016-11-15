import * as ReactDOM from "react-dom";
import * as React from "react";

import { ComponentsRefs } from "./../../components-refs";
import { Button } from "./button";

export class FetchButton extends Button<{}, {}> {

    constructor() {
        super();

        this.state = {
            isFetching: true
        };

        this.onClick = this.onClick.bind(this);
    }

    render() {
        return (
            <li>
                <i onClick={this.onClick} className="fa fa-download" aria-hidden="true"></i>
            </li>
        );
    }

    onClick(event: React.MouseEvent<HTMLElement>) {
        const target = event.currentTarget;
        this.switchDisplay(target);
        ComponentsRefs.feedList.fetchAll().then(() => {
            this.switchDisplay(target);
        });
    }

    switchDisplay(target: EventTarget & HTMLElement) {
        target.classList.toggle("fa-download");
        target.classList.toggle("fa-refresh");
        target.classList.toggle("fa-spin");
        target.classList.toggle("white-icon");
    }
}

interface FetchButtonState {
    isFetching: boolean;
}
