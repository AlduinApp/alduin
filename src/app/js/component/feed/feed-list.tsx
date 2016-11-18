import * as ReactDOM from "react-dom";
import * as React from "react";
import * as path from "path";

import { CustomComponent } from "./../custom-component";
import { ComponentsRefs } from "./../../components-refs";
import { Feed, FeedProp } from "./feed";
import { FeedStorage, StoredFeed } from "./../../storage";

declare var Notification: any;

export class FeedList extends CustomComponent<{}, FeedListState> {

    feedComponents: Feed[] = [];
    selectedFeed: Feed;

    constructor() {
        super();

        this.state = {
            feeds: FeedStorage.storedContent.feeds.map(storedFeed => {
                return {
                    uuid: storedFeed.uuid,
                    title: storedFeed.title,
                    link: storedFeed.link,
                    articles: storedFeed.articles
                };
            }),
            automaticFetchInterval: FeedStorage.storedContent.automaticFetchInterval
        };

        ComponentsRefs.feedList = this;

        this.autoFetch();
    }

    render() {
        this.feedComponents = [];

        return (
            <ul className="rss list">
                {
                    this.state.feeds.map(feed => {
                        return <Feed
                            ref={feedComponent => {
                                if (feedComponent) this.feedComponents[this.feedComponents.length] = feedComponent;
                            } }
                            key={feed.uuid}
                            uuid={feed.uuid}
                            title={feed.title}
                            link={feed.link}
                            articles={feed.articles}
                            />;
                    })
                }
            </ul>
        );
    }

    isIdAlreadyUsed(uuid: string) {
        return !!this.state.feeds.find(feed => {
            return feed.uuid === uuid;
        });
    }

    addFeed(newFeed: FeedProp) {
        const newFeeds = this.state.feeds.slice(0);
        newFeeds[newFeeds.length] = newFeed;
        this.editState({ feeds: newFeeds }, () => {
            this.fetchAll();
        });
    }

    fetchAll() {
        return new Promise<FetchResult>(resolve => {
            const fetchToExecute = [];
            let nbErrors = 0;

            let newArticlesNb = 0;

            this.feedComponents.forEach(feedComponent => {
                fetchToExecute[fetchToExecute.length] = feedComponent.fetch()
                    .then(nb => { newArticlesNb += nb; })
                    .catch(e => { nbErrors++; return e; });
            });
            Promise.all(fetchToExecute)
                .then(() => {
                    FeedStorage.store();
                    resolve({
                        success: fetchToExecute.length - nbErrors,
                        fail: nbErrors,
                        newArticlesNb: newArticlesNb
                    });
                })
                .catch(err => console.log(err));
        });
    }

    autoFetch() {
        ComponentsRefs.feedList.fetchAll()
            .then((results) => {
                if (results.newArticlesNb)
                    new Notification("Automatic fetch!", {
                        body: `Got ${results.newArticlesNb} new articles!`,
                        icon: path.join("..", "img", "icon.png")
                    });
                setTimeout(() => this.autoFetch(), this.state.automaticFetchInterval * 60000);
            });
    }

    getStoreValue(): StoredFeed[] {
        const storeValue = [];
        this.feedComponents.forEach(feedComponent => {
            storeValue[storeValue.length] = feedComponent.getStoreValue();
        });
        return storeValue;
    }

    changeAutomaticFetchInterval(minutes: number) {
        this.editState({ automaticFetchInterval: minutes }, () => FeedStorage.store());
    }
}

interface FeedListState {
    feeds: FeedProp[];
    automaticFetchInterval: number;
}

interface FetchResult {
    success: number;
    fail: number;
    newArticlesNb: number;
}
