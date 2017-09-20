import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { remote } from 'electron'

import { setMaximized } from '../actions/window-actions'

class Header extends React.Component {
  constructor () {
    super()

    this._window = remote.getCurrentWindow()

    this._minimizeWindow = this._minimizeWindow.bind(this)
    this._maximizeWindow = this._maximizeWindow.bind(this)
    this._closeWindow = this._closeWindow.bind(this)

    this._window.on('resize', () => {
      this.props.setMaximized(this._window.isMaximized())
    })
  }

  render () {
    return (
      <header>
        <div className='minimize' onClick={this._minimizeWindow}>
          <i className='fa fa-window-minimize' aria-hidden='true' />
        </div>
        <div className='maximize' onClick={this._maximizeWindow}>
          <i className={`fa ${this.props.isMaximized ? 'fa-window-restore' : 'fa-window-maximize'}`} aria-hidden='true' />
        </div>
        <div className='close' onClick={this._closeWindow}>
          <i className='fa fa-window-close' aria-hidden='true' />
        </div>
      </header>
    )
  }

  _minimizeWindow () {
    this._window.minimize()
  }
  _maximizeWindow () {
    const window = this._window
    this.props.isMaximized ? window.unmaximize() : window.maximize()
  }
  _closeWindow () {
    this._window.close()
  }
}

export default connect(
    (state) => ({ isMaximized: state.WindowReducer.isMaximized }),
    (dispatch) => bindActionCreators({ setMaximized }, dispatch)
)(Header)
