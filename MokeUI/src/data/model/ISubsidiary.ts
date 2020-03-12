import { SubsidiaryType } from "moke-enum";

export interface ISubsidiary {
    subsidiaryId: string;
    title: string;
    authorDisplayName: string;
    authorId: string;
    articleId: string;
    src?: string;
    content?: string;
    createDate: string;
    type: SubsidiaryType;
}