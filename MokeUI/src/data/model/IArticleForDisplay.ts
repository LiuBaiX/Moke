import { ArticleStatusType } from "moke-enum";

export interface IArticleForDisplay {
    articleId: number;
    name: string;
    authorId: string;
    authorDisplayName: string;
    lastModifiedDate: String;
    createdDate: string;
    description?: string;
    articleTypeDisplayName: string;
    articleSubTypeDisplayName?: string;
    content?: string;
    status?: ArticleStatusType;
}