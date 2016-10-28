const ipcRenderer = require("electron").ipcRenderer;

class Communicator {

    constructor() {
        ipcRenderer.on("add-feed-response", e => {
            console.log("respond")
        });
    }

    public addFeedRequest(title: string, link: string) {
        ipcRenderer.emit("add-feed-request", JSON.stringify({ title: title, link: link }));
    }
}