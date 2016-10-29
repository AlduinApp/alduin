import * as React from "react";

export class AddFeedModal extends React.Component<AddFeedModalProps, AddFeedModalState> {
    render() {
        return <div id="add-feed-modal" className="modal">
            <div className="content">
                <i className="fa fa-times close-modal-button" aria-hidden="true"></i>
                <h3>Add Feed</h3>
                <div className="scroll view">
                    <div className="input group">
                        <label>Display name</label><input id="feed-title-input" type="text" placeholder="Feed title" />
                    </div>
                    <div className="input group">
                        <label>Link</label><input id="feed-link-input" type="text" placeholder="Feed link" />
                    </div>
                    <button className="main success button" id="add-feed-confirm" >Confirm</button>
                </div>
            </div>
        </div>
    }
}

interface AddFeedModalProps {

}
interface AddFeedModalState {
    open: boolean;
}