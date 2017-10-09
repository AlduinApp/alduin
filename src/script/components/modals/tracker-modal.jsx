import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { remote } from 'electron'
import osName from 'os-name'
import getos from 'getos'
import * as os from 'os'
import promisify from 'util.promisify'

import { setToken, dntm } from '../../actions/tracker-actions'
import { displayLoader, hideLoader } from '../../actions/loader-actions'
import { closeCurrentModal } from '../../actions/modal-actions'

class TrackerModal extends React.Component {
  constructor() {
    super()

    this._inputs = {}

    this._createToken = this._createToken.bind(this)
  }

  render() {
    return (
      <div className={'modal-background' + ' ' + (this.props.token == null || !/^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(this.props.token) ? '' : 'hidden')}>
        <div className='modal'>
          <div className='modal-header'>
            Information feedback
          </div>
          <div className='modal-body tracker'>
            {
              this.props.error != null ? <div className='modal-error'>{this.props.error}</div> : null
            }
            <div className='modal-group-input'>
              <p>Hey! Would you let us collect some datas to improve Alduin? Here is what we collect exactly:</p>
              <ul>
                <li>Time you pass using Alduin (to search for sponsors)</li>
                <li>Language, country of you computer (improve the i18n of Alduin)</li>
              </ul>
            </div>
            <div className='modal-group-input'>
              <div className='modal-label'>Enable data collecting</div>
              <div className='modal-input'>
                <div className='modal-checkbox'>
                  <input type='checkbox' id='dntm' ref={ref => this._inputs.dntm = ref} defaultChecked={true} />
                  <label htmlFor='dntm'><span className='checkbox-border'><span /></span></label>
                </div>
              </div>
            </div>
          </div>
          <div className='modal-footer'>
            <button className='validate-button' onClick={() => (this._createToken(() => this.props.closeCurrentModal()))}>Validate</button>
          </div>
        </div>
      </div>
    )
  }

  async _createToken(callback) {

    this.props.displayLoader()

    let tokenReqBody = {}

    if (this._inputs.dntm.checked === true) {

      tokenReqBody = {
        locale: remote.app.getLocale(),
        os: osName()
      }

      if (os.platform() === 'linux') {
        const os = await promisify(getos)()
        tokenReqBody = { ...tokenReqBody, os: `${os.dist} ${os.release}` }
      }
    } else {
      this.props.dntm()
      tokenReqBody = {
        dntm: true
      }
    }

    const res = await fetch('http://alduin.stouder.io:4000/api/token', {
      method: 'POST',
      mode: 'cors',
      headers: new Headers({
        'Content-Type': 'application/json',
        'User-Agent': 'Alduin'
      }),
      body: JSON.stringify(tokenReqBody)
    })
      .then(res => (this._badTokenHandler(res), res.json()))
      .catch(err => {
        this.props.hideLoader()
        callback()
        throw err
      })

    if (res.token !== undefined) {
      this.props.setToken(res.token)
      this.props.hideLoader()
      callback()
    }
  }

  _badTokenHandler(res) {
    if (res.status === 400)
      remote.app.quit()
  }
}

export default connect(
  (state) => ({
    token: state.TrackerReducer.token
  }),
  (dispatch) => bindActionCreators({
    closeCurrentModal,
    setToken, dntm,
    displayLoader, hideLoader
  }, dispatch)
)(TrackerModal)
