import * as ReactDOM from "react-dom";
import * as React from "react";

import { CustomComponent } from "./../custom-component";
import { ComponentsRefs } from "./../components-refs";

export class Content extends CustomComponent<{}, ContentState> {
    constructor() {
        super();

        this.state = {
            content: "Select an article..."
        };

        ComponentsRefs.content = this;
    }

    render() {
        return (
            <div className="rss article" dangerouslySetInnerHTML={{ __html: this.state.content }}>
            </div>
        );
    }
}

interface ContentState {
    content: string;
}
