import { UserStatusType } from "moke-enum";

export interface IUser {
    id: string;
    username?: string;
    password?: string;
    createDate?: string;
    status?: UserStatusType;
}