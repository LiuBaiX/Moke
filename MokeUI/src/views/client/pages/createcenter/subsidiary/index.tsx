import { SubsidiaryEditorView } from "./SubsidiaryEditorView";
import { connect } from "react-redux";
import { SubsidiaryActionCreator } from "moke-action-creator";
import React from "react";

const mapDispatchToProps = () => {
    return {
        onSubmit: SubsidiaryActionCreator.addSubsidiary
    }
}

const MiddleComponent = connect(null, mapDispatchToProps)(SubsidiaryEditorView);

const SubsidiaryEditor: React.FunctionComponent = () => {
    return <MiddleComponent />;
}

export {
    SubsidiaryEditor
}