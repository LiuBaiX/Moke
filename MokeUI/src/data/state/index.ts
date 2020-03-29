import { IErrorState } from "./IErrorState";
import { IUserState } from "./IUserState";
import { IArticleTypeState } from "./IArticleTypeState";
import { IArticleState } from "./IArticleState";
import { IInvitationState } from "./IInvitationState";
import { ISubsidiaryState } from "./ISubsidiaryState";
import { INotificationState } from "./INotificationState";
import { IAdminState } from "./IAdminState";
import {
    IArticleManagementState,
    IManagementState,
    ISubsidiaryManagementState,
    IUserManagementState
} from "./management";

interface IAppState {
    error: IErrorState;
    user: IUserState;
    admin: IAdminState;
    articleTypes: IArticleTypeState;
    articles: IArticleState;
    invitations: IInvitationState;
    subsidiary: ISubsidiaryState;
    notification: INotificationState;
    management: IManagementState;
}

export {
    IAppState,
    IAdminState,
    IErrorState,
    IUserState,
    IArticleTypeState,
    IArticleState,
    IInvitationState,
    ISubsidiaryState,
    INotificationState,
    IArticleManagementState,
    IManagementState,
    ISubsidiaryManagementState,
    IUserManagementState,
};