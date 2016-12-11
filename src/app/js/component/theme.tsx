import * as React from "react";
import * as electron from "electron";
import * as path from "path";

import { CustomComponent } from "./custom-component";
import { ComponentsRefs } from "./../components-refs";
import { FeedStorage } from "./../storage";

export class Theme extends CustomComponent<{}, ThemeState> {

    constructor() {
        super();

        this.state = {
            actualTheme: FeedStorage.storedContent.theme
        };

        ComponentsRefs.theme = this;
    }

    render() {
        return (
            <link rel="stylesheet" type="text/css" href={path.join(electron.remote.app.getPath("userData"), "themes", this.state.actualTheme)} />
        );
    }

    switchTheme(theme: string) {
        this.editState({ actualTheme: theme });
    }
}

interface ThemeState {
    actualTheme: string;
}
