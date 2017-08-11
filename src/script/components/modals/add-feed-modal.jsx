import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import { closeCurrentModal } from '../../actions/modal-actions'
import { addFeed } from '../../actions/feeds-actions'
import { addFeedError } from '../../actions/errors-actions'
import { display, hide } from '../../actions/loader-actions'
import { fetchRSSFeed, fetchAtomFeed } from '../../utils/feed-parser'
import BadFeedType from '../../errors/bad-feed-type'

class AddFeedModal extends React.Component {

  constructor() {
    super()

    this._submit = this._submit.bind(this)
  }

  render() {
    return (
      <div className={'modal-background' + ' ' + (this.props.openModal === 'add-feed' ? '' : 'hidden')}>
        <div className='modal'>
          <div className='modal-header'>
            Add Feed
          </div>
          <div className='modal-body'>
            {
              this.props.error != null ? <div className='modal-error'>{this.props.error}</div> : null
            }
            <div className='modal-group-input'>
              <div className='modal-label'>Display name</div>
              <div className='modal-input'>
                <input type='text' id='feed-title' />
              </div>
            </div>
            <div className='modal-group-input'>
              <div className='modal-label'>Link</div>
              <div className='modal-input'>
                <input type='text' id='feed-url' />
              </div>
            </div>
            <div className='modal-group-input'>
              <div className='modal-label'>Feed type</div>
              <div className='modal-input'>
                <div className='modal-radio'>
                  <input type='radio' name='feed-type' id='feed-type-rss' />
                  <label htmlFor='feed-type-rss'><span className='radio-border'><span /></span><span>RSS</span></label>
                </div>
                <div className='modal-radio'>
                  <input type='radio' name='feed-type' id='feed-type-atom' />
                  <label htmlFor='feed-type-atom'><span className='radio-border'><span /></span><span>Atom</span></label>
                </div>
                <div className='modal-radio'>
                  <input type='radio' name='feed-type' id='feed-type-json' />
                  <label htmlFor='feed-type-json'><span className='radio-border'><span /></span><span>JSON</span></label>
                </div>
              </div>
            </div>
          </div>
          <div className='modal-footer'>
            <button className='cancel-button' onClick={this.props.closeCurrentModal}>Cancel</button>
            <button className='validate-button' onClick={this._submit}>Add feed</button>
          </div>
        </div>
      </div>
    )
  }

  async _submit() {
    // Title checking
    const title = document.getElementById('feed-title').value
    if (title.length === 0)
      return this.props.addFeedError('The feed need a display name')

    // Url cheking
    const url = document.getElementById('feed-url').value
    if (url.length === 0)
      return this.props.addFeedError('Please give an url')

    // Type checking
    const types = ['rss', 'atom', 'json']
    let type = null

    types.forEach(typeCompare => {
      if (document.getElementById(`feed-type-${typeCompare}`).checked === true)
        type = typeCompare
    })

    if (type == null)
      return this.props.addFeedError('Please select feed type')

    // Already exists checking
    if (this.props.feeds.findIndex(feed => feed.title === title) != -1)
      return this.props.addFeedError('A feed with this title already exists')
    if (this.props.feeds.findIndex(feed => feed.url === url) != -1)
      return this.props.addFeedError('A feed with this url already exists')

    // Block UI
    this.props.display()

    // Fetch
    let articles = null
    let error = null
    if (type === 'rss') {
      try {
        articles = await fetchRSSFeed(url)
      } catch (err) {
        error = err
      }
    } else if (type === 'atom') {
      try {
        articles = await fetchAtomFeed(url)
      } catch (err) {
        error = err
      }
    } else
      error = 'JSON feeds not supported for now'

    if (error == null) {
      this.props.addFeed(title, url, type, articles)
      this.props.closeCurrentModal()
      
    } else
      this.props.addFeedError(error instanceof BadFeedType ? 'Unrecognized feed type' : 'Failed to fetch feed')
    
    // Unblock UI
    this.props.hide()
  }
}

export default connect(
  (state) => ({
    openModal: state.ModalReducer.openModal,
    error: state.ErrorsReducer.addFeedError,
    feeds: state.FeedsReducer.feeds
  }),
  (dispatch) => bindActionCreators({ closeCurrentModal, addFeed, addFeedError, display, hide }, dispatch)
)(AddFeedModal)
