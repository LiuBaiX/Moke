import { IErrorState } from "./IErrorState";
import { IUserState } from "./IUserState";
import { IArticleTypeState } from "./IArticleTypeState";
import { IArticleState } from "./IArticleState";

interface IAppState {
    error: IErrorState;
    user: IUserState;
    articleTypes: IArticleTypeState;
    articles: IArticleState;
}

export {
    IAppState,
    IErrorState,
    IUserState,
    IArticleTypeState,
    IArticleState,
};