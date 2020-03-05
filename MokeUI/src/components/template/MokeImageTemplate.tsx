import React from "react";
import { ISubsidiary } from "moke-model";

export interface IMokeImageTemplateProps {
    dataSource: ISubsidiary;
}

export const MokeImageTemplate = (props: IMokeImageTemplateProps) => {
    const { dataSource } = props;
    return (
        <React.Fragment>
            <h4>{dataSource.title}</h4>
            <p className="text-muted">{dataSource.authorDisplayName} 作于 {dataSource.createDate}</p>
            <img src={dataSource.src} />
        </React.Fragment>
    );
}