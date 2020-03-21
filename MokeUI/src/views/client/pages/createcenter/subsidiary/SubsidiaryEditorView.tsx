import React from "react";
import { MokeSubsidiaryEditor, MokeCard } from "moke-components";
import { ISubsidiary, ISubsidiaryForm, ICommonResponseInfo } from "moke-model";

interface ISubsidiaryEditorViewOwnProps {
    dataSource?: ISubsidiary;
}

interface ISubsidiaryEditorViewMapDispatchToProps {
    onSubmit: (data: ISubsidiaryForm) => Promise<ICommonResponseInfo>;
}

export type ISubsidiaryEditorViewProps = ISubsidiaryEditorViewOwnProps
    & ISubsidiaryEditorViewMapDispatchToProps;

export const SubsidiaryEditorView: React.FunctionComponent<ISubsidiaryEditorViewProps> = (props) => {
    return (
        <React.Fragment>
            <MokeCard>
                <MokeSubsidiaryEditor
                    dataSource={props.dataSource}
                    onSubmit={props.onSubmit} />
            </MokeCard>
        </React.Fragment>
    );
}