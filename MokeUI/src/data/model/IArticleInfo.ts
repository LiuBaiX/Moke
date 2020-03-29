import { ArticleIsPublic } from "moke-enum";

export interface IArticleInfo {
    article_id: number;
    title: string;
    author: number;
    type: number;
    sub_type: number;
    content?: string;
    description?: string;
    isPublic: ArticleIsPublic;
    create_date: string;
    last_modified_date: string;
}