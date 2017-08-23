import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import { closeCurrentModal } from '../../actions/modal-actions'
import { addFeed } from '../../actions/feeds-actions'
import { addAddFeedError, removeAddFeedError } from '../../actions/errors-actions'
import { displayLoader, hideLoader } from '../../actions/loader-actions'
import { fetchRSSFeed, fetchAtomFeed, fetchJSONFeed } from '../../utils/feed-parser'
import BadFeedType from '../../errors/bad-feed-type'

class AddFeedModal extends React.Component {

  constructor() {
    super()

    this._inputs = {}

    this._submit = this._submit.bind(this)
  }

  componentDidUpdate(prevProps) {
    if (this.props.openModal === 'add-feed' && this.props.openModal !== prevProps.openModal)
      this._inputs.title.focus()
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
                <input type='text' id='add-feed-feed-title' ref={ref => this._inputs.title = ref} />
              </div>
            </div>
            <div className='modal-group-input'>
              <div className='modal-label'>Link</div>
              <div className='modal-input'>
                <input type='text' id='add-feed-feed-url' ref={ref => this._inputs.url = ref} />
              </div>
            </div>
            <div className='modal-group-input'>
              <div className='modal-label'>Feed type</div>
              <div className='modal-input'>
                <div className='modal-radio'>
                  <input type='radio' name='feed-type' id='add-feed-feed-type-rss' ref={ref => this._inputs.feed_rss = ref} />
                  <label htmlFor='add-feed-feed-type-rss'><span className='radio-border'><span /></span><span>RSS</span></label>
                </div>
                <div className='modal-radio'>
                  <input type='radio' name='feed-type' id='add-feed-feed-type-atom' ref={ref => this._inputs.feed_atom = ref} />
                  <label htmlFor='add-feed-feed-type-atom'><span className='radio-border'><span /></span><span>Atom</span></label>
                </div>
                <div className='modal-radio'>
                  <input type='radio' name='feed-type' id='add-feed-feed-type-json' ref={ref => this._inputs.feed_json = ref} />
                  <label htmlFor='add-feed-feed-type-json'><span className='radio-border'><span /></span><span>JSON</span></label>
                </div>
              </div>
            </div>
          </div>
          <div className='modal-footer'>
            <button className='cancel-button' onClick={() => (this.props.closeCurrentModal(), this._reset())}>Cancel</button>
            <button className='validate-button' onClick={this._submit}>Add feed</button>
          </div>
        </div>
      </div>
    )
  }

  async _submit() {
    // Title checking
    const title = document.getElementById('add-feed-feed-title').value
    if (title.length === 0)
      return this.props.addAddFeedError('The feed need a display name')

    // Url cheking
    const url = document.getElementById('add-feed-feed-url').value
    if (url.length === 0)
      return this.props.addAddFeedError('Please give an url')

    // Type checking
    const types = ['rss', 'atom', 'json']
    let type = null

    types.forEach(typeCompare => {
      if (document.getElementById(`add-feed-feed-type-${typeCompare}`).checked === true)
        type = typeCompare
    })

    if (type == null)
      return this.props.addAddFeedError('Please select feed type')

    // Already exists checking
    if (this.props.feeds.findIndex(feed => feed.title === title) != -1)
      return this.props.addAddFeedError('A feed with this title already exists')
    if (this.props.feeds.findIndex(feed => feed.url === url) != -1)
      return this.props.addAddFeedError('A feed with this url already exists')

    // Block UI
    this.props.displayLoader()

    // Fetch
    let articles = null
    let error = null
    if (type === 'rss')
      try {
        articles = await fetchRSSFeed(url)
      } catch (err) {
        error = err
      }
    else if (type === 'atom')
      try {
        articles = await fetchAtomFeed(url)
      } catch (err) {
        error = err
      }
    else
      try {
        articles = await fetchJSONFeed(url)
      } catch (err) {
        error = err
      }

    if (error == null) {
      this.props.addFeed(title, url, type, articles)
      this.props.closeCurrentModal()
      this._reset()
    } else
      this.props.addAddFeedError(error instanceof BadFeedType ? 'Unrecognized feed type' : 'Failed to fetch feed')

    // Unblock UI
    this.props.hideLoader()
  }

  _reset() {
    this._inputs.title.value = this._inputs.url.value = ''
    this._inputs.feed_rss.checked = this._inputs.feed_atom.checked = this._inputs.feed_json.checked = false
    this.props.removeAddFeedError()
  }
}

export default connect(
  (state) => ({
    openModal: state.ModalReducer.openModal,
    error: state.ErrorsReducer.addFeedError,
    feeds: state.FeedsReducer.feeds
  }),
  (dispatch) => bindActionCreators({
    closeCurrentModal,
    addFeed,
    addAddFeedError, removeAddFeedError,
    displayLoader, hideLoader
  }, dispatch)
)(AddFeedModal)
