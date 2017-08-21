import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

class ArticleContent extends React.Component {
  render() {
    let content
    if(this.props.selectedArticle == null) content = 'Select an article'
    else content = <div><h1>{this.props.selectedArticle.title}</h1> <div dangerouslySetInnerHTML={{__html: this.props.selectedArticle.content}}></div></div>

    return (
      <div className='article-content'>
        {content}
      </div>
    )
  }
}

export default connect(
  (state) => ({
    selectedArticle: state.FeedsReducer.selectedArticle
  }),
  (dispatch) => bindActionCreators({}, dispatch)
)(ArticleContent)
