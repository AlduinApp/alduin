import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import { closeCurrentModal } from '../../actions/modal-actions'
import { addFeed, editFeed } from '../../actions/feeds-actions'
import { addEditFeedError, removeEditFeedError } from '../../actions/errors-actions'
import { fetchRSSFeed, fetchAtomFeed, fetchJSONFeed } from '../../utils/feed-parser'
import BadFeedType from '../../errors/bad-feed-type'

class EditFeedModal extends React.Component {

  constructor() {
    super()

    this._inputs = {}

    this._submit = this._submit.bind(this)
  }

  componentDidUpdate(prevProps) {
    if (this.props.openModal === 'edit-feed' && this.props.openModal !== prevProps.openModal){
      this._inputs.title.focus()
      this._inputs.title.value = this.props.feeds[this.props.feedId].title
    }
  }

  render() {
    return (
      <div className={'modal-background' + ' ' + (this.props.openModal === 'edit-feed' ? '' : 'hidden')}>
        <div className='modal'>
          <div className='modal-header'>
            Edit Feed
          </div>
          <div className='modal-body'>
            {
              this.props.error != null ? <div className='modal-error'>{this.props.error}</div> : null
            }
            <div className='modal-group-input'>
              <div className='modal-label'>Display name</div>
              <div className='modal-input'>
                <input 
                  type='text'
                  id='edit-feed-feed-title'
                  ref={ref => this._inputs.title = ref}
                />
              </div>
            </div>
          </div>
          <div className='modal-footer'>
            <button className='cancel-button' onClick={() => (this.props.closeCurrentModal(), this._reset())}>Cancel</button>
            <button className='validate-button' onClick={this._submit}>Edit feed</button>
          </div>
        </div>
      </div>
    )
  }

  async _submit() {
    // Title checking
    const title = document.getElementById('edit-feed-feed-title').value
    if (title.length === 0)
      return this.props.addEditFeedError('The feed need a display name')

    // Already exists checking
    if (this.props.feeds.findIndex(feed => feed.title === title) != -1)
      return this.props.addEditFeedError('A feed with this title already exists')

    this.props.editFeed(this.props.feedId, title)
    this.props.closeCurrentModal()
    this._reset()
  }

  _reset() {
    this._inputs.title.value = ''
    this.props.removeEditFeedError()
  }
}

export default connect(
  (state) => ({
    error: state.ErrorsReducer.editFeedError,
    openModal: state.ModalReducer.openModal,
    feedId: state.ModalReducer.datas,
    feeds: state.FeedsReducer.feeds
  }),
  (dispatch) => bindActionCreators({
    closeCurrentModal,
    editFeed,
    addEditFeedError, removeEditFeedError
  }, dispatch)
)(EditFeedModal)
