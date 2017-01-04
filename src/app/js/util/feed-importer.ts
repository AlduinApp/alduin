import * as crypto from "crypto";

import { Http } from "./http";
import { ComponentsRefs } from "./../components-refs";
import { FeedParser } from "./feed-parser";
import { FeedStorage } from "./../storage";

export namespace FeedImporter {
    export function add(title: string, link: string, callback?: () => void) {
        ComponentsRefs.loading.toggle();

        Http.get(link).then(content => {
            if (!FeedParser.identify(content)) {
                ComponentsRefs.alertList.alert("Can't identifiy feed type", "error");
            } else {
                let uuid;
                do {
                    uuid = crypto.randomBytes(16).toString("hex");
                } while (ComponentsRefs.feedList.isIdAlreadyUsed(uuid));

                ComponentsRefs.feedList.addFeed({
                    uuid: uuid,
                    title: title,
                    link: link,
                    articles: []
                });

                FeedStorage.store().then(() => {
                    ComponentsRefs.alertList.alert(`Feed "${title}" successfully added`, "success");
                    callback && callback();
                }).catch(err => {
                    ComponentsRefs.alertList.alert(err, "error");
                    callback && callback();
                });
            }
            ComponentsRefs.loading.toggle();
        }).catch(err => {
            ComponentsRefs.alertList.alert(err, "error");
            ComponentsRefs.loading.toggle();
        });
    }

    export function addMany(addInfos: AddInfos[]) {
        ComponentsRefs.loading.toggle();

        const promises = [];
        let promisesDone = 0;
        let nbErrors = 0;

        console.log(addInfos);

        for (const infos of addInfos) {
            promises[promises.length] = new Promise((resolve, reject) => {
                Http.get(infos.url)
                    .then(content => {
                        if (!FeedParser.identify(content) ||
                            ComponentsRefs.feedList.state.feeds.find(feed => { return feed.link == infos.url; })
                        ) {
                            nbErrors++;
                        } else {

                            let uuid;
                            do {
                                uuid = crypto.randomBytes(16).toString("hex");
                            } while (ComponentsRefs.feedList.isIdAlreadyUsed(uuid));

                            ComponentsRefs.feedList.addFeed({
                                uuid: uuid,
                                title: infos.title,
                                link: infos.url,
                                articles: []
                            });
                        }
                        promisesDone++;
                        // Once every promises ended
                        if (promisesDone >= promises.length)
                            announceEnd(nbErrors, promisesDone);

                    })
                    .catch(err => {
                        nbErrors++;
                        promisesDone++;
                        if (promisesDone >= promises.length)
                            announceEnd(nbErrors, promisesDone);
                    });
            });
        }

        Promise.race(promises);
    }

    function announceEnd(errors: number, total: number) {
        if (total - errors > 0)
            ComponentsRefs.alertList.alert(`Successfully added ${total - errors} feeds.`, "success");
        if (errors > 0)
            ComponentsRefs.alertList.alert(`Failed to add ${errors} feeds.`, "error");
        ComponentsRefs.loading.toggle();

        FeedStorage.store();
    }
}

interface AddInfos {
    title: string;
    url: string;
}
