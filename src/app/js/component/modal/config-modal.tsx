import * as React from "react";
import * as fs from "fs";
import * as path from "path";
import { remote } from "electron";

import { CustomComponent } from "./../custom-component";
import { ComponentsRefs } from "./../../components-refs";
import { FeedStorage } from "./../../storage";

export class ConfigModal extends CustomComponent<{}, ConfigModalState> {

    constructor() {
        super();

        this.state = {
            open: false,
            themeInput: ComponentsRefs.theme.state.actualTheme,
            automaticFetchInterval: FeedStorage.storedContent.automaticFetchInterval
        };

        this.handleHide = this.handleHide.bind(this);
        this.handleChangeTheme = this.handleChangeTheme.bind(this);
        this.handleChangeAFI = this.handleChangeAFI.bind(this);

        ComponentsRefs.configModal = this;
    }

    render() {
        return (
            <div id="config-modal" className="modal" style={{ display: this.state.open ? "" : "none" }}>
                <div className="content">
                    <i className="fa fa-times close-modal-button" onClick={this.handleHide}></i>
                    <h3>Configuration</h3>
                    <div className="scroll view">
                        <div className="input group">
                            <label>Theme</label><select value={this.state.themeInput} onChange={this.handleChangeTheme}>
                                {
                                    fs.readdirSync(path.join(remote.app.getPath("userData"), "themes")).map(filename => {
                                        return <option value={filename} key={filename}>{filename}</option>;
                                    })
                                }
                            </select>
                        </div>
                        <div className="input group">
                            <label>Automatic fetch interval (minutes)</label><input type="number" min="1" value={this.state.automaticFetchInterval} onChange={this.handleChangeAFI} />
                        </div>
                        <div className="input group">
                            <label>Export</label><button onClick={() => { ComponentsRefs.exportModal.display(); this.hide(); }}>OPML export</button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    handleHide(event: React.MouseEvent<HTMLElement>) {
        this.hide();
    }
    handleChangeTheme(event: any) {
        ComponentsRefs.theme.switchTheme(event.currentTarget.value);
        this.editState({ themeInput: event.currentTarget.value }, () => FeedStorage.store());
    }
    handleChangeAFI(event: React.FormEvent<HTMLInputElement>) {
        ComponentsRefs.feedList.changeAutomaticFetchInterval(parseInt(event.currentTarget.value, 10));
        this.editState({ automaticFetchInterval: parseInt(event.currentTarget.value, 10) });
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
    automaticFetchInterval: number;
}
