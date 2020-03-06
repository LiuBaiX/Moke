import constants from "moke-constants";
import { IInvitationState } from "moke-state";
import { IInvitationAction } from "moke-action";
import { IInvitation } from "moke-model";

const defaultState: IInvitationState = {
    receivedInvitations: [],
    sendedInvitations: [],
};

const invitationReducer = (
    state: IInvitationState = defaultState,
    action: IInvitationAction
): IInvitationState => {
    switch (action.type) {
        case constants.RECEIVED_INVITATION_LIST_SET:
            return {
                ...state,
                receivedInvitations: action.invitations || [],
            };
        case constants.SENDED_INVITATION_LIST_SET:
            return {
                ...state,
                sendedInvitations: action.invitations || [],
            };
        case constants.RECEIVED_INVITATION_UPDATE:
            return {
                ...state,
                receivedInvitations: state.receivedInvitations.map((item) => {
                    const newItem: IInvitation = {
                        ...item,
                        article: {
                            ...item.article
                        },
                        status: item.invitationId === action.id
                            ? action.status!
                            : item.status
                    };
                    return newItem;
                })
            }
        case constants.SENDED_INVITATION_DELETE:
            return {
                ...state,
                sendedInvitations: state.sendedInvitations
                    .filter((item) => {
                        return item.invitationId !== action.id;
                    })
                    .map((item) => {
                        const newItem: IInvitation = {
                            ...item,
                            article: {
                                ...item.article
                            },
                        };
                        return newItem;
                    })
            }
        default: return state;
    }
}

export { invitationReducer };