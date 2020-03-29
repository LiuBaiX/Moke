import { SubsidiaryManagementView } from "./SubsidiaryManagementView";
import { connect } from "react-redux";
import { IAppState } from "moke-state";
import { ManagementActionCreator } from "moke-action-creator";

const mapStateToProps = ({ management }: IAppState) => {
    return {
        dataSource: management.subsidiary.subsidiaries
    }
}

const mapDispatchToProps = {
    fetchSubsidiaries: ManagementActionCreator.getAllBanedSubsidiaries,
    onAccept: ManagementActionCreator.acceptSubsidiary
}

const SubsidiaryManagement = connect(mapStateToProps, mapDispatchToProps)(SubsidiaryManagementView);

export {
    SubsidiaryManagement
}