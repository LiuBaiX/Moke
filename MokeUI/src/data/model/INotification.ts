import { NotificationStatusType } from "moke-enum";

export interface INotification {
    id:string;
    senderId: string;
    receiverId: string;
    senderDisplayName: string;
    receiverDisplayName: string;
    title: string;
    message: string;
    sendedDate: string;
    status: NotificationStatusType;
}