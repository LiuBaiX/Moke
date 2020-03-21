import { IAppState } from "moke-state";
import { SubsidiaryActionCreator } from "moke-action-creator";
import { connect } from "react-redux";
import { CreateCenterView } from "./CreateCenterView";

const mapStateToProps = ({ subsidiary }: IAppState) => {
    return {
        mySubsidiaries: subsidiary.subsidiary
    };
}

const mapDispatchToProps = {
    deleteSubsidiary: SubsidiaryActionCreator.deleteSubsidiary,
    fetchMySubsidiaries: SubsidiaryActionCreator.getSubsidiaryByUserId
}

const CreateCenter = connect(mapStateToProps, mapDispatchToProps)(CreateCenterView);

export {
    CreateCenter,
}