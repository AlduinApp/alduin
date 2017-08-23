import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import { selectFeed } from '../actions/feeds-actions'

class Feed extends React.Component {

  constructor() {
    super()

    this._dragFeed = this._dragFeed.bind(this)
  }

  render() {
    const unread = this.props.feedInfos.articles.filter(article => !article.read).length

    return (
      <div
        className={`feed ${this.props.selectedFeed === this.props.feedInfos.title ? 'active' : ''}`}
        onClick={() => this.props.selectFeed(this.props.feedInfos.title)}
        draggable='true'
        onDragStart={this._dragFeed}
      >
        <div className='feed-icon'>
          <i className='fa fa-rss' aria-hidden='true' />
        </div>
        <div className='feed-title'>{this.props.feedInfos.title}</div>
        <div className='feed-unread'>
          <span className='feed-unread-number'>{unread}</span>
        </div>
      </div>
    )
  }

  _dragFeed(event) {
    event.dataTransfer.setData('text/plain', this.props.feedIdx)
    event.dataTransfer.dropEffect = 'move'
  }
}

export default connect(
  (state) => ({
    selectedFeed: state.FeedsReducer.selectedFeed
  }),
  (dispatch) => bindActionCreators({ selectFeed }, dispatch)
)(Feed)
