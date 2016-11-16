import * as React from "react";
import * as fs from "fs";
import * as path from "path";

import { CustomComponent } from "./../custom-component";
import { ComponentsRefs } from "./../../components-refs";
import { FeedStorage } from "./../../storage";
import { Theme } from "./../theme";

export class ConfigModal extends CustomComponent<{}, ConfigModalState> {

    constructor() {
        super();

        this.state = {
            open: false,
            themeInput: ComponentsRefs.theme.state.actualTheme
        };

        this.handleHide = this.handleHide.bind(this);
        this.handleChange = this.handleChange.bind(this);

        ComponentsRefs.configModal = this;
    }

    render() {
        return (
            <div id="add-feed-modal" className="modal" style={{ display: this.state.open ? "" : "none" }}>
                <div className="content">
                    <i className="fa fa-times close-modal-button" onClick={this.handleHide}></i>
                    <h3>Configuration</h3>
                    <div className="scroll view">
                        <div className="input group">
                            <label>Theme</label><select value={this.state.themeInput} onChange={this.handleChange}>
                                {
                                    fs.readdirSync(path.join("src", "app", "style", "css")).map(filename => {
                                        return <option value={filename} key={filename}>{filename}</option>;
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
        ComponentsRefs.theme.switchTheme(event.currentTarget.value);
        this.editState({ themeInput: event.currentTarget.value }, () => FeedStorage.store());
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
    themeInput: string;
}
