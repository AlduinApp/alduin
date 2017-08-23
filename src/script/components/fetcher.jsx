import React from 'react'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import { startFetch, endFetch } from '../actions/fetcher-actions'
import { fetchRSSFeed, fetchAtomFeed } from '../utils/feed-parser'
import { updateArticles } from '../actions/feeds-actions'
import { setTooltip, resetTooltip } from '../actions/tooltip-actions'

class Fetch extends React.Component {

  constructor() {
    super()

    this._fetchFeeds = this._fetchFeeds.bind(this)
    this.autoFetcherId = -1
    this.actualInterval = -1
  }

  render() {
    if (this.actualInterval !== this.props.fetchInterval) {
      this.actualInterval = this.props.fetchInterval
      this.runAutoFetcher()
    }

    const fetcherIconClasses = ['fa']
    fetcherIconClasses.push(`fa-${this.props.isFetching ? 'refresh fa-spin' : 'download'}`)

    return (
      <div
        className='fetch-feeds-button'
        onMouseEnter={() => this.props.setTooltip('Click to fetch feeds')}
        onMouseLeave={this.props.resetTooltip}
        onClick={this._fetchFeeds}
      >
        <i className={fetcherIconClasses.join(' ')} aria-hidden='true' />
      </div>
    )
  }

  runAutoFetcher() {
    if (this.autoFetcherId !== -1) clearInterval(this.autoFetcherId)
    this.autoFetcherId = setInterval(async () => await this._fetchFeeds(), this.props.fetchInterval * 60000)
  }

  async _fetchFeeds() {
    if (this.props.feeds.length === 0) return
    if (this.props.isFetching === true) return

    this.props.startFetch()

    let endedRequests = 0
    let fetchedArticlesNbre = 0

    for (const feed of this.props.feeds) {
      const type = feed.type;

      (type === 'rss' ? fetchRSSFeed : fetchAtomFeed)(feed.url)
        .then(newArticles => {

          const mergedArticles = feed.articles

          for (const newArticle of newArticles) {
            if (mergedArticles.findIndex(article => article.id === newArticle.id) !== -1) continue
            mergedArticles.push(newArticle)
            fetchedArticlesNbre++
          }

          this.props.updateArticles(feed.title, mergedArticles)

          endedRequests++

          if (endedRequests === this.props.feeds.length) {
            this.props.endFetch()
            if (fetchedArticlesNbre > 0)
              new Notification('New articles', {
                body: `Alduin just fetch ${fetchedArticlesNbre} new articles !`
              })
          }
        })
        .catch(err => {
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
    feeds: state.FeedsReducer.feeds,
    fetchInterval: state.SettingsReducer.fetchInterval
  }),
  (dispatch) => bindActionCreators({
    startFetch,
    endFetch,
    updateArticles,
    setTooltip,
    resetTooltip
  }, dispatch)
)(Fetch)
