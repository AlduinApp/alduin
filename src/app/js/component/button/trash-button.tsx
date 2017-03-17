import * as React from "react";

import { ComponentsRefs } from "./../../components-refs";
import { CustomComponent } from "./../custom-component";

export class TrashButton extends CustomComponent<{}, {}> {

    constructor() {
        super();

        this.onDragOver = this.onDragOver.bind(this);
        this.onDrop = this.onDrop.bind(this);
    }

    render() {
        return (
            <li onDragOver={this.onDragOver} onDrop={this.onDrop}>
                <i className="fa fa-trash"></i>
            </li>
        );
    }

    onDragOver(event: React.DragEvent<HTMLElement>) {
        event.preventDefault();
    }

    onDrop(event: React.DragEvent<HTMLElement>) {
        event.stopPropagation();
        const toDelete = JSON.parse(event.dataTransfer.getData("text/plain"));
        const removeResult = ComponentsRefs.feedList.removeFeedByUUID(toDelete.uuid);
        if (toDelete.wasSelected) {
            ComponentsRefs.articleList.updateArticles([]);
            ComponentsRefs.content.editState({ content: "" });
            ComponentsRefs.feedList.updateTrayIcon();
        }
        removeResult && ComponentsRefs.alertList.alert("Successfully deleted feed", "success");
    }
}
