import React from 'react'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import { setTooltip, resetTooltip } from '../actions/tooltip-actions'
import { deleteFeed } from '../actions/feeds-actions'

class Trash extends React.Component {

  constructor() {
    super()
    this._dropInTrash = this._dropInTrash.bind(this)
  }

  render() {
    return (
      <div
        className='delete-feed-button'
        onMouseEnter={() => this.props.setTooltip('Drag a feed here to delete it')}
        onMouseLeave={this.props.resetTooltip}
        onDragOver={(e) => e.preventDefault()}
        onDrop={this._dropInTrash}
      >
        <i className='fa fa-trash' aria-hidden='true' />
      </div>
    )
  }

  _dropInTrash(event) {
    event.preventDefault()
    this.props.deleteFeed(event.dataTransfer.getData('text'))
  }
}

export default connect(
  (state) => ({}),
  (dispatch) => bindActionCreators({ setTooltip, resetTooltip, deleteFeed }, dispatch)
)(Trash)
