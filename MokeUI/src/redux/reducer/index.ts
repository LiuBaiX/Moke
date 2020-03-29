import { combineReducers } from 'redux';
import { userReducer } from './UserReducer';
import { errorReducer } from './ErrorReducer';
import { articleTypeReducer } from "./ArticleTypeReducer";
import { articleReducer } from "./ArticleReducer";
import { invitationReducer } from "./InvitationReducer";
import { subsidiaryReducer } from "./SubsidiaryReducer";
import { notificationReducer } from './NotificationReducer';
import { adminReducer } from "./AdminReducer";
import { managementReducer } from "./ManagementReducer";

const reducers = {
    user: userReducer,
    admin: adminReducer,
    error: errorReducer,
    articleTypes: articleTypeReducer,
    articles: articleReducer,
    invitations: invitationReducer,
    subsidiary: subsidiaryReducer,
    notification: notificationReducer,
    management: managementReducer,
}

export default combineReducers(reducers);