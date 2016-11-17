import * as fs from "fs";
import * as path from "path";
import * as electron from "electron";

import { ComponentsRefs } from "./components-refs";
import { IArticle } from "./component/feed/feed";

export namespace FeedStorage {

    const defaultStoredContent: StoredContent = {
        feeds: [],
        theme: "default.theme.css",
        automaticFetchInterval: 5
    };

    export let storedContent: StoredContent = {
        feeds: [],
        theme: "default.theme.css",
        automaticFetchInterval: 5
    };

    export const storePath = path.join(electron.remote.app.getPath("userData"), "store.json");

    export function store() {
        return new Promise((resolve, reject) => {
            const newStoredContent = {
                feeds: ComponentsRefs.feedList.getStoreValue(),
                theme: ComponentsRefs.theme.state.actualTheme,
                automaticFetchInterval: ComponentsRefs.feedList.state.automaticFetchInterval
            };
            fs.writeFile(storePath, JSON.stringify(newStoredContent, null, 4), err => {
                err ? reject("Failed to save feeds") : resolve();
            });
            this.storedContent = newStoredContent;
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
    theme: string;
    automaticFetchInterval: number;
}

export interface StoredFeed {
    uuid: string;
    title: string;
    link: string;
    articles: IArticle[];
}
