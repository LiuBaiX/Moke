import { combineReducers } from 'redux';
import { userReducer } from './UserReducer';
import { errorReducer } from './ErrorReducer';
import { articleTypeReducer } from "./ArticleTypeReducer";
import { articleReducer } from "./ArticleReducer";
import { invitationReducer } from "./InvitationReducer";

const reducers = {
    user: userReducer,
    error: errorReducer,
    articleTypes: articleTypeReducer,
    articles: articleReducer,
    invitations: invitationReducer,
}

export default combineReducers(reducers);