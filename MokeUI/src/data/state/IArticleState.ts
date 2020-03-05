import { IArticleForDisplay } from "../model/IArticleForDisplay";

export interface IArticleState {
    page: number;
    data: IArticleForDisplay[];
    myArticle: {
        data: IArticleForDisplay[];
        page: number;
    };
}