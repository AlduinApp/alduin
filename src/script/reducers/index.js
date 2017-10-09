import { combineReducers } from 'redux'

import WindowReducer from './window-reducer'
import ModalReducer from './modal-reducer'
import FeedsReducer from './feeds-reducer'
import ErrorsReducer from './errors-reducer'
import LoaderReducer from './loader-reducer'
import FetcherReducer from './fetcher-reducer'
import TooltipReducer from './tooltip-reducer'
import SettingsReducer from './settings-reducer'
import TrackerReducer from './tracker-reducer'

function logger(state = {}, action){
  console.log('STORE CHANGE', action)
  return state
}

const allReducers = combineReducers({
  logger,
  WindowReducer,
  ModalReducer,
  FeedsReducer,
  ErrorsReducer,
  LoaderReducer,
  FetcherReducer,
  TooltipReducer,
  SettingsReducer,
  TrackerReducer
})

export default allReducers
