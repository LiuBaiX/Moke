import { IArticleManagementState } from "./IArticleManagementState";
import { IUserManagementState } from "./IUserManagementState";
import { ISubsidiaryManagementState } from "./ISubsidiaryManagementState";

export interface IManagementState {
    article: IArticleManagementState;
    user: IUserManagementState;
    subsidiary: ISubsidiaryManagementState;
}

export {
    IArticleManagementState,
    IUserManagementState,
    ISubsidiaryManagementState
}