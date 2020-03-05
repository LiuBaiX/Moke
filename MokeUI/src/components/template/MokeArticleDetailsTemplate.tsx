import React from "react";
import { MokeCard } from "../card";
import { IArticleForDisplay } from "moke-model";
import { Badge } from "react-bootstrap";
import { SimpleString } from "moke-util";
import "./index.scss";

export interface IMokeArticleDetailsTemplateProps {
    dataSource: IArticleForDisplay;
}

export const MokeArticleDetailsTemplate = (props: IMokeArticleDetailsTemplateProps) => {
    const { dataSource } = props;
    return (
        <React.Fragment>
            <MokeCard
                headerText={"作品"}>
                <div className={"moke-article-details-template"}>
                    <h4>
                        {dataSource.name} <Badge variant="info">{dataSource.articleTypeDisplayName}</Badge> <Badge variant="info">{dataSource.articleSubTypeDisplayName}</Badge>
                    </h4>
                    <p className="text-muted">
                        {dataSource.authorDisplayName} 作于 {dataSource.createdDate} 字数{SimpleString.getStringLength(dataSource.content || "")}
                    </p>
                    <p>
                        {
                            dataSource.content
                        }
                    </p>
                </div>
            </MokeCard>
        </React.Fragment>
    );
}