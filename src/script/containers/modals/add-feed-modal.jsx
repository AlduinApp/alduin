import React from 'react'

class AddFeedModal extends React.Component {

    render() {
        return (
            <div className="modal-background" onClick={(e) => console.log('click', e.target)}>
                <div className="modal">
                    <div className="modal-header">
                        Add Feed
                    </div>
                    <div className="modal-body">
                        <div className="modal-group-input">
                            <div className="modal-label">Display name</div>
                            <div className="modal-input">
                                <input type="text" />
                            </div>
                        </div>
                        <div className="modal-group-input">
                            <div className="modal-label">Link</div>
                            <div className="modal-input">
                                <input type="text" />
                            </div>
                        </div>
                        <div className="modal-group-input">
                            <div className="modal-label">Feed type</div>
                            <div className="modal-input">
                                <div className="modal-radio">
                                    <input type="radio" name="feed-type" id="feed-type-rss" />
                                    <label htmlFor="feed-type-rss"><span className="radio-border"><span></span></span><span>RSS</span></label>
                                </div>
                                <div className="modal-radio">
                                    <input type="radio" name="feed-type" id="feed-type-atom" />
                                    <label htmlFor="feed-type-atom"><span className="radio-border"><span></span></span><span>Atom</span></label>
                                </div>
                                <div className="modal-radio">
                                    <input type="radio" name="feed-type" id="feed-type-json" />
                                    <label htmlFor="feed-type-json"><span className="radio-border"><span></span></span><span>JSON</span></label>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="modal-footer">
                        <button className="cancel-button">Cancel</button>
                        <button className="validate-button">Add feed</button>
                    </div>
                </div>
            </div>
        )
    }
}

export default AddFeedModal