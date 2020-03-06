import { IInvitation } from "../model/IInvitation";

export interface IInvitationAction {
    type: string;
    invitations: IInvitation[];
}