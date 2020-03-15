import React from "react";
import { ISubsidiary } from "moke-model";

export interface IMokeAppreciationTemplateProps {
    dataSource: ISubsidiary;
}

export const MokeAppreciationTemplate = (props: IMokeAppreciationTemplateProps) => {
    const { dataSource } = props;
    return (
        <React.Fragment>
            <h4>{dataSource.title}</h4>
            <p className="text-muted">{dataSource.authorDisplayName} 作于 {dataSource.createDate}</p>
            <p>
                {dataSource.content}
            </p>
        </React.Fragment>
    );
}