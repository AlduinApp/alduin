import { Feed } from './feed';
import { FeedManager } from './feed-manager';

import { ipcMain } from "electron";

export class Dispatcher {

    constructor() {
        ipcMain.on("add-feed-request", this.onAddFeedReq);
    }

    private onAddFeedReq(event: Electron.IpcMainEvent, feedStr: string) {
        const feedCom: ICom.AddFeedReq = JSON.parse(feedStr);
        FeedManager.registerFeed(new Feed(feedCom.title, feedCom.link));

        event.sender.send("add-feed-response");
    }
}

export namespace ICom {
    export interface AddFeedReq {
        title: string;
        link: string;
    }
}