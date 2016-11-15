import * as ReactDOM from "react-dom";
import * as React from "react";
import * as electron from "electron";

import { ComponentsRefs } from "./../../components-refs";
import { CustomComponent } from "./../custom-component";
import { AlertType } from "./../alert/alert-list";
import { FeedStorage } from "./../../storage";

export class Article extends CustomComponent<ArticleProps, ArticleState> {
    constructor(props: ArticleProps) {
        super();

        this.props = props;

        this.state = {
            read: this.props.read,
            selected: false
        };

        this.handleSelect = this.handleSelect.bind(this);
    }

    render() {
        return (
            <li onClick={this.handleSelect} className={(!this.state.read ? "unread" : "") + (this.state.selected ? "selected" : "")}>
                <h3><span>{this.props.title}</span><span>{new Date(this.props.date).toLocaleDateString(electron.remote.app.getLocale())}</span></h3>
                <p dangerouslySetInnerHTML={{ "__html": `${this.props.content.substring(0, 197).replace("\n", " ")}...` }} >
                </p>
            </li>
        );
    }

    handleSelect(event: React.MouseEvent<HTMLLIElement>) {
        if (!this.state.read) {
            this.editState({ read: true });
            this.markAsRead();
            FeedStorage.store();
        }

        ComponentsRefs.articleList.articleComponents.forEach(articleComponent => articleComponent.editState({ selected: false }));
        this.editState({ selected: true });

        ComponentsRefs.content.editState({ content: `<h3>${this.props.title}</h3> ${this.props.content}` });

        ComponentsRefs.content.resetScrollbar();

        document.querySelector("body").classList.add("show-article");
    }

    markAsRead() {
        const articleFound = ComponentsRefs.feedList.selectedFeed.state.articles.find(article => {
            return article.id === this.props.id;
        });
        articleFound.read = true;
        ComponentsRefs.feedList.forceUpdate();
    }
}

interface ArticleProps {
    id: string;
    title: string;
    content: string;
    link: string;
    date: number;
    read: boolean;
}
interface ArticleState {
    read: boolean;
    selected: boolean;
}
