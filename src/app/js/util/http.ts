import * as http from "http";
import * as https from "https";
import * as url from "url";

export namespace Http {
    export function get(urlToGet: string) {
        return new Promise<string>((resolve, reject) => {
            const parsedUrl = url.parse(urlToGet);

            if (!isValidUrl(urlToGet)) return reject("Invalid url");

            const options = {
                host: parsedUrl.host,
                path: parsedUrl.path
            };
            const responseHandler = response => {
                let body = "";
                console.log(response.statusCode);
                console.log(response.headers);

                response
                    .on("data", d => {
                        body += d;
                    })
                    .on("end", () => {
                        if (
                            (response.statusCode == 300 ||
                                response.statusCode == 302) &&
                            "location" in response.headers
                        ) {
                            Http.get(response.headers.location).then(resolve).catch(reject);
                        } else {

                            resolve(body);
                        }
                    })
                    .on("error", error => {
                        reject("Can't get links content");
                    });
            };

            if (parsedUrl.protocol == "https:") {
                https.get(options, responseHandler);
            } else {
                http.get(options, responseHandler);
            }

        });
    }
    export function isValidUrl(url: string) {
        let regexp = new RegExp(
            "^" +
            // protocol identifier
            "(?:(?:https?|ftp)://)" +
            // user:pass authentication
            "(?:\\S+(?::\\S*)?@)?" +
            "(?:" +
            // IP address exclusion
            // private & local networks
            "(?!(?:10|127)(?:\\.\\d{1,3}){3})" +
            "(?!(?:169\\.254|192\\.168)(?:\\.\\d{1,3}){2})" +
            "(?!172\\.(?:1[6-9]|2\\d|3[0-1])(?:\\.\\d{1,3}){2})" +
            // IP address dotted notation octets
            // excludes loopback network 0.0.0.0
            // excludes reserved space >= 224.0.0.0
            // excludes network & broacast addresses
            // (first & last IP address of each class)
            "(?:[1-9]\\d?|1\\d\\d|2[01]\\d|22[0-3])" +
            "(?:\\.(?:1?\\d{1,2}|2[0-4]\\d|25[0-5])){2}" +
            "(?:\\.(?:[1-9]\\d?|1\\d\\d|2[0-4]\\d|25[0-4]))" +
            "|" +
            // host name
            "(?:(?:[a-z\\u00a1-\\uffff0-9]-*)*[a-z\\u00a1-\\uffff0-9]+)" +
            // domain name
            "(?:\\.(?:[a-z\\u00a1-\\uffff0-9]-*)*[a-z\\u00a1-\\uffff0-9]+)*" +
            // TLD identifier
            "(?:\\.(?:[a-z\\u00a1-\\uffff]{2,}))?" +
            // TLD may end with dot
            "\\.?" +
            ")" +
            // port number
            "(?::\\d{2,5})?" +
            // resource path
            "(?:[/?#]\\S*)?" +
            "$", "i"
        );
        return regexp.test(url);
    }
}
