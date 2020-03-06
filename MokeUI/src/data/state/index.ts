import { IErrorState } from "./IErrorState";
import { IUserState } from "./IUserState";
import { IArticleTypeState } from "./IArticleTypeState";
import { IArticleState } from "./IArticleState";
import { IInvitationState } from "./IInvitationState";

interface IAppState {
    error: IErrorState;
    user: IUserState;
    articleTypes: IArticleTypeState;
    articles: IArticleState;
    invitations: IInvitationState;
}

export {
    IAppState,
    IErrorState,
    IUserState,
    IArticleTypeState,
    IArticleState,
    IInvitationState,
};