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
        console.log("EDIT");
        this.editState({ articles: articles });
    }

    render() {
        this.articleComponents = [];
        console.log("TRIGGER RERENDER")
        return (
            <div className="rss articles" ref={main => this.mainDiv = main}>
                <ul>
                    {
                        this.state.articles.map(article => {
                            console.log("ARTICLE TRIGGER", article.read)
                            return <Article
                                id={article.id}
                                title={article.title}
                                content={article.content}
                                link={article.link}
                                read={article.read}
                                date={article.date}
                                key={article.id}
                                ref={articleComponent => {
                                    if (articleComponent) this.articleComponents[this.articleComponents.length] = articleComponent;
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
