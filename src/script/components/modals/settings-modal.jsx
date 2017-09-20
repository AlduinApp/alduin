import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import { closeCurrentModal } from '../../actions/modal-actions'
import { saveSettings } from '../../actions/settings-actions'

class SettingsModal extends React.Component {
  constructor() {
    super()

    this._inputs = {}

    this._saveSettings = this._saveSettings.bind(this)
  }

  render() {
    return (
      <div className={'modal-background' + ' ' + (this.props.openModal === 'settings' ? '' : 'hidden')}>
        <div className='modal'>
          <div className='modal-header'>
            Settings
          </div>
          <div className='modal-body'>
            {
              this.props.error != null ? <div className='modal-error'>{this.props.error}</div> : null
            }
            <div className='modal-group-input'>
              <div className='modal-label'>Fetch interval</div>
              <div className='modal-input'>
                <div className='number-selector'>
                  <input
                    type='number'
                    min={1}
                    step={0.5}
                    id='fetch-interval'
                    defaultValue={this.props.fetchInterval}
                    ref={ref => this._inputs.fetchInterval = ref}
                  />
                  <span className='after-input'>minutes</span>
                </div>
              </div>
            </div>
            <div className='modal-group-input'>
              <div className='modal-label'>Fetch sound</div>
              <div className='modal-input'>
                <div className='modal-checkbox'>
                  <input type='checkbox' id='pop-sound' ref={ref => this._inputs.pop = ref} defaultValue={this.props.popOnFetch} />
                  <label htmlFor='pop-sound'><span className='checkbox-border'><span /></span></label>
                </div>
              </div>
            </div>
          </div>
          <div className='modal-footer'>
            <button className='cancel-button' onClick={this.props.closeCurrentModal}>Cancel</button>
            <button className='validate-button' onClick={() => (this._saveSettings(), this.props.closeCurrentModal())}>Save</button>
          </div>
        </div>
      </div>
    )
  }

  _saveSettings() {
    this.props.saveSettings({ fetchInterval: Number(this._inputs.fetchInterval.value), popOnFetch: this._inputs.pop.checked })
  }
}

export default connect(
  (state) => ({
    openModal: state.ModalReducer.openModal,
    fetchInterval: state.SettingsReducer.fetchInterval,
    popOnFetch: state.SettingsReducer.popOnFetch
  }),
  (dispatch) => bindActionCreators({
    closeCurrentModal,
    saveSettings
  }, dispatch)
)(SettingsModal)
