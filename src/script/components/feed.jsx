import React from 'react'

class Feed extends React.Component{
  render() {
    console.log(this.props.feedInfos)

    const unread = this.props.feedInfos.articles.filter(article => !article.read).length

    return (
      <div className='feed'>
        <div className='feed-icon'>
          <i className='fa fa-rss' aria-hidden='true' />
        </div>
        <div className='feed-title'>{this.props.feedInfos.title}</div>
        <div className='feed-unread'>
          <span className='feed-unread-number'>{unread}</span>
        </div>
      </div>
    )
  }
}

export default Feed