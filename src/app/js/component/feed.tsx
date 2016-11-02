import * as ReactDOM from "react-dom";
import * as React from "react";

import { CustomComponent } from './../custom-component';
import { HttpGetter } from "./../../../http-getter";
import { FeedParser } from "./../../../feed-parser";

export class Feed extends CustomComponent<FeedProp, FeedState>{

    constructor(props: FeedProp) {
        super();

        this.props = props;

        this.state = {
            title: this.props.title,
            articles: []
        }
    }

    fetch() {
        HttpGetter.get(this.props.link).then(xmlContent => {
            //this.mergeArticles(FeedParser.parse(xmlContent));
        }, error => {
            alert(`Error while fetching feed: ${error}`);
        });
    }

    render() {
        return (
            <li className="selected">
                <i className="fa fa-rss" aria-hidden="true"></i>
                <span className="title">{this.state.title}</span>
                <span className="notif">2</span>
            </li>
        );
    }
}

export interface FeedProp {
    uuid: string;
    title: string;
    link: string;
}
interface FeedState {
    title: string;
    articles: Article[];
}

export interface Article {
    id: string;
    title: string;
    content: string;
    link: string;
    date: number;
    read?: boolean;
}