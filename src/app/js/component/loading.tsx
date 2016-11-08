import * as ReactDOM from "react-dom";
import * as React from "react";

import { CustomComponent } from "./../custom-component";
import { ComponentsRefs } from "./../components-refs";

export class Loading extends CustomComponent<{}, LoadingState> {
    constructor() {
        super();

        this.state = {
            displayed: false
        };
    }

    render() {
        return (this.state.displayed) ? <div className="loading modal"></div> : null;
    }

    toggle() {
        this.editState({ displayed: !this.state.displayed });
    }
}

interface LoadingState {
    displayed: boolean;
}
