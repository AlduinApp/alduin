import * as React from "react";
import { remote } from "electron";

import { CustomComponent } from "./custom-component";

export class Header extends CustomComponent<{}, HeaderState> {
    constructor() {
        super();

        this.state = {
            isMaximized: this.getWindow().isMaximized()
        };

        this.onMinimize = this.onMinimize.bind(this);
        this.switchSize = this.switchSize.bind(this);
        this.onClose = this.onClose.bind(this);

        this.getWindow().on("resize", () => {
            this.editState({ isMaximized: this.getWindow().isMaximized() });
        });
    }

    render() {
        return (
            <header className="header bar">
                <i className="fa fa-window-minimize" onClick={this.onMinimize}></i>
                <i className={`fa ${this.state.isMaximized ? "fa-window-restore" : "fa-window-maximize"}`} onClick={this.switchSize}></i>
                <i className="fa fa-window-close" onClick={this.onClose}></i>
            </header>
        );
    }

    onMinimize() {
        this.getWindow().minimize();
    }

    switchSize() {
        this.getWindow().isMaximized() ? this.getWindow().unmaximize() : this.getWindow().maximize();
    }

    onClose() {
        this.getWindow().close();
    }

    private getWindow() {
        return remote.BrowserWindow.fromId(remote.getGlobal("mainWinId"));
    }
}

interface HeaderState {
    isMaximized: boolean;
}