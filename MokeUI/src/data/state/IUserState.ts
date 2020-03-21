import { UserStatusType } from "moke-enum";

export interface IUserState {
    username: string;
    uid?: number;
    password: string;
    createDate: string;
    status: UserStatusType;
}