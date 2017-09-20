import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

class Footer extends React.Component {
  render() {
    return (
      <footer>
        <div className='tooltip'>
          {this.props.tooltip}
        </div>
        <div className='alduins-links'>
          <a className='about' href='http://stouder.io'>
            <i className='fa fa-question-circle' aria-hidden='true' /> About
                </a>
          <a className='fork-me' href='https://github.com/Xstoudi/alduin'>
            <i className='fa fa-code-fork' aria-hidden='true' /> Fork me
                </a>
          <a className='report-issue' href='https://github.com/Xstoudi/alduin/issues'>
            <i className='fa fa-exclamation-triangle' aria-hidden='true' /> Any issue?
                </a>
        </div>
      </footer>
    )
  }
}

export default connect(
  (state) => ({
    tooltip: state.TooltipReducer.tooltip
  })
)(Footer)
