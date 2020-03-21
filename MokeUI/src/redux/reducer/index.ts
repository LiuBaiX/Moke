import { combineReducers } from 'redux';
import { userReducer } from './UserReducer';
import { errorReducer } from './ErrorReducer';
import { articleTypeReducer } from "./ArticleTypeReducer";
import { articleReducer } from "./ArticleReducer";
import { invitationReducer } from "./InvitationReducer";
import { subsidiaryReducer } from "./SubsidiaryReducer";
import { notificationReducer } from './NotificationReducer';

const reducers = {
    user: userReducer,
    error: errorReducer,
    articleTypes: articleTypeReducer,
    articles: articleReducer,
    invitations: invitationReducer,
    subsidiary: subsidiaryReducer,
    notification: notificationReducer,
}

export default combineReducers(reducers);