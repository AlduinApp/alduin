import * as ReactDOM from "react-dom";
import * as React from "react";

import { ComponentsRefs } from "./../components-refs";
import { CustomComponent } from "./../custom-component";
import { AlertType } from "./alert-list";
import { FeedStorage } from "./../storage";

export class Article extends CustomComponent<ArticleProps, ArticleState> {
    constructor(props: ArticleProps) {
        super();

        this.props = props;

        this.state = {
            read: false
        };

        this.handleSelect = this.handleSelect.bind(this);
    }

    render() {
        return (
            <li onClick={this.handleSelect} className={(!this.state.read && "unread")}>
                <h3><span>{this.props.title}</span><span>30.5.2015</span></h3>
                <p dangerouslySetInnerHTML={{ "__html": `${this.props.content.substring(0, 197)}...` }} >
                </p>
            </li>
        );
    }

    handleSelect(event: React.MouseEvent<HTMLLIElement>) {
        this.editState({read: true});
        this.markAsRead();
        FeedStorage.store();
    }

    markAsRead(){
        const articleFound = ComponentsRefs.feedList.selectFeed.state.articles.find(article =>  {
            return article.id === this.props.id;
        });
        console.log(articleFound);
        articleFound.read = true;
    }
}

interface ArticleProps {
    id: string;
    title: string;
    content: string;
    link: string;
    read: boolean;
}
interface ArticleState {
    read: boolean;
}