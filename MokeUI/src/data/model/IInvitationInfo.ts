import { InvitationStatusType } from "moke-enum";

export interface IInvitationInfo {
    invitation_id: number;
    sender: number;
    receiver: number;
    name?: string;
    description: string;
    article_id: number;
    status: InvitationStatusType;
    create_date: string;
}