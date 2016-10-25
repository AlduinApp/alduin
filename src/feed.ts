export class Feed {

    private title;
    private link;

    private articles: Article[];
    
    constructor(title: string, link: string){
        this.title = title;
        this.link = link;
    }

    public static fromObject(feed: IFeed): Feed {
         const newFeed = new Feed(feed.title, feed.link);
         newFeed.articles = feed.articles || [];
         return newFeed;
    }

}

interface IFeed {
    title: string;
    link: string;
    articles: Article[];
}

interface Article {
    id: string;
    title: string;
    content: string;
    link: string;
    date: string;
}