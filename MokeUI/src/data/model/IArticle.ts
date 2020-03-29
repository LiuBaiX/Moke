import { ArticleStatusType } from "moke-enum";

export interface IArticle {
    articleId?: number;
    isPublic: boolean;
    name: string;
    description?: string;
    articleType: number;
    articleSubType?: number;
    content?: string;
    status?: ArticleStatusType;
}