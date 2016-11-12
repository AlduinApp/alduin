import * as React from "react";

import { CustomComponent } from "./../../custom-component";
import { ComponentsRefs } from "./../../components-refs";

export class ConfigModal extends CustomComponent<{}, ConfigModalState> {

    constructor() {
        super();

        this.state = {
            open: false
        };

        this.handleHide = this.handleHide.bind(this);

        ComponentsRefs.configModal = this;
    }

    render() {
        return (
            <div id="add-feed-modal" className="modal" style={{ display: this.state.open ? "" : "none" }}>
                <div className="content">
                    <i className="fa fa-times close-modal-button" aria-hidden="true" onClick={this.handleHide}></i>
                    <h3>Configuration</h3>
                    <div className="scroll view">
                    </div>
                </div>
            </div>
        );
    }

    handleHide(event: React.MouseEvent<HTMLElement>) {
        this.hide();
    }

    display() {
        this.editState({ open: true });
    }
    hide() {
        this.editState({ open: false });
    }
}

interface ConfigModalState {
    open: boolean;
}
