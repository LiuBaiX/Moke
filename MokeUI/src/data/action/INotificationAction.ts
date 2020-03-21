import { INotification } from "../model/INotification";

export interface INotificationAction {
    type: string;
    notifications?: INotification[];
    id?: string;
}