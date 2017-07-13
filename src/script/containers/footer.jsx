import React from 'react'

class Footer extends React.Component {

    render() {
        return (
            <footer>
                <a className="about" href="http://stouder.io">
                    <i className="fa fa-question-circle" aria-hidden="true"></i> About
                </a>
                <a className="fork-me" href="https://github.com/Xstoudi/alduin">
                    <i className="fa fa-code-fork" aria-hidden="true"></i> Fork me
                </a>
                <a className="report-issue" href="https://github.com/Xstoudi/alduin/issues">
                    <i className="fa fa-exclamation-triangle" aria-hidden="true"></i> Any issue?
                </a>
            </footer>
        )
    }
}

export default Footer