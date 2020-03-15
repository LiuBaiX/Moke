import React, { useState, useEffect } from "react";
import {
    MokeCard,
    MokeInvitationTemplateByReceiver,
    MokeLoadingPage,
    MokeInvitationTemplateBySender,
    MokeSubsidiaryListTemplate
} from "moke-components";
import { Row, Col, Button } from "react-bootstrap";
import "./index.scss";
import { IAppState } from "moke-state";
import { ArticleActionCreator } from "moke-action-creator";
import { connect } from "react-redux";
import { ArticleView } from "../article/ArticleView";
import { useHistory } from "react-router";
import { IInvitation, ISubsidiary } from "moke-model";
import { InvitationStatusType } from "moke-enum";

const mapStateToProps = ({ articles }: IAppState) => {
    return {
        articles: articles.myArticle.data
    }
}

const mapDispatchToProps = {
    fetchArticles: ArticleActionCreator.fetchMyArticles
}

const MyArticles = connect(mapStateToProps, mapDispatchToProps)(ArticleView);

interface ICreateCenterViewMapStateToProps {
    receivedInvitations?: IInvitation[];
    sendedInvitations?: IInvitation[];
    mySubsidiaries?: ISubsidiary[];
}

interface ICreateCenterViewMapDispatchToProps {
    fetchMyReceivedInvitations?: () => Promise<void>;
    fetchMySendedInvitations?: () => Promise<void>;
    fetchMySubsidiaries?: () => Promise<void>;
    updateMyReceivedInvitationStatus?: (id: string, status: InvitationStatusType) => Promise<void>;
    cancelMySendedInvitation?: (id: string) => Promise<void>;
    deleteSubsidiary?: (id: string) => Promise<void>;
}

export type ICreateCenterViewProps = ICreateCenterViewMapStateToProps & ICreateCenterViewMapDispatchToProps;

export const CreateCenterView: React.FunctionComponent<ICreateCenterViewProps> = (props) => {
    const history = useHistory();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const promises = [
            props.fetchMyReceivedInvitations!(),
            props.fetchMySendedInvitations!(),
            props.fetchMySubsidiaries!(),
        ];
        Promise.all(promises).then(() => {
            setIsLoading(false);
        });
    }, [
        props.fetchMyReceivedInvitations,
        props.fetchMySendedInvitations,
        props.fetchMySubsidiaries
    ]);

    return (
        <React.Fragment>
            <Row className="moke-create-center-card">
                <Col>
                    <MokeCard
                        onRenderHeader={() => {
                            return (
                                <Button
                                    className="float-right"
                                    variant="outline-success"
                                    onClick={() => {
                                        history.push("/create/article/add");
                                    }}
                                >创作文章</Button>
                            );
                        }}
                        headerText={"我的作品"}
                        styles={{
                            body: {
                                root: "moke-create-center-card-body"
                            }
                        }}>
                        <MyArticles />
                    </MokeCard>
                </Col>
            </Row>
            <Row className="moke-create-center-card">
                <Col>
                    <MokeCard headerText={"我的衍生作品"}>
                        {
                            isLoading
                                ? <MokeLoadingPage />
                                : <MokeSubsidiaryListTemplate
                                    dataSource={props.mySubsidiaries!}
                                    onDelete={props.deleteSubsidiary!}
                                />
                        }
                    </MokeCard>
                </Col>
            </Row>
            <Row className="moke-create-center-card">
                <Col>
                    <MokeCard headerText={"收到的合著邀请函"}>
                        {
                            isLoading
                                ? <MokeLoadingPage />
                                : <MokeInvitationTemplateByReceiver
                                    onAccept={(id) => {
                                        return props.updateMyReceivedInvitationStatus!(id, InvitationStatusType.Accept);
                                    }}
                                    onReject={(id) => {
                                        return props.updateMyReceivedInvitationStatus!(id, InvitationStatusType.Reject);
                                    }}
                                    dataSource={props.receivedInvitations || []}
                                />
                        }
                    </MokeCard>
                </Col>
            </Row>
            <Row className="moke-create-center-card">
                <Col>
                    <MokeCard headerText={"发送的合著邀请函"}>
                        {
                            isLoading
                                ? <MokeLoadingPage />
                                : <MokeInvitationTemplateBySender
                                    onCancel={(id) => {
                                        return props.cancelMySendedInvitation!(id);
                                    }}
                                    dataSource={props.sendedInvitations || []}
                                />
                        }
                    </MokeCard>
                </Col>
            </Row>
        </React.Fragment>
    );
}