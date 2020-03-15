import { combineReducers } from 'redux';
import { userReducer } from './UserReducer';
import { errorReducer } from './ErrorReducer';
import { articleTypeReducer } from "./ArticleTypeReducer";
import { articleReducer } from "./ArticleReducer";
import { invitationReducer } from "./InvitationReducer";
import { subsidiaryReducer } from "./SubsidiaryReducer";

const reducers = {
    user: userReducer,
    error: errorReducer,
    articleTypes: articleTypeReducer,
    articles: articleReducer,
    invitations: invitationReducer,
    subsidiary: subsidiaryReducer
}

export default combineReducers(reducers);