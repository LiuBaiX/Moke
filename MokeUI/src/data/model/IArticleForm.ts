import { ArticleIsPublic } from "moke-enum";

export interface IArticleForm {
    articleId?: number;
    isPublic: ArticleIsPublic;
    name: string;
    description?: string;
    tid: number;
    uid: number;
    subTid?: number;
    content?: string;
}