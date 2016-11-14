import * as React from "react";
import * as fs from "fs";
import * as path from "path";

import { CustomComponent } from "./../../custom-component";
import { ComponentsRefs } from "./../../components-refs";

export class ConfigModal extends CustomComponent<{}, ConfigModalState> {

    constructor() {
        super();

        this.state = {
            open: false,
            actualTheme: "default.theme.css"
        };

        this.handleHide = this.handleHide.bind(this);
        this.handleChange = this.handleChange.bind(this);

        ComponentsRefs.configModal = this;
    }

    render() {
        return (
            <div id="add-feed-modal" className="modal" style={{ display: this.state.open ? "" : "none" }}>
                <div className="content">
                    <i className="fa fa-times close-modal-button" aria-hidden="true" onClick={this.handleHide}></i>
                    <h3>Configuration</h3>
                    <div className="scroll view">
                        <div className="input group">
                            <label>Theme</label><select value={this.state.actualTheme} onChange={this.handleChange}>
                                {
                                    fs.readdirSync(path.join("src", "app", "style", "css")).map(filename => {
                                        return <option value={filename} key={filename}>{filename}</option>
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
    handleChange(event: React.KeyboardEvent<HTMLSelectElement>) {
        this.editState({ actualTheme: event.currentTarget.value });
        (document.querySelector("#theme-css") as HTMLLinkElement).href = `../style/css/${event.currentTarget.value}`;
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
    actualTheme: string;
}
