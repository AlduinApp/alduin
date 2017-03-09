import * as React from "react";
import * as fs from "fs";
import * as path from "path";
import { remote } from "electron";

import { CustomComponent } from "./../custom-component";
import { ComponentsRefs } from "./../../components-refs";
import { FeedStorage } from "./../../storage";

import { OpmlExporter } from "./../../util/opml-exporter";

export class AnalyticsAskModal extends CustomComponent<{}, AnalyticsAskModalState> {

    constructor() {
        super();

        this.state = {
            open: false
        };

        this.display = this.display.bind(this);
        this.handleHide = this.handleHide.bind(this);
    }

    render() {
        return (
            <div id="analytics-ask-modal" className="modal" style={{ display: this.state.open ? "" : "none" }}>
                <div className="content">
                    <i className="fa fa-times close-modal-button" onClick={this.handleHide}></i>
                    <h3>Analytics</h3>
                    <div className="scroll view">
                        <p>Hey good fellows, you can help us to improve Alduin by allowing us to catch your datas.</p>
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

interface AnalyticsAskModalState {
    open: boolean;
}
