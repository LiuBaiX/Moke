import { combineReducers } from 'redux';
import { userReducer } from './UserReducer';
import { errorReducer } from './ErrorReducer';
import { articleTypeReducer } from "./ArticleTypeReducer";
import { articleReducer } from "./ArticleReducer";

const reducers = {
    user: userReducer,
    error: errorReducer,
    articleTypes: articleTypeReducer,
    articles: articleReducer,
}

export default combineReducers(reducers);