import { IAppState } from "moke-state";
import { InvitationActionCreator } from "moke-action-creator";
import { connect } from "react-redux";
import { InvitationView } from "./InvitationView";

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

const InvitationCenter = connect(mapStateToProps, mapDispatchToProps)(InvitationView);

export {
    InvitationCenter,
}