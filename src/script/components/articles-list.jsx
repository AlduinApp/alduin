import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import Article from './article'

class ArticlesList extends React.Component {
  render() {
    const selectedFeed = this.props.feeds.find(feed => feed.title == this.props.selectedFeed)
    const content = selectedFeed === undefined ? <p className='no-feed'>No feed selected</p> : selectedFeed.articles.map((article, idx) => <Article key={article.title} articleInfos={article} feedId={idx} />)

    console.log('RENDER ARTICLE LIST', this.props.feeds)

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
