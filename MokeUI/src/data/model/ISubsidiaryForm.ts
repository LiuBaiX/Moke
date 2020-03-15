import { SubsidiaryType } from "moke-enum";

export interface ISubsidiaryForm {
    uid?: string;
    articleId?: string;
    title: string;
    src?: string;
    content?: string;
    file?: File;
    type: SubsidiaryType;
    invitationId?: string;
}