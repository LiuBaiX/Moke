import { ISubsidiary } from "../model/ISubsidiary";

export interface ISubsidiaryAction {
    type: string;
    subsidiaries?: ISubsidiary[];
    id?: string;
}