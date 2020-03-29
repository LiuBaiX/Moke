import { UserManagementView } from "./UserManagementView";
import { connect } from "react-redux";
import { IAppState } from "moke-state";
import { ManagementActionCreator } from "moke-action-creator";

const mapStateToProps = ({ management }: IAppState) => {
    return {
        dataSource: management.user.users
    }
}

const mapDispatchToProps = {
    fetchUsers: ManagementActionCreator.getAllUsers,
    setUserStatus: ManagementActionCreator.updateUserStatus
}

const UserManagement = connect(mapStateToProps, mapDispatchToProps)(UserManagementView);

export {
    UserManagement
}