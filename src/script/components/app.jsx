import React from 'react'
import ReactDOM from 'react-dom'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import watch from 'redux-watch'

import allReducers from '../reducers'

import Header from './header'
import Footer from './footer'
import MainContainer from './main-container'
import AddFeedModal from './modals/add-feed-modal'
import SettingsModal from './modals/settings-modal'
import EditFeedModal from './modals/edit-feed-modal'
import Loader from './loader'

import Storage from '../utils/storage'

class App extends React.Component {
  render() {
    return (
      <div className='app'>
        <Header />
        <MainContainer />
        <Footer />

        <AddFeedModal />
        <SettingsModal />
        <EditFeedModal />
        <Loader />
      </div>
    )
  }
}

const localStorage = new Storage()

const store = createStore(allReducers, localStorage.load())

store.subscribe(watch(store.getState, 'FeedsReducer.feeds')(startStore))
store.subscribe(watch(store.getState, 'SettingsReducer')(startStore))

function startStore() {
  const fullState = store.getState()

  localStorage.requestStore({
    FeedsReducer: {
      feeds: fullState.FeedsReducer.feeds
    },
    SettingsReducer: fullState.SettingsReducer
  })
}

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)
