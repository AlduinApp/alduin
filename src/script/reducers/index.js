import { combineReducers } from 'redux';

import WindowReducer from './window-reducer'
import ModalReducer from './modal-reducer'

const allReducers = combineReducers({
    WindowReducer,
    ModalReducer
})

export default allReducers 