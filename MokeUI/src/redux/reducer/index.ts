import { combineReducers } from 'redux';
import { userReducer } from './UserReducer';
import { errorReducer } from './ErrorReducer';


export default combineReducers({
    user: userReducer,
    error: errorReducer
});