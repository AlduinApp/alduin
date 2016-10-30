import * as ReactDOM from "react-dom";
import * as React from "react";

import { CustomComponent } from "./../custom-component";
import { ComponentsRefs } from "./../components-refs";
import { AddFeedOpenModalButton } from "./../component/button/add-feed-open-modal-button";
import { PinSidebarButton } from "./../component/button/pin-sidebar-button";

export class Sidebar extends CustomComponent<{}, {}> {

    constructor() {
        super();
    }

    render() {
        return (
            <div className="rss menu pinned">
                <ul className="rss list">
                    <li className="selected">
                        <i className="fa fa-font-awesome" aria-hidden="true"></i>
                        <span className="title">Korben</span>
                        <span className="notif">2</span>
                    </li>
                    <li>
                        <i className="fa fa-archive" aria-hidden="true"></i>
                        <span className="title">Trash</span>
                    </li>
                    <li>
                        <i className="fa fa-sign-language fa-square-o" aria-hidden="true"></i>
                        <span className="title">Basta</span>
                        <span className="notif">+99</span>
                    </li>
                </ul>
                <ul className="rss settings">
                    <AddFeedOpenModalButton ref={button => ComponentsRefs.addFeedOpenModalButton = button} /><li>
                        <i className="fa fa-trash" aria-hidden="true"></i>
                    </li><li className="active">
                        <i className="fa fa-cog" aria-hidden="true"></i>
                    </li><PinSidebarButton ref={button => ComponentsRefs.pinSidebarButton = button} />
                </ul>
            </div>
        );
    }

    togglePin() {
        document.querySelector("body").classList.toggle("pinned");
    }
}