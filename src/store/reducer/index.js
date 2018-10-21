import reducer from './reducer'
import {combineReducers} from 'redux'
import authReducer from './authReducer'
import eventsReducer from './eventsReducer';

export default combineReducers({
    rootReducer : reducer,
    authReducer : authReducer,
    eventsReducer : eventsReducer
})