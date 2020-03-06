import { IAppState } from "moke-state";
import { InvitationActionCreator } from "moke-action-creator";
import { connect } from "react-redux";
import { CreateCenterView } from "./CreateCenterView";

const mapStateToProps = ({ invitations }: IAppState) => {
    return {
        invitations: invitations.invitations,
    };
}

const mapDispatchToProps = {
    fetchMyInvitations: InvitationActionCreator.fetchMyInvitation
}

const CreateCenter = connect(mapStateToProps, mapDispatchToProps)(CreateCenterView);

export {
    CreateCenter,
}