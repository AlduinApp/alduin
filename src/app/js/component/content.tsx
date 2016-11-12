import * as ReactDOM from "react-dom";
import * as React from "react";

import { CustomComponent } from "./../custom-component";
import { ComponentsRefs } from "./../components-refs";

export class Content extends CustomComponent<{}, ContentState> {

    mainDiv: HTMLDivElement;

    constructor() {
        super();

        this.state = {
            content: "Select an article..."
        };

        ComponentsRefs.content = this;
    }

    render() {
        return (
            <div
                ref={main => this.mainDiv = main}
                className="rss article"
                dangerouslySetInnerHTML={{ __html: this.state.content }}>
            </div>
        );
    }

    resetScrollbar() {
        this.mainDiv.scrollTop = 0;
    }
}

interface ContentState {
    content: string;
}
