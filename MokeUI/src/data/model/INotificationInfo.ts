import { NotificationStatusType } from "moke-enum";

export interface INotificationInfo {
    message_id: number;
    sender: number;
    receiver: number;
    admin_name: string;
    name: string;
    title: string;
    message: string;
    sended_date: string;
    has_been_read: NotificationStatusType;
}