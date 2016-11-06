import * as ReactDOM from "react-dom";
import * as React from "react";

import { CustomComponent } from "./../custom-component";
import { AlertType } from "./alert-list";

export class Article extends CustomComponent<ArticleProps, ArticleState> {
    constructor(props: ArticleProps) {
        super();

        this.props = props;

        this.state = {
            read: false
        };
    }

    render() {
        return (
            <li className={(!this.props.read && "unread")}>
                <h3><span>{this.props.title}</span><span>30.5.2015</span></h3>
                <p dangerouslySetInnerHTML={{ "__html": `${this.props.content.substring(0, 197)}...` }} >
                </p>
            </li>
        );
    }

    handleSelect(event: React.MouseEvent<HTMLLIElement>) {
        this.editState({read: true});
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