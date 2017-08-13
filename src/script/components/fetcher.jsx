import React from 'react'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import { startFetch, endFetch } from '../actions/fetcher-actions'
import { fetchRSSFeed, fetchAtomFeed } from '../utils/feed-parser'
import { updateArticles } from '../actions/feeds-actions'

class Fetch extends React.Component {

  constructor() {
    super()
    this._fetchFeeds = this._fetchFeeds.bind(this)
  }

  render() {
    const fetcherIconClasses = ['fa']
    fetcherIconClasses.push(`fa-${this.props.isFetching ? 'refresh fa-spin' : 'download'}`)

    return (
      <div className='fetch-feeds-button' onClick={this._fetchFeeds}>
        <i className={fetcherIconClasses.join(' ')} aria-hidden='true' />
      </div>
    )
  }

  async _fetchFeeds() {
    if (this.props.feeds.length === 0) return

    this.props.startFetch()

    let endedRequests = 0

    for (const feed of this.props.feeds) {
      const type = feed.type;

      (type === 'rss' ? fetchRSSFeed : fetchAtomFeed)(feed.url)
        .then(newArticles => {

          const mergedArticles = feed.articles

          for (const newArticle of newArticles) {
            if (mergedArticles.findIndex(article => article.id === newArticle.id) !== -1) continue
            mergedArticles.push(newArticle)
          }

          this.props.updateArticles(feed.title, mergedArticles)

          endedRequests++

          if (endedRequests === this.props.feeds.length)
            this.props.endFetch()
        })
    }
  }
}

export default connect(
  (state) => ({
    isFetching: state.FetcherReducer.isFetching,
    feeds: state.FeedsReducer.feeds
  }),
  (dispatch) => bindActionCreators({ startFetch, endFetch, updateArticles }, dispatch)
)(Fetch)
