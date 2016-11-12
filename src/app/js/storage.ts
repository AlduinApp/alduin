import * as fs from "fs";
import * as path from "path";
import * as electron from "electron";

import { ComponentsRefs } from "./components-refs";
import { IArticle } from "./component/feed";

export namespace FeedStorage {

    const defaultStoredContent: StoredContent = {
        feeds: []
    };

    export let storedContent: StoredContent = {
        feeds: []
    };

    export const storePath = path.join(electron.remote.app.getPath("userData"), "store.json");

    export function store() {
        return new Promise((resolve, reject) => {
            const newStoredContent = {
                feeds: ComponentsRefs.feedList.getStoreValue()
            };
            fs.writeFile(storePath, JSON.stringify(newStoredContent, null, 4), err => {
                err ? reject("Failed to save feeds") : resolve();
            });
        });
    }

    export function load(): StoredContent {
        if (!fs.existsSync(storePath)) fs.writeFileSync(storePath, JSON.stringify(defaultStoredContent), "utf-8");
        const content = fs.readFileSync(storePath, "utf-8");
        return JSON.parse(content);
    }

}

export interface StoredContent {
    feeds: StoredFeed[];
}

export interface StoredFeed {
    uuid: string;
    title: string;
    link: string;
    articles: IArticle[];
}
