import React from "react";
import { ISubsidiary } from "moke-model";
import { Image } from "react-bootstrap";

export interface IMokeImageTemplateProps {
    dataSource: ISubsidiary;
}

export const MokeImageTemplate = (props: IMokeImageTemplateProps) => {
    const { dataSource } = props;
    return (
        <React.Fragment>
            <h4>{dataSource.title}</h4>
            <p className="text-muted">{dataSource.authorDisplayName} 作于 {dataSource.createDate}</p>
            <Image src={dataSource.src} thumbnail alt={`[${dataSource.title}]未找到`} />
        </React.Fragment>
    );
}