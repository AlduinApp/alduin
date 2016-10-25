import {ipcMain} from "electron";

export class Dispatcher {

    constructor(){
        ipcMain.on("add-feed", (event, arg) => {

        });
    }

    private onAddFeed(event: Electron.IpcMainEvent, arg) {

    }
}