import * as React from "react";

import { CustomComponent } from "./custom-component";
import { ComponentsRefs } from "./../components-refs";

export class Content extends CustomComponent<{}, ContentState> {

    mainDiv: HTMLDivElement;

    constructor() {
        super();

        this.state = {
            content: "Select an article...",
            podcast: undefined
        };

        ComponentsRefs.content = this;
    }

    render() {
        let html = this.state.content;
        if(this.state.podcast) html += `<br/><audio controls preload="metadata" src="${this.state.podcast}"></audio>`
        return (
            <div
                ref={main => this.mainDiv = main}
                className="rss article"
                dangerouslySetInnerHTML={{ __html: html }}>
            </div>
        );
    }

    resetScrollbar() {
        this.mainDiv.scrollTop = 0;
    }
}

interface ContentState {
    content: string;
    podcast: string;
}
