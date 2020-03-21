import React, { useState } from "react";
import { MokeCard } from "../card";
import { IArticleForDisplay, IInvitationResponse } from "moke-model";
import { Badge, Button, ButtonGroup, Spinner } from "react-bootstrap";
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

interface IMokeArticleDetailsTemplateViewMapDispatchToProps {
    deleteArticle: (id: string) => Promise<IInvitationResponse>;
}

export type IMokeArticleDetailsTemplateProps = IMokeArticleDetailsTemplateViewOwnProps
    & IMokeArticleDetailsTemplateViewMapStateToProps
    & IMokeArticleDetailsTemplateViewMapDispatchToProps;

const MokeArticleDetailsTemplateView: React.FunctionComponent<IMokeArticleDetailsTemplateProps> = (props) => {
    const { dataSource } = props;
    const history = useHistory();
    const [isDeleting, setIsDeleting] = useState(false);

    return (
        <React.Fragment>
            <MokeCard
                headerText={"作品"}
                onRenderHeader={
                    props.uid?.toString() === dataSource.authorId
                        ? () => {
                            return (
                                <ButtonGroup className="float-right">
                                    <Button
                                        disabled={isDeleting}
                                        variant="outline-success"
                                        onClick={() => {
                                            history.push(`/client/create/article/edit/${dataSource.articleId}`);
                                        }}
                                    >编辑</Button>
                                    <Button
                                        disabled={isDeleting}
                                        variant="outline-danger"
                                        onClick={() => {
                                            const willDelete = window.confirm(`确定要删除[ ${dataSource.name} ]吗？`);
                                            if (!willDelete) {
                                                return;
                                            }
                                            setIsDeleting(true);
                                            props.deleteArticle!(dataSource.articleId.toString()).then((response) => {
                                                setIsDeleting(false);
                                                alert(`处理结果:${response.message}`);
                                                history.push("/client/create");
                                            });
                                        }}
                                    >
                                        {
                                            isDeleting
                                                ? <Spinner animation="border" size="sm" />
                                                : "删除"
                                        }
                                    </Button>
                                </ButtonGroup>
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