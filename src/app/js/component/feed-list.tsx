import * as ReactDOM from "react-dom";
import * as React from "react";

import { CustomComponent } from "./../custom-component";
import { ComponentsRefs } from "./../components-refs";
import { Feed, FeedProp } from "./feed";

export class FeedList extends CustomComponent<{}, FeedListState> {

    feedComponents: Feed[] = [];

    constructor() {
        super();

        this.state = {
            feeds: []
        };

        ComponentsRefs.feedList = this;
    }

    render() {
        return (
            <ul className="rss list">
                {
                    this.state.feeds.map(feed => {
                        return <Feed ref={feed => this.feedComponents[this.feedComponents.length] = feed} key={feed.uuid} uuid={feed.uuid} title={feed.title} link={feed.link} />
                    })
                }
            </ul>
        );
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