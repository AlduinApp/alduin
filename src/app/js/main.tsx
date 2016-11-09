import * as ReactDOM from "react-dom";
import * as React from "react";

import { AddFeedModal } from "./component/modal/add-feed-modal";
import { CustomComponent } from "./custom-component";
import { AddFeedOpenModalButton } from "./component/button/add-feed-open-modal-button";
import { PinSidebarButton } from "./component/button/pin-sidebar-button";
import { Sidebar } from "./component/sidebar";
import { AlertList } from "./component/alert-list";
import { ArticleList } from "./component/article-list";
import { Loading } from "./component/loading";
import {Content} from "./component/content";

import { ComponentsRefs } from "./components-refs";
import { FeedStorage } from "./storage";

export class App extends CustomComponent<{}, {}>{

    constructor() {
        super();

        FeedStorage.storedContent = FeedStorage.load();
    }

    render() {
        return (
            <div>
                <Sidebar />
                <ArticleList /><Content />
                <AlertList />
                <footer></footer>
                <Loading />
                <AddFeedModal />
            </div>
        );
    }
}

const app: App = ReactDOM.render(<App />, document.querySelector("#root")) as App;
