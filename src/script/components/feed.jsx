import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { remote } from "electron";
const { Menu, MenuItem } = remote;

import { selectFeed, markArticlesAsRead } from '../actions/feeds-actions'
import { openEditFeedModal } from '../actions/modal-actions'

class Feed extends React.Component {

  constructor() {
    super()

    this._dragFeed = this._dragFeed.bind(this)
    this._handleRightClick = this._handleRightClick.bind(this)
  }

  render() {
    const unread = this.props.feedInfos.articles.filter(article => !article.read).length
    const unreadNotif = unread > 0 ? (
      <div className='feed-unread'>
        <span className='feed-unread-number'>{unread}</span>
      </div>
    ) : null

    return (
      <div
        className={`feed ${this.props.selectedFeed === this.props.feedInfos.title ? 'active' : ''}`}
        onClick={() => this.props.selectFeed(this.props.feedInfos.title)}
        draggable='true'
        onDragStart={this._dragFeed}
        onContextMenu={this._handleRightClick}
      >
        <div className='feed-icon'>
          <i className='fa fa-rss' aria-hidden='true' />
        </div>
        <div className='feed-title'>{this.props.feedInfos.title}</div>
        {unreadNotif}
      </div>
    )
  }

  _dragFeed(event) {
    event.dataTransfer.setData('text/plain', this.props.feedIdx)
    event.dataTransfer.dropEffect = 'move'
  }

  _handleRightClick(event) {
    const menu = new Menu()
    menu.append(new MenuItem({
      label: 'Mark as read',
      click: () => this.props.markArticlesAsRead(this.props.feedIdx)
    }))
    menu.append(new MenuItem({
      label: 'Edit feed name',
      click: () => this.props.openEditFeedModal(this.props.feedIdx)
    }))
    menu.popup()
  }
}

export default connect(
  (state) => ({
    selectedFeed: state.FeedsReducer.selectedFeed
  }),
  (dispatch) => bindActionCreators({ selectFeed, markArticlesAsRead, openEditFeedModal }, dispatch)
)(Feed)
