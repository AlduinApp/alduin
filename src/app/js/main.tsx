import * as ReactDOM from "react-dom";
import * as React from "react";

import { AddFeedModal } from "./component/modal/add-feed-modal";
import { ConfigModal } from "./component/modal/config-modal";
import { CustomComponent } from "./component/custom-component";
import { AddFeedOpenModalButton } from "./component/button/add-feed-open-modal-button";
import { PinSidebarButton } from "./component/button/pin-sidebar-button";
import { SwitchButton} from "./component/button/switch-button";
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
                    <a href="#" title="Help">
                        <i className="fa fa-question-circle"></i>
                    </a>
                    <a href="https://github.com/Xstoudi/rss-feed" title="Fork me !">
                        <i className="fa fa-github"></i>
                    </a>
                    <a href="https://paypal.com" title="Donate">
                        <i className="fa fa-credit-card"></i>
                    </a>
                    <a href="https://github.com/Xstoudi/rss-feed/issues"title="Issues">
                        <i className="fa fa-exclamation-triangle"></i>
                    </a>
                </footer>
                <Loading />
                <AddFeedModal />
                <ConfigModal />
                <SwitchButton />
            </div>
        );
    }
}

const app: App = ReactDOM.render(<App />, document.querySelector("#root")) as App;
