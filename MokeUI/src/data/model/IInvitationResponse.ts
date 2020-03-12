import { ResponseStatusType } from "moke-enum";

export interface IInvitationResponse {
    status: ResponseStatusType;
    message?: string;
}