import constants from "moke-constants";
import { IInvitationState } from "moke-state";
import { IInvitationAction } from "moke-action";

const defaultState: IInvitationState = {
    invitations: [],
};

const invitationReducer = (
    state: IInvitationState = defaultState,
    action: IInvitationAction
): IInvitationState => {
    switch (action.type) {
        case constants.INVITATION_LIST_FETCH:
            return {
                invitations: action.invitations
            };
        default: return state;
    }
}

export { invitationReducer };