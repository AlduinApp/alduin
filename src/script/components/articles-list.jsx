import React from 'react'

import Article from './article'

class ArticlesList extends React.Component {
  render() {
    const articles = []

    for (let i = 0; i < 100; i++) { articles[articles.length] = <Article key={i} /> }

    return (
      <div className='articles-list'>
        {articles}
      </div>
    )
  }
}

export default ArticlesList
