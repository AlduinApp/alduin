import * as React from "react";

import { CustomComponent } from "./../custom-component";
import { ComponentsRefs } from "./../../components-refs";

import { Article } from "./article";
import { IArticle } from "./../feed/feed";

export class ArticleList extends CustomComponent<{}, ArticleListState> {

    articleComponents: Article[];

    mainDiv: HTMLDivElement;

    constructor() {
        super();

        this.state = {
            articles: []
        };

        ComponentsRefs.articleList = this;
    }

    updateArticles(articles: IArticle[]) {
        this.editState({ articles: articles });
    }

    render() {
        this.articleComponents = [];
        return (
            <div className="rss articles" ref={main => this.mainDiv = main}>
                <ul>
                    {
                        this.state.articles.map(article => {
                            return <Article
                                id={article.id}
                                title={article.title}
                                content={article.content}
                                link={article.link}
                                read={article.read}
                                date={article.date}
                                podcast={article.podcast}
                                key={article.id}
                                ref={articleComponent => {
                                    if (articleComponent) {
                                        this.articleComponents[this.articleComponents.length] = articleComponent;
                                        articleComponent.editState({read: article.read});
                                    }
                                } }
                                />;
                        })
                    }
                </ul>
            </div>
        );
    }

    resetScrollbar() {
        this.mainDiv.scrollTop = 0;
    }
}

interface ArticleListState {
    articles: IArticle[];
}
