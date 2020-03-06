import { IInvitation } from "../model/IInvitation";
import { InvitationStatusType } from "moke-enum";

export interface IInvitationAction {
    type: string;
    invitations?: IInvitation[];
    status?: InvitationStatusType;
    id?: string;
}