import React from "react";
import { MokeCard } from "../card";
import { IArticleForDisplay } from "moke-model";
import { Badge, Button } from "react-bootstrap";
import { SimpleString } from "moke-util";
import "./index.scss";
import { useHistory } from "react-router";
import { connect } from "react-redux";
import { IAppState } from "moke-state";

export interface IMokeArticleDetailsTemplateViewOwnProps {
    dataSource: IArticleForDisplay;
}

interface IMokeArticleDetailsTemplateViewMapStateToProps {
    uid?: number;
}

export type IMokeArticleDetailsTemplateProps = IMokeArticleDetailsTemplateViewOwnProps
    & IMokeArticleDetailsTemplateViewMapStateToProps;

const MokeArticleDetailsTemplateView: React.FunctionComponent<IMokeArticleDetailsTemplateProps> = (props) => {
    const { dataSource } = props;
    const history = useHistory();

    return (
        <React.Fragment>
            <MokeCard
                headerText={"作品"}
                onRenderHeader={
                    props.uid?.toString() === dataSource.authorId
                        ? () => {
                            return (
                                <Button
                                    className="float-right"
                                    variant="outline-success"
                                    onClick={() => {
                                        history.push(`/create/article/edit/${dataSource.articleId}`);
                                    }}
                                >编辑</Button>
                            );
                        }
                        : undefined
                }
            >
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

const mapStateToProps = ({ user }: IAppState): IMokeArticleDetailsTemplateViewMapStateToProps => {
    return {
        uid: user.uid
    };
}

const MokeArticleDetailsTemplate = connect(mapStateToProps)(MokeArticleDetailsTemplateView);

export {
    MokeArticleDetailsTemplate
};