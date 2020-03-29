import { IUser } from "moke-model";
import { UserStatusType } from "moke-enum";

export interface IUserManagementAction {
    type: string;
    users?: IUser[];
    id?: string;
    status?: UserStatusType;
}