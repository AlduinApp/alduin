import * as ReactDOM from "react-dom";
import * as React from "react";

import { ComponentsRefs } from "./../../components-refs";
import { CustomComponent } from "./../custom-component";
import { Http } from "./../../util/http";
import { FeedParser } from "./../../util/feed-parser";
import { FeedStorage, StoredFeed } from "./../../storage";

export class Feed extends CustomComponent<FeedProp, FeedState>{

    constructor(props: FeedProp) {
        super();

        this.props = props;

        this.state = {
            articles: this.props.articles,
            selected: false
        };

        this.handleSelect = this.handleSelect.bind(this);
    }

    fetch() {
        return new Promise((resolve, reject) => {
            Http.get(this.props.link).then(xmlContent => {
                this.mergeArticles(FeedParser.parse(xmlContent));
                FeedStorage.store();
                resolve();
            }).catch(reject);
        });
    }

    render() {
        const unreadNb = this.state.articles.filter(article => {
            return !article.read;
        }).length;

        return (
            <li className={this.state.selected && "selected"} onClick={this.handleSelect} >
                <i className="fa fa-rss" aria-hidden="true"></i>
                <span className="title">{this.props.title}</span>
                <span className="notif" style={{ display: !unreadNb && "none" }}>{unreadNb}</span>
            </li>
        );
    }

    handleSelect(event: React.MouseEvent<HTMLLIElement>) {
        if (!this.state.selected) {
            ComponentsRefs.feedList.feedComponents.forEach(feedComponent => { feedComponent.editState({ selected: false }); });
            this.editState({ selected: true });

            ComponentsRefs.feedList.selectedFeed = this;

            ComponentsRefs.articleList.updateArticles(this.state.articles);

            ComponentsRefs.articleList.resetScrollbar();
        }
    }


    getStoreValue(): StoredFeed {
        return {
            uuid: this.props.uuid,
            title: this.props.title,
            link: this.props.link,
            articles: this.state.articles
        };
    }

    mergeArticles(newArticles: IArticle[]) {
        const newArticlesList = this.state.articles.slice(0);
        for (let i = 0; i < newArticles.length; i++) {
            if (this.getArticleByID(newArticles[i].id)) continue;

            newArticles[i].read = false;
            newArticlesList[newArticlesList.length] = newArticles[i];
        }

        newArticlesList.sort((articleA, articleB) => {
            return articleA.date > articleB.date ? -1 : 1;
        });

        this.editState({ articles: newArticlesList });

        ComponentsRefs.articleList.updateArticles(newArticlesList);
    }

    getArticleByID(id: string) {
        return this.state.articles.find(article => {
            return article.id == id;
        });
    }
}

export interface FeedProp {
    uuid: string;
    title: string;
    link: string;
    articles: IArticle[];
}
interface FeedState {
    articles: IArticle[];
    selected: boolean;
}

export interface IArticle {
    id: string;
    title: string;
    content: string;
    link: string;
    date: number;
    read?: boolean;
}
