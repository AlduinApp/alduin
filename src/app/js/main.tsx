import * as ReactDOM from "react-dom";
import * as React from "react";

import { AddFeedModal } from "./component/modal/add-feed-modal";
import { ConfigModal } from "./component/modal/config-modal";
import { CustomComponent } from "./component/custom-component";
import { AddFeedOpenModalButton } from "./component/button/add-feed-open-modal-button";
import { PinSidebarButton } from "./component/button/pin-sidebar-button";
import { Sidebar } from "./component/sidebar";
import { AlertList } from "./component/alert/alert-list";
import { ArticleList } from "./component/article/article-list";
import { Loading } from "./component/loading";
import { Content } from "./component/content";
import { Theme } from "./component/theme";

import { ComponentsRefs } from "./components-refs";
import { FeedStorage } from "./storage";

export class App extends CustomComponent<{}, {}>{

    constructor() {
        super();

        FeedStorage.storedContent = FeedStorage.load();

        ComponentsRefs.main = this;
    }

    render() {
        return (
            <div>
                <Theme />
                <Sidebar />
                <ArticleList /><Content />
                <AlertList />
                <footer>
                    <a href="#">About</a>
                    <a href="https://github.com/Xstoudi/rss-feed">Fork me !</a>
                    <a href="https://paypal.com">Donate</a>
                    <a href="https://github.com/Xstoudi/rss-feed/issues">Issue</a>
                </footer>
                <Loading />
                <AddFeedModal />
                <ConfigModal />
            </div>
        );
    }
}

const app: App = ReactDOM.render(<App />, document.querySelector("#root")) as App;
