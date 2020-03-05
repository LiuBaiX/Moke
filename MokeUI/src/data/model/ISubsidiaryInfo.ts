import { SubsidiaryType } from "moke-enum";

export interface ISubsidiaryInfo {
    subsidiary_id: number;
    article_id: number;
    title: string;
    author: number;
    name: string;//author's name;
    type: SubsidiaryType;
    content?: string;
    src?: string;
    last_modified_date: string;
    create_date: string;
}