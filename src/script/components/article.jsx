import React from 'react'

class Article extends React.Component {
  render () {
    return (
      <div className={`article ${this.props.articleInfos.read === true ? '' : 'unread'}`}>
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

export default Article
