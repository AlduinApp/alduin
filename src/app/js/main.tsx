import * as ReactDOM from "react-dom";
import * as React from "react";

import { AddFeedModal } from "./component/modal/add-feed-modal";
import { ConfigModal } from "./component/modal/config-modal";
import { ExportModal } from "./component/modal/export-modal";
import { AnalyticsAskModal } from "./component/modal/analytics-ask-modal";
import { CustomComponent } from "./component/custom-component";
import { SwitchButton } from "./component/button/switch-button";
import { Sidebar } from "./component/sidebar";
import { AlertList } from "./component/alert/alert-list";
import { ArticleList } from "./component/article/article-list";
import { Loading } from "./component/loading";
import { Content } from "./component/content";
import { Theme } from "./component/theme";
import { Header } from "./component/header";

import { ComponentsRefs } from "./components-refs";
import { FeedStorage } from "./storage";

import { OpmlParser } from "./util/opml-parser";
import { FeedImporter } from "./util/feed-importer";

export class App extends CustomComponent<{}, {}>{

    constructor() {
        super();

        FeedStorage.storedContent = FeedStorage.load();

        ComponentsRefs.main = this;

        this.handleDragOver = this.handleDragOver.bind(this);
        this.handleDrop = this.handleDrop.bind(this);
    }

    render() {
        return (
            <div onDragOver={this.handleDragOver} onDrop={this.handleDrop}>
                <Theme />
                <Header />
                <Sidebar />
                <ArticleList /><Content />
                <AlertList />
                <footer>
                    <a href="#">
                        <i className="fa fa-question-circle"></i> About
                    </a>
                    <a href="https://github.com/Xstoudi/rss-feed">
                        <i className="fa fa-github"></i> Fork me
                    </a>
                    <a href="https://github.com/Xstoudi/rss-feed/issues">
                        <i className="fa fa-exclamation-triangle"></i> Any issue ?
                    </a>
                </footer>
                <Loading />
                <AddFeedModal />
                <ExportModal />
                <ConfigModal />
                <AnalyticsAskModal />
                <SwitchButton />
            </div>
        );
    }

    handleDragOver(event: React.DragEvent<HTMLDivElement>) {
        event.preventDefault();
    }
    handleDrop(event: React.DragEvent<HTMLDivElement>) {
        event.preventDefault();
        if (!event.dataTransfer.files) return;

        OpmlParser.getLinksFromOpml(event.dataTransfer.files.item(0).path).then(infos => {
            FeedImporter.addMany(infos);
        }).catch(err => {
            console.log(err);
        });
    }
}

ReactDOM.render(<App />, document.querySelector("#root")) as App;
