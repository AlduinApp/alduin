import React from 'react'
import ReactDOM from 'react-dom'
import { createStore } from 'redux'
import { Provider } from 'react-redux'

import allReducers from '../reducers'

import Header from './header'
import Footer from './footer'
import MainContainer from './main-container'
import AddFeedModal from './modals/add-feed-modal'
import Loader from './loader'

class App extends React.Component {
  render () {
    return (
      <div className='app'>
        <Header />
        <MainContainer />
        <Footer />

        <AddFeedModal />
        <Loader />
      </div>
    )
  }
}
const store = createStore(allReducers)

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)
