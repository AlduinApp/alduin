import * as fs from "fs";

const opmlToJson = require("opml-to-json");

export namespace OpmlParser {
    function parse(opml: string) {
        return new Promise<any>((resolve, reject) => {
            opmlToJson(opml, (err, json) => {
                err ? reject(err) : resolve(json);
            });
        });
    }
    export function getLinksFromOpml(opmlPath: string) {
        return new Promise<any>((resolve, reject) => {
            fs.readFile(opmlPath, "utf-8", (err, data) => {
                if (err) return reject(err);
                parse(data)
                    .then(value => {
                        resolve((value.children as Array<any>).map(content => {
                            return {
                                title: content.text,
                                url: content.xmlurl
                            }
                        }));
                    })
                    .catch(reject);
            });
        });
    }
}