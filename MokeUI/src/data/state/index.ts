import { IErrorState } from "./IErrorState";
import { IUserState } from "./IUserState";
import { IArticleTypeState } from "./IArticleTypeState";

interface IAppState {
    error: IErrorState;
    user: IUserState;
    articleTypes: IArticleTypeState
}

export {
    IAppState,
    IErrorState,
    IUserState,
    IArticleTypeState
};