import * as ReactDOM from "react-dom";
import * as React from "react";

import { CustomComponent } from "./../custom-component";
import { ComponentsRefs } from "./../components-refs";

import { Article } from "./article";
import { IArticle } from "./feed";
import { Feed } from "./feed";

export class ArticleList extends CustomComponent<{}, ArticleListState> {

    constructor() {
        super();

        this.state = {
            articles: []
        };

        ComponentsRefs.articleList = this;
    }

    updateArticles(articles: IArticle[]) {
        this.editState({ articles: articles });
        console.log("UPDATE ARTICLES : " + articles)
    }

    render() {
        return (
            <div className="rss articles">
                <ul>
                    {
                        this.state.articles.map(article => {
                            return <Article
                                id={article.id}
                                title={article.title}
                                content={article.content}
                                link={article.link}
                                read={article.read}
                                />
                        })
                    }
                </ul>
            </div>
        );
    }
}

interface ArticleListState {
    articles: IArticle[];
}