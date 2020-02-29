import { IArticleType } from "../model/IArticleType";

export interface IArticleTypeAction {
    type: string;
    articleTypeList?: IArticleType[]
}