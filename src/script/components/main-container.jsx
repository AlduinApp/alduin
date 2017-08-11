import React from 'react'

import Sidebar from './sidebar'
import ArticleContent from './article-content'
import ArticlesList from './articles-list'

class MainContainer extends React.Component {
  render () {
    return (
      <div className='main-container'>
        <Sidebar />
        <ArticlesList />
        <ArticleContent />
      </div>
    )
  }
}

export default MainContainer
