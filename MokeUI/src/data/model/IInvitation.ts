import { IArticleForDisplay } from "moke-model";
import { InvitationStatusType } from "moke-enum";

export interface IInvitation {
    invitationId: string;
    author: string;
    to: string;
    article: IArticleForDisplay;
    description: string;
    date: string;
    status: InvitationStatusType;
}