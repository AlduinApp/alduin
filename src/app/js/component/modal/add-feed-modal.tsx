import {CustomComponent} from "./../../custom-component";

import * as React from "react";

export class AddFeedModal extends CustomComponent<{}, AddFeedModalState> {
    
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
    }

    render() {
        return (
            <div id="add-feed-modal" className="modal" style={{ display: this.state.open ? "" : "none" }}>
                <div className="content">
                    <i className="fa fa-times close-modal-button" aria-hidden="true" onClick={this.handleHide}></i>
                    <h3>Add Feed</h3>
                    <div className="scroll view">
                        <div className="input group">
                            <label>Display name</label><input id="feed-title-input" type="text" placeholder="Feed title" onChange={this.handleChangeTitle} />
                        </div>
                        <div className="input group">
                            <label>Link</label><input id="feed-link-input" type="text" placeholder="Feed link" onChange={this.handleChangeLink} />
                        </div>
                        <button className="main success button" id="add-feed-confirm" >Confirm</button>
                    </div>
                </div>
            </div >
        );
    }

    handleChangeTitle(event: React.FormEvent<HTMLInputElement>) {
        this.editState({ title: event.target.value });
    }
    handleChangeLink(event: React.FormEvent<HTMLInputElement>) {
        this.editState({ link: event.target.value });
    }
    handleHide(event: React.MouseEvent<HTMLElement>){
        this.hide();
    }

    display() {
        this.editState({ open: true });
    }
    hide() {
        this.editState({ open: false });
    }
}

interface AddFeedModalState {
    open: boolean;
    title: string;
    link: string;
}