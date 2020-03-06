import { IInvitation } from "../model/IInvitation";

export interface IInvitationState {
    receivedInvitations: IInvitation[];
    sendedInvitations: IInvitation[];
}