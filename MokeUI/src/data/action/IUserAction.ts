import { UserStatusType } from "moke-enum";

export interface IUserAction {
    type: string;
    username?: string;
    uid?: number;
    password?: string;
    status?: UserStatusType;
    createDate?: string;
}