import React from 'react'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import { openAddFeedModal } from '../actions/modal-actions'
import Fetch from './fetcher'

class SideActions extends React.Component {
  render () {
    return (
      <div className='action-buttons'>
        <div className='add-feed-button' onClick={this.props.openAddFeedModal}>
          <i className='fa fa-plus' aria-hidden='true' />
        </div>
        <Fetch />
        <div className='delete-feed-button'>
          <i className='fa fa-trash' aria-hidden='true' />
        </div>
        <div className='settings-button'>
          <i className='fa fa-cog faa-spin faa-slow animated-hover' aria-hidden='true' />
        </div>
      </div>
    )
  }
}

export default connect(
    (state) => ({ }),
    (dispatch) => bindActionCreators({ openAddFeedModal }, dispatch)
)(SideActions)
