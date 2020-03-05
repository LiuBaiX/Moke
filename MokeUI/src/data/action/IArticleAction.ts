import { IArticleForDisplay } from "../model/IArticleForDisplay";

export interface IArticleAction {
    type: string;
    articles?: IArticleForDisplay[];
    page?: number;
}