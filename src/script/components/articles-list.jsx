import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import Article from './article'

class ArticlesList extends React.Component {
  render() {
    const feedIndex = this.props.feeds.findIndex(feed => feed.title == this.props.selectedFeed)
    const selectedFeed = this.props.feeds[feedIndex]
    const content = selectedFeed === undefined ? <p className='no-feed'>Select a feed</p> : selectedFeed.articles.sort((a, b) => b.date - a.date).map((article, idx) => <Article key={article.title} articleInfos={article} feedId={feedIndex} isRtl={selectedFeed.isRtl}/>)

    return (
      <div className='articles-list'>
        {content}
      </div>
    )
  }
}

export default connect(
  (state) => ({
    feeds: state.FeedsReducer.feeds,
    selectedFeed: state.FeedsReducer.selectedFeed
  }),
  (dispatch) => bindActionCreators({ }, dispatch)
)(ArticlesList)
