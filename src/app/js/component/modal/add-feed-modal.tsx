import * as React from "react";
import * as crypto from "crypto";

import { CustomComponent } from "./../custom-component";
import { ComponentsRefs } from "./../../components-refs";
import { FeedStorage } from "./../../storage";
import { Http } from "./../../util/http";
import { FeedImporter } from "./../../util/feed-importer";

export class AddFeedModal extends CustomComponent<{}, AddFeedModalState> {

    private feedTitleInput: HTMLInputElement;
    private feedLinkInput: HTMLInputElement;

    constructor() {
        super();

        this.state = {
            open: false,
            title: "",
            link: ""
        };

        this.handleChangeTitle = this.handleChangeTitle.bind(this);
        this.handleChangeLink = this.handleChangeLink.bind(this);
        this.handleHide = this.handleHide.bind(this);
        this.handleConfirm = this.handleConfirm.bind(this);
        this.handleLinkKeyDown = this.handleLinkKeyDown.bind(this);

        ComponentsRefs.addFeedModal = this;
    }

    render() {
        return (
            <div id="add-feed-modal" className="modal" style={{ display: this.state.open ? "" : "none" }}>
                <div className="content">
                    <i className="fa fa-times close-modal-button" onClick={this.handleHide}></i>
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
        if (ComponentsRefs.feedList.state.feeds.find(feed => { return feed.link == this.state.link; })) return ComponentsRefs.alertList.alert("Feed already in list", "error");

        FeedImporter.add(this.state.title, this.state.link, () => {
            this.hide();
        });
    }
    handleLinkKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
        if (event.keyCode === 13) {
            this.handleConfirm(event);
        }
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
