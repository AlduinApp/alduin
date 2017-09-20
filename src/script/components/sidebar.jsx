import React from 'react'

import SideActions from './side-actions'
import FeedsList from './feeds-list'

class Sidebar extends React.Component {
  render () {
    return (
      <div className='sidebar'>
        <FeedsList />
        <SideActions />
      </div>
    )
  }
}

export default Sidebar
