import React from "react";
import { ISubsidiary } from "moke-model";

export interface IMokeVideoTemplateProps {
    dataSource: ISubsidiary
}

export const MokeVideoTemplate = (props: IMokeVideoTemplateProps) => {
    const { dataSource } = props;
    return (
        <React.Fragment>
            <h4>{dataSource.title}</h4>
            <p className="text-muted">{dataSource.authorDisplayName} 作于 {dataSource.createDate}</p>
            <video src={dataSource.src} controls>
                您的浏览器不支持音频播放器,建议使用最新版本得Chrome或FireFox等高级浏览器
            </video>
        </React.Fragment>
    );
}