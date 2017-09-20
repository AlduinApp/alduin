import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

class Tracker extends React.Component {
  render() {
    if(this.props.dntm != null){

    }
    return <div></div>
  }
}

export default connect(
  (state) => ({
    token: state.TrackerReducer.token,
    dntm: state.TrackerReducer.dntm
  }),
  (dispatch) => bindActionCreators({}, dispatch)
)(Loader)
