import { IArticle } from "./component/feed";

import * as fs from "fs";
// import * as xmldoc from "xmldoc";
const xmldoc = require("xmldoc");
import * as http from "http";
import * as url from "url";

export namespace FeedParser {
    export function identify(xmlString: string) {
        return (/<(rss|rdf)\b/i.test(xmlString) ? "rss" : (/<feed\b/i.test(xmlString) ? "atom" : false));
    }

    export function parse(xmlString: string): IArticle[] {
        const identified = identify(xmlString);
        return identified ? FeedParser[identified as string](xmlString) : null;
    }

    export function rss(xmlString: string): IArticle[] {
        const articles: IArticle[] = [];
        new xmldoc.XmlDocument(xmlString).childNamed("channel").childrenNamed("item").forEach(item => {
            articles[articles.length] = {
                id: item.valueWithPath("guid") || item.valueWithPath("link"),
                title: item.valueWithPath("title"),
                content: fixSrcset(item.valueWithPath("content:encoded") || item.valueWithPath("description") || "Can't find content"),
                link: item.valueWithPath("link"),
                date: Date.parse(item.valueWithPath("pubDate")) || Date.parse(item.valueWithPath("lastBuildDate")) || new Date().getTime()
            };
        });

        return articles;
    }

    export function atom(xmlString: string): IArticle[] {
        const articles: IArticle[] = [];

        new xmldoc.XmlDocument(xmlString).childrenNamed("entry").forEach(item => {
            articles[articles.length] = {
                id: item.valueWithPath("id"),
                title: item.valueWithPath("title"),
                content: item.fixSrcset(item.valueWithPath("summary") || item.valueWithPath("content") || item.valueWithPath("subtitle")),
                link: /href="(.+)"/.exec(item.childWithAttribute("href").toString())[1],
                date: item.valueWithPath("published") || item.valueWithPath("updated") || new Date().getTime()
            };
        });

        return articles;
    }

    function fixSrcset(content: string) {
        console.log(content);
        const replaced = content.replace(/([^:])(\/\/[\S]*)/g, "$1http:$2");
        console.log(replaced);
        return replaced;
    }
}
