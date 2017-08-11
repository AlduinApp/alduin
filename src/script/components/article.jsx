import React from 'react'

class Article extends React.Component {
  render () {
    return (
      <div className='article'>
        <div className='article-header'>
          <span className='article-title'>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</span>
          <span className='article-date'>03.07.2017</span>
        </div>
        <p className='article-intro'>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean viverra, mauris finibus venenatis rutrum, mauris justo sagittis massa, ut efficitur ex sem eu est. Nunc pellentesque luctus nisl in bibendum. Nam vestibulum nibh pharetra feugiat blandit. Nulla ornare, quam vel suscipit scelerisque, mi libero dapibus ante, non elementum tellus risus posuere sapien.
        </p>
      </div>
    )
  }
}

export default Article
