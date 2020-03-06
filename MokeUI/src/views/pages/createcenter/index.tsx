import { IAppState } from "moke-state";
import { InvitationActionCreator } from "moke-action-creator";
import { connect } from "react-redux";
import { CreateCenterView } from "./CreateCenterView";

const mapStateToProps = ({ invitations }: IAppState) => {
    return {
        receivedInvitations: invitations.receivedInvitations,
        sendedInvitations: invitations.sendedInvitations,
    };
}

const mapDispatchToProps = {
    fetchMyReceivedInvitations: InvitationActionCreator.fetchMyReceivedInvitations,
    fetchMySendedInvitations: InvitationActionCreator.fetchMySendedInvitations,
    updateMyReceivedInvitationStatus: InvitationActionCreator.updateMyReceivedInvitationStatus,
    cancelMySendedInvitation: InvitationActionCreator.cancelMySendedInvitation,
}

const CreateCenter = connect(mapStateToProps, mapDispatchToProps)(CreateCenterView);

export {
    CreateCenter,
}