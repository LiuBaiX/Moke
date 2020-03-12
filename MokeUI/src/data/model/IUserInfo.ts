import { UserStatusType } from "moke-enum";

export interface IUserInfo {
    uid: string;
    name: string;
    password: string;
    status: UserStatusType;
    create_date: string;
}