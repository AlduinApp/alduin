import { Feed } from "./feed";

import * as crypto from "crypto";
import * as fs from 'fs';

export class FeedManager {

    private static feeds: Feed[] = [];

    constructor() {
        throw new Error("Can't instantiate FeedManager class");
    }

    public static fetchFeedByUUID(uuid: string) {
        FeedManager.getFeedByUUID(uuid).fetch();
    }
    public static fetchAllFeeds() {
        FeedManager.feeds.forEach(feed => {
            feed.fetch();
        });
    }

    public static registerFeed(feed: Feed): string {
        const uuid = crypto.randomBytes(16).toString("hex");
        feed.defineUUID(uuid);
        FeedManager.feeds[FeedManager.feeds.length] = feed;
        return uuid;
    }

    public static unregisterFeed(uuid: string) {
        FeedManager.getFeedByUUID(uuid).unregister();
        FeedManager.feeds.splice(FeedManager.feeds.findIndex(eachFeed => {
            return eachFeed.getUUID() === uuid;
        }), 1);
    }

    public static getFeedByUUID(uuid: string) {
        return FeedManager.feeds.find(eachFeed => {
            return eachFeed.getUUID() === uuid;
        });
    }
}