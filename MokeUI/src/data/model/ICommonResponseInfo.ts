import { ResponseStatusType } from "moke-enum";

export interface ICommonResponseInfo {
    status: ResponseStatusType;
    message?: string;
    id?: string;
}