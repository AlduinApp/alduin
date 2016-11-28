import * as React from "react";

import { ComponentsRefs } from "./../../components-refs";
import { Button } from "./button";

export class FetchButton extends Button<{}, FetchButtonState> {

    constructor() {
        super();

        this.state = {
            isFetching: false
        };

        this.onClick = this.onClick.bind(this);
    }

    render() {
        return (
            <li>
                <i onClick={this.onClick} className="fa fa-download"></i>
            </li>
        );
    }

    onClick(event: React.MouseEvent<HTMLElement>) {
        if (!this.state.isFetching) {
            const target = event.currentTarget;
            this.switchDisplay(target);
            ComponentsRefs.feedList.fetchAll().then((result) => {
                if (result.success) ComponentsRefs.alertList.alert(`Successfully fetch ${result.success} feed${result.success > 1 ? "s" : ""}`, "success");
                if (result.fail) ComponentsRefs.alertList.alert(`Fail to fetch ${result.fail} feed${result.fail > 1 ? "s" : ""}`, "error");

                this.switchDisplay(target);
            });
        }
    }

    switchDisplay(target: EventTarget & HTMLElement) {
        target.classList.toggle("fa-download");
        target.classList.toggle("fa-refresh");
        target.classList.toggle("fa-spin");
        target.classList.toggle("white-icon");
        this.editState({ isFetching: !this.state.isFetching });
    }
}

interface FetchButtonState {
    isFetching: boolean;
}
