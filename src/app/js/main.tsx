import * as ReactDOM from "react-dom";
import * as React from "react";

import { AddFeedModal } from "./component/modal/add-feed-modal";
import { CustomComponent } from "./custom-component";
import { AddFeedOpenModalButton } from "./component/button/add-feed-open-modal-button";
import { PinSidebarButton } from "./component/button/pin-sidebar-button";
import { Sidebar } from "./component/sidebar";
import { AlertList } from "./component/alert-list";
import { ArticleList } from "./component/article-list";

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
                <Sidebar ref={sidebar => ComponentsRefs.sidebar = sidebar} />
                <ArticleList /><div className="rss article">
                    <h1>Hello world</h1>
                    <p>sdasykdbjasjdbacasdfa usdha ahs as fk jsf asibfh iasi asj fas foai fhais ofia sifobasiho ia sifbas f asof ai foas fiajb fash fao fhias foa sfhi asofb  has fh ashf asf ahs fhi fiah fas fas hkfas fafja sf as fas fakf as</p>
                    <h2>Yop Swag</h2>
                    <p>kjdvj sdbvj ssv jdvd</p>
                </div>
                <AlertList />
                <footer>
                    <span onClick={() => ComponentsRefs.feedList.feedComponents[0].fetch()}>Fetch</span>
                </footer>
                <div className="loading modal"></div>
                <AddFeedModal ref={modal => ComponentsRefs.addFeedModal = modal} />
            </div>
        );
    }
}

const app: App = ReactDOM.render(<App />, document.querySelector("#root")) as App;
