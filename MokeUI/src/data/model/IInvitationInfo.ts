import { InvitationStatusType } from "moke-enum";

export interface IInvitationInfo {
    invitation_id: number;
    sender: number;
    receiver: number;
    description: string;
    article_id: number;
    status: InvitationStatusType;
    create_date: string;
}