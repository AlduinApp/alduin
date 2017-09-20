import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import { updateWaiter } from '../../utils/update-waiter'

import { closeCurrentModal } from '../../actions/modal-actions'

class UpdateModal extends React.Component {
  render() {

    const button = process.platform === 'win32' ? (
      <button className='validate-button' onClick={() => updateWaiter.start()}>Install</button>
    ) : (
      <button className='validate-button' onClick={() => process.exit(0)}>Quit</button>
    )

    return (
      <div className={'modal-background' + ' ' + (this.props.openModal === 'update' ? '' : 'hidden')}>
        <div className='modal'>
          <div className='modal-header'>
            An update is available
          </div>
          <div className='modal-footer'>
            {button}
          </div>
        </div>
      </div>
    )
  }
}

export default connect(
  (state) => ({ openModal: state.ModalReducer.openModal, })
)(UpdateModal)
