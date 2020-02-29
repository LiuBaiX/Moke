import { combineReducers } from 'redux';
import { userReducer } from './UserReducer';
import { errorReducer } from './ErrorReducer';
import { articleTypeReducer } from "./ArticleTypeReducer";

const reducers = {
    user: userReducer,
    error: errorReducer,
    articleTypes: articleTypeReducer,
}

export default combineReducers(reducers);