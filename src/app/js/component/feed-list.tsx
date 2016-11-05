import * as ReactDOM from "react-dom";
import * as React from "react";

import { CustomComponent } from "./../custom-component";
import { ComponentsRefs } from "./../components-refs";
import { Feed, FeedProp } from "./feed";

export class FeedList extends CustomComponent<{}, FeedListState> {

    feedComponents: Feed[];

    constructor() {
        super();

        this.state = {
            feeds: []
        };

        ComponentsRefs.feedList = this;
    }

    render() {
        this.feedComponents = [];
        return (
            <ul className="rss list">
                {
                    this.state.feeds.map(feed => {
                        return <Feed
                            ref={feedComponent => {
                                if (feedComponent) this.feedComponents[this.feedComponents.length] = feedComponent
                            } }
                            key={feed.uuid}
                            uuid={feed.uuid}
                            title={feed.title}
                            link={feed.link}
                            />
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
        this.editState({ feeds: newFeeds })
    }
}

interface FeedListState {
    feeds: FeedProp[];
}