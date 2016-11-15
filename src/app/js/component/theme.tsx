import * as ReactDOM from "react-dom";
import * as React from "react";

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
            <link rel="stylesheet" type="text/css" href={`../style/css/${this.state.actualTheme}`} />
        );
    }

    switchTheme(theme: string) {
        this.editState({ actualTheme: theme });
    }
}

interface ThemeState {
    actualTheme: string;
}
