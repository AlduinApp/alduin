import * as fs from "fs";

import { ComponentsRefs } from "./../components-refs";

export namespace OpmlExporter {
    export function exportFeeds(file: string, feedUuids: string[]) {
        return new Promise<any>((resolve, reject) => {

            let outlines = "";

            ComponentsRefs.feedList.feedComponents.forEach(feed => {
                if (!~feedUuids.indexOf(feed.props.uuid)) return;
                outlines += `<outline title="${feed.props.title}" text="${feed.props.title}" xmlUrl="${feed.props.link}" />`;
            });

            const toW = `
                <opml version="1.0">
                <head>
                <title>OPML exported from Alduin</title>
                </head>
                <body>
                ${outlines}
                </body>
                </opml>
            `;

            fs.writeFile(file, toW.replace(/\s{2,}/g, ""), err => {
                err ? reject(err) : resolve();
            });
        });
    }
}
