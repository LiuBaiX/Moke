import { IErrorState } from "./IErrorState";
import { IUserState } from "./IUserState";
import { IArticleTypeState } from "./IArticleTypeState";
import { IArticleState } from "./IArticleState";
import { IInvitationState } from "./IInvitationState";
import { ISubsidiaryState } from "./ISubsidiaryState";
import { INotificationState } from "./INotificationState";

interface IAppState {
    error: IErrorState;
    user: IUserState;
    articleTypes: IArticleTypeState;
    articles: IArticleState;
    invitations: IInvitationState;
    subsidiary: ISubsidiaryState;
    notification: INotificationState;
}

export {
    IAppState,
    IErrorState,
    IUserState,
    IArticleTypeState,
    IArticleState,
    IInvitationState,
    ISubsidiaryState,
    INotificationState,
};