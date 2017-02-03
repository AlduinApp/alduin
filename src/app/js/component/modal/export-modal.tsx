import * as React from "react";
import * as fs from "fs";
import * as path from "path";
import { remote } from "electron";

import { CustomComponent } from "./../custom-component";
import { ComponentsRefs } from "./../../components-refs";
import { FeedStorage } from "./../../storage";

export class ExportModal extends CustomComponent<{}, ExportModalState> {

    constructor() {
        super();

        this.state = {
            open: false
        };

        ComponentsRefs.exportModal = this;

        this.display = this.display.bind(this);
        this.handleHide = this.handleHide.bind(this);
    }

    render() {
        return (
            <div id="add-feed-modal" className="modal" style={{ display: this.state.open ? "" : "none" }}>
                <div className="content">
                    <i className="fa fa-times close-modal-button" onClick={this.handleHide}></i>
                    <h3>OPML</h3>
                    <div className="scroll view">
                        <div className="input group">
                            <label>Feeds to export</label>
                            <select multiple>
                                {
                                    ComponentsRefs.feedList.feedComponents.forEach(feedComponent => {
                                        <option value={feedComponent.props.uuid}>{feedComponent.props.title}</option>;
                                    })
                                }
                            </select>
                        </div>
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

interface ExportModalState {
    open: boolean;
}
