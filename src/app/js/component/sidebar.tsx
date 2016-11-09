import * as ReactDOM from "react-dom";
import * as React from "react";

import { CustomComponent } from "./../custom-component";
import { ComponentsRefs } from "./../components-refs";
import { AddFeedOpenModalButton } from "./../component/button/add-feed-open-modal-button";
import { PinSidebarButton } from "./../component/button/pin-sidebar-button";
import { FeedList } from "./feed-list";

export class Sidebar extends CustomComponent<{}, {}> {

    constructor() {
        super();
    }

    render() {
        return (
            <div className="rss menu pinned">
                <FeedList />
                <ul className="rss settings">
                    <AddFeedOpenModalButton ref={button => ComponentsRefs.addFeedOpenModalButton = button} /><li>
                        <i className="fa fa-trash" aria-hidden="true"></i>
                    </li><li className="active">
                        <i className="fa fa-cog" aria-hidden="true"></i>
                    </li><li>
                        <i className="fa fa-download" aria-hidden="true"></i>
                    </li><PinSidebarButton ref={button => ComponentsRefs.pinSidebarButton = button} />
                </ul>
            </div>
        );
    }

    togglePin() {
        document.querySelector("body").classList.toggle("pinned");
    }
}
