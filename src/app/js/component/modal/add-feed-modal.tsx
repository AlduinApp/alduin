import * as React from "react";
import * as electron from "electron";
import * as crypto from "crypto";

import { CustomComponent } from "./../../custom-component";
import { ComponentsRefs } from "./../../components-refs";

import { Http } from "./../../http";
import { FeedParser } from "./../../feed-parser";

export class AddFeedModal extends CustomComponent<{}, AddFeedModalState> {

    private feedTitleInput: HTMLInputElement;
    private feedLinkInput: HTMLInputElement;

    constructor() {
        super();

        this.state = {
            open: false,
            title: "",
            link: ""
        }

        this.handleChangeTitle = this.handleChangeTitle.bind(this);
        this.handleChangeLink = this.handleChangeLink.bind(this);
        this.handleHide = this.handleHide.bind(this);
        this.handleConfirm = this.handleConfirm.bind(this);
        this.handleLinkKeyDown = this.handleLinkKeyDown.bind(this);
    }

    render() {
        return (
            <div id="add-feed-modal" className="modal" style={{ display: this.state.open ? "" : "none" }}>
                <div className="content">
                    <i className="fa fa-times close-modal-button" aria-hidden="true" onClick={this.handleHide}></i>
                    <h3>Add Feed</h3>
                    <div className="scroll view">
                        <div className="input group">
                            <label>Display name</label><input
                                ref={input => this.feedTitleInput = input}
                                id="feed-title-input"
                                type="text"
                                placeholder="Feed title"
                                value={this.state.title}
                                onChange={this.handleChangeTitle}
                                />
                        </div>
                        <div className="input group">
                            <label>Link</label><input
                                ref={input => this.feedLinkInput = input}
                                id="feed-link-input"
                                type="text"
                                placeholder="Feed link"
                                value={this.state.link}
                                onChange={this.handleChangeLink}
                                onKeyDown={this.handleLinkKeyDown}
                                />
                        </div>
                        <button className="main success button" id="add-feed-confirm" onClick={this.handleConfirm}>Confirm</button>
                    </div>
                </div>
            </div>
        );
    }

    handleChangeTitle(event: React.FormEvent<HTMLInputElement>) {
        this.editState({ title: event.currentTarget.value });
    }
    handleChangeLink(event: React.FormEvent<HTMLInputElement>) {
        this.editState({ link: event.currentTarget.value });
    }
    handleHide(event: React.MouseEvent<HTMLElement>) {
        this.hide();
    }
    handleConfirm(event: React.SyntheticEvent<HTMLButtonElement>) {

        Http.get(this.state.link).then(content => {
            if(!FeedParser.identify(content)) return ComponentsRefs.alertList.alert("Can't identifiy feed type", "error");

            let uuid;
            do {
                uuid = crypto.randomBytes(16).toString("hex");
            } while (ComponentsRefs.feedList.isIdAlreadyUsed(uuid));

            ComponentsRefs.feedList.addFeed({
                uuid: uuid,
                title: this.state.title,
                link: this.state.link
            });

            ComponentsRefs.alertList.alert(`Feed "${this.state.title}" successfully added`, "success");
            
            this.hide();

        }).catch(err => {
            ComponentsRefs.alertList.alert(err, "error");
        });
    }
    handleLinkKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
        event.keyCode === 13 && this.handleConfirm(event); // Code like if you were in Satan's church
    }

    reset() {
        this.editState({ title: "", link: "" });
    }
    display() {
        this.editState({ open: true });
        setTimeout(() => (document.querySelector("#feed-title-input") as HTMLInputElement).focus(), 1); // Chromium needs a 1ms timeout
    }
    hide() {
        this.reset();
        this.editState({ open: false });
    }
}

interface AddFeedModalState {
    open: boolean;
    title: string;
    link: string;
}