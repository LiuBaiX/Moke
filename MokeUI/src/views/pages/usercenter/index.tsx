import { UserCenterView } from "./UserCenterView";
import { connect } from "react-redux";
import { SimpleSession } from "moke-util";
import React from "react";
import { IAppState } from "moke-state";
import { UserActionCreator } from "moke-action-creator";

const mapStateToProps = ({ user }: IAppState) => {
    return {
        userInformation: {
            id: user.uid?.toString() || "1",
            username: user.username,
            password: user.password,
            createDate: user.createDate,
            status: user.status
        }
    };
};

const mapDispatchToProps = {
    fetchUserInformation: UserActionCreator.fetchUserInformationById,
    updatePassword: UserActionCreator.updatePassword
};

const MiddleComponent = connect(mapStateToProps, mapDispatchToProps)(UserCenterView);

const UserCenter: React.FunctionComponent = () => {
    const { uid } = SimpleSession.getSession("user");
    return <MiddleComponent uid={uid} />
}

export {
    UserCenter
}