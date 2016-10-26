import { HttpGetter } from "./http-getter";
import { FeedParser } from "./feed-parser";

export class Feed {

    private uuid: string;

    private title;
    private link;

    private articles: Article[] = [];

    constructor(title: string, link: string) {
        this.title = title;
        this.link = link;
    }

    public static fromObject(feed: IFeed): Feed {
        const newFeed = new Feed(feed.title, feed.link);
        newFeed.articles = feed.articles || [];
        return newFeed;
    }

    public getUUID() {
        return this.uuid;
    }

    public defineUUID(uuid: string) {
        if (this.uuid) throw new Error("Can't redeclare UUID");
        else this.uuid = uuid;
    }

    public fetch() {
        HttpGetter.get(this.link).then(xmlContent => {
            this.mergeArticles(FeedParser.parse(xmlContent));
        }, error => {
            alert(`Error while fetching feed: ${error}`);
        });
    }

    public getArticleByID(id: string) {
        return this.articles.find(article => {
            return id === article.id;
        });
    }

    public mergeArticles(newArticles: Article[]) {
        newArticles.forEach(newArticle => {
            if (!this.getArticleByID(newArticle.id)) {
                newArticle.read = false;
                this.articles[this.articles.length] = newArticle;
            }
        });
    }

    public unregister() {

    }
}

interface IFeed {
    uuid: string;
    title: string;
    link: string;
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