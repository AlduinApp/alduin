import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

class Loader extends React.Component {
  render() {
    return this.props.displayLoader ? <div className='mask'></div> : null
  }
}

export default connect(
  (state) => ({
    displayLoader: state.LoaderReducer.display
  }),
  (dispatch) => bindActionCreators({}, dispatch)
)(Loader)
