import React from "react";
import { MokeCard, MokeCardAsType } from "../card";
import { IArticleForDisplay } from "moke-model";
import { useHistory } from "react-router";
import { Badge } from "react-bootstrap";
import { SimpleString } from "moke-util";

export interface IMokeArticleTemplateProps {
    id?: string;
    dataSource: IArticleForDisplay;
    as?: MokeCardAsType;
    to?: string;
}

export const MokeArticleTemplate = (props: IMokeArticleTemplateProps) => {
    const { dataSource } = props;
    const history = useHistory();
    return (
        <React.Fragment>
            <MokeCard
                as={props.as}
                onClick={() => {
                    if (props.to) {
                        history.push(`${props.to}/${dataSource.articleId}`);
                    }
                }}>
                <h4>
                    {dataSource.name} <Badge variant="info">{dataSource.articleTypeDisplayName}</Badge> <Badge variant="info">{dataSource.articleSubTypeDisplayName}</Badge>
                </h4>
                <p className="text-muted">{dataSource.authorDisplayName} 作于 {dataSource.createdDate}</p>
                <p>
                    {
                        SimpleString.shortenLongString(dataSource.content || "", 30)
                    }
                </p>
            </MokeCard>
        </React.Fragment>
    );
}