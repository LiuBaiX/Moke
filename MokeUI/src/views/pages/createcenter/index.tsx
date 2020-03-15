import { IAppState } from "moke-state";
import { InvitationActionCreator, SubsidiaryActionCreator } from "moke-action-creator";
import { connect } from "react-redux";
import { CreateCenterView } from "./CreateCenterView";

const mapStateToProps = ({ invitations, subsidiary }: IAppState) => {
    return {
        receivedInvitations: invitations.receivedInvitations,
        sendedInvitations: invitations.sendedInvitations,
        mySubsidiaries: subsidiary.subsidiary
    };
}

const mapDispatchToProps = {
    fetchMyReceivedInvitations: InvitationActionCreator.fetchMyReceivedInvitations,
    fetchMySendedInvitations: InvitationActionCreator.fetchMySendedInvitations,
    updateMyReceivedInvitationStatus: InvitationActionCreator.updateMyReceivedInvitationStatus,
    cancelMySendedInvitation: InvitationActionCreator.cancelMySendedInvitation,
    deleteSubsidiary: SubsidiaryActionCreator.deleteSubsidiary,
    fetchMySubsidiaries: SubsidiaryActionCreator.getSubsidiaryByUserId
}

const CreateCenter = connect(mapStateToProps, mapDispatchToProps)(CreateCenterView);

export {
    CreateCenter,
}