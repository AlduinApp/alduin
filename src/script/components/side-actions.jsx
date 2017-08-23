import React from 'react'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import { openAddFeedModal } from '../actions/modal-actions'
import { setTooltip, resetTooltip } from '../actions/tooltip-actions'
import Fetch from './fetcher'
import Trash from './trash'

class SideActions extends React.Component {
  render () {
    return (
      <div className='action-buttons'>
        <div 
          className='add-feed-button'
          onMouseEnter={() => this.props.setTooltip('Click to add a feed')}
          onMouseLeave={this.props.resetTooltip}
          onClick={this.props.openAddFeedModal}
        >
          <i className='fa fa-plus' aria-hidden='true' />
        </div>
        <Fetch />
        <Trash />
        <div 
          className='settings-button'
          onMouseEnter={() => this.props.setTooltip('Open Alduin\'s settings')}
          onMouseLeave={this.props.resetTooltip}
        >
          <i className='fa fa-cog faa-spin faa-slow animated-hover' aria-hidden='true' />
        </div>
      </div>
    )
  }
}

export default connect(
    (state) => ({ }),
    (dispatch) => bindActionCreators({ openAddFeedModal, setTooltip, resetTooltip }, dispatch)
)(SideActions)
