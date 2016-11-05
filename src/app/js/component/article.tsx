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
        return null;
    }
}

interface ArticleProps {
    id: string;
    title: string;
    content: string;
    link: string;
}
interface ArticleState {
    read: false;
}