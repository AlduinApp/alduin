import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import { remote } from 'electron'

class Heartbeat extends React.Component {
  constructor() {
    super()

    this.interval = -1

    this._heartbeat = this._heartbeat.bind(this)
  }

  componentDidMount(){
    this._heartbeat()
  }

  render() {
    return <div></div>
  }

  componentWillUnmount(){
    clearInterval(this.interval)
    this.interval = -1
  }

  async _heartbeat() {
    if (this.props.token != null && this.props.dntm === false) {
      const res = await fetch('http://alduin.stouder.io:4000/api/heartbeat', {
        method: 'POST',
        headers: new Headers({
          'Content-Type': 'application/json',
          'User-Agent': 'Alduin'
        }),
        body: JSON.stringify({
          token: this.props.token,
          version: remote.app.getVersion()
        })
      })
      this._badTokenHandler(res)
    }
    if(this.interval === -1)
      this.interval = setInterval(this._heartbeat, 60000)
  }

  _badTokenHandler(res) {
    if (res.status === 400)
      remote.app.quit()
  }
}

export default connect(
  (state) => ({
    token: state.TrackerReducer.token,
    dntm: state.TrackerReducer.dntm
  })
)(Heartbeat)
