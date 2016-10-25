import * as http from "http";
import * as url from "url";

import {Promise} from "es6-promise";

export namespace HttpGetter {
    export function get(urlToGet: string) {
        return new Promise()
        const parsedUrl = url.parse(urlToGet)
        http.get({
            host: parsedUrl.host,
            path: parsedUrl.path
        }, response => {
            response.setEncoding("utf-8");

            let body = "";
            response
                .on("data", d => {
                    body += d;
                })
                .on("end", () => {

                })
                .on("error", error => {

                });
        });
    }
}