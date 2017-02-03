import * as React from "react";
import * as fs from "fs";
import * as path from "path";
import { remote } from "electron";

import { CustomComponent } from "./../custom-component";
import { ComponentsRefs } from "./../../components-refs";
import { FeedStorage } from "./../../storage";

import { OpmlExporter } from "./../../util/opml-exporter";

export class ExportModal extends CustomComponent<{}, ExportModalState> {

    constructor() {
        super();

        this.state = {
            open: false
        };

        ComponentsRefs.exportModal = this;

        this.display = this.display.bind(this);
        this.handleHide = this.handleHide.bind(this);
        this.triggerExport = this.triggerExport.bind(this);
    }

    render() {
        return (
            <div id="export-opml-modal" className="modal" style={{ display: this.state.open ? "" : "none" }}>
                <div className="content">
                    <i className="fa fa-times close-modal-button" onClick={this.handleHide}></i>
                    <h3>OPML</h3>
                    <div className="scroll view">
                        <div className="input group">
                            <label>Feeds to export</label>
                            <select id="to-export-selector" multiple>
                                {
                                    ComponentsRefs.feedList.feedComponents.map(feedComponent => {
                                        return <option value={feedComponent.props.uuid}>{feedComponent.props.title}</option>;
                                    })
                                }
                            </select>
                        </div>
                        <div className="input group">
                            <button onClick={this.triggerExport}>Export</button>
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
    triggerExport() {
        remote.dialog.showSaveDialog({
            title: "OPML Feed Export",
            filters: [
                {
                    name: "OPML File",
                    extensions: ["opml"]
                }
            ]
        }, filename => {
            const opmlSelector = (document.querySelector("#to-export-selector") as HTMLSelectElement);
            const selecteds = [];
            for (let i = 0; i < opmlSelector.selectedOptions.length; i++)
                selecteds[i] = opmlSelector.selectedOptions.item(i).value;

            OpmlExporter.exportFeeds(filename, selecteds)
                .then(() => {
                    ComponentsRefs.alertList.alert("Successfully exported as OPML.");
                })
                .catch(err => {
                    ComponentsRefs.alertList.alert("Failed to export as OPML.");
                });
        });
    }
}

interface ExportModalState {
    open: boolean;
}
