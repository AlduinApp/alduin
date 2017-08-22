import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import { selectArticle, markArticleAsRead } from '../actions/feeds-actions'

class Article extends React.Component {
  render() {
    return (
      <div
        className={`article ${this.props.articleInfos.read === true ? '' : 'unread'}`}
        onClick={() => {
            this.props.selectArticle(this.props.articleInfos)
            this.props.markArticleAsRead(this.props.feedId, this.props.articleInfos.id)
          }
        }
      >
        <div className='article-header'>
          <span className='article-title'>{this.props.articleInfos.title}</span>
          <span className='article-date'>{new Date(this.props.articleInfos.date).toLocaleDateString()}</span>
        </div>
        <p
          className='article-intro'
          dangerouslySetInnerHTML={{
            __html: `${this.props.articleInfos.content.replace(/<a( href=".*"){0,1}>/, "")
              .replace(/<\/a>/, "")
              .substring(0, 360)
              .replace("\n", " ")
              .trim()}...`
          }}>
        </p>
      </div>
    )
  }
}


export default connect(
  (state) => ({}),
  (dispatch) => bindActionCreators({ selectArticle, markArticleAsRead }, dispatch)
)(Article)
