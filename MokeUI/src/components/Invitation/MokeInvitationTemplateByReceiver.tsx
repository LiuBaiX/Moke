import React from "react";
import { Table, Button, ButtonGroup, Row, Col, Badge, Spinner } from "react-bootstrap";
import { IInvitation } from "moke-model";
import { Link, useHistory } from "react-router-dom";
import { MokeModal } from "../modal";
import { MokeArticleTemplate } from "../template";
import { MokeCardAsType } from "../card";
import { InvitationStatusType } from "moke-enum";
import { MokeNoDataTemplate } from "../template/ModeNoDataTemplate";
import "./index.scss";

export interface IMokeInvitationTemplateByReceiverProps {
    dataSource: IInvitation[];
    onAccept: (id: string) => Promise<void>;
    onReject: (id: string) => Promise<void>;
}

interface IMokeInvitationTemplateByReceiverState {
    isOpen: boolean;
    isAcceptLoading: boolean;
    isRejectLoading: boolean;
    data?: IInvitation;
}

const CreateButton: React.FunctionComponent<{
    articleId: string,
    invitationId: string
}> = (props) => {
    const history = useHistory();

    return (
        <Button variant="outline-success"
            onClick={() => {
                history.push(`/create/subsidiary/${props.articleId}/${props.invitationId}`);
            }}>开始创作</Button>
    );
}

export class MokeInvitationTemplateByReceiver extends React.Component<IMokeInvitationTemplateByReceiverProps, IMokeInvitationTemplateByReceiverState> {
    constructor(props: IMokeInvitationTemplateByReceiverProps) {
        super(props);
        this.state = {
            isOpen: false,
            isAcceptLoading: false,
            isRejectLoading: false,
        };
    }

    public render() {
        const { dataSource } = this.props;
        return (
            <React.Fragment>
                <Table bordered className={"text-center"}>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>发件人</th>
                            <th>作品</th>
                            <th>时间</th>
                            <th>操作</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            dataSource.length === 0
                                ? <tr>
                                    <td>1</td>
                                    <td colSpan={4}>
                                        <MokeNoDataTemplate />
                                    </td>
                                </tr>
                                : dataSource.map((item, index) => {
                                    return (
                                        <React.Fragment key={index}>
                                            <tr>
                                                <td>{index + 1}</td>
                                                <td>{item.author}</td>
                                                <td>
                                                    <Link to={`/details/${item.article.articleId}`}>
                                                        {item.article.name}
                                                    </Link>
                                                </td>
                                                <td>{item.date}</td>
                                                <td>
                                                    <ButtonGroup>
                                                        {
                                                            item.status !== InvitationStatusType.Sustaining
                                                                ? <React.Fragment>
                                                                    <Button variant="outline-warning"
                                                                        onClick={() => {
                                                                            this.setState({
                                                                                isOpen: true,
                                                                                data: item
                                                                            });
                                                                        }}>详情</Button>
                                                                    {
                                                                        item.status === InvitationStatusType.Accept
                                                                            ? <CreateButton
                                                                                invitationId={item.invitationId}
                                                                                articleId={item.article.articleId.toString()} />
                                                                            : null
                                                                    }
                                                                </React.Fragment>
                                                                : <React.Fragment>
                                                                    <Button variant="outline-success"
                                                                        disabled={this.state.isAcceptLoading || this.state.isRejectLoading}
                                                                        onClick={() => {
                                                                            this.setState({
                                                                                isAcceptLoading: true
                                                                            });
                                                                            this.props
                                                                                .onAccept(item.invitationId)
                                                                                .then(() => {
                                                                                    this.setState({
                                                                                        isAcceptLoading: false
                                                                                    });
                                                                                });
                                                                        }}>
                                                                        {
                                                                            this.state.isAcceptLoading
                                                                                ? <Spinner animation="border" size="sm" />
                                                                                : "同意"
                                                                        }
                                                                    </Button>
                                                                    <Button variant="outline-warning"
                                                                        onClick={() => {
                                                                            this.setState({
                                                                                isOpen: true,
                                                                                data: item
                                                                            });
                                                                        }}>详情</Button>
                                                                    <Button variant="outline-danger"
                                                                        disabled={this.state.isAcceptLoading || this.state.isRejectLoading}
                                                                        onClick={() => {
                                                                            this.setState({
                                                                                isRejectLoading: true
                                                                            });
                                                                            this.props
                                                                                .onReject(item.invitationId)
                                                                                .then(() => {
                                                                                    this.setState({
                                                                                        isRejectLoading: false
                                                                                    });
                                                                                });
                                                                        }}>
                                                                        {
                                                                            this.state.isRejectLoading
                                                                                ? <Spinner animation="border" size="sm" />
                                                                                : "拒绝"
                                                                        }
                                                                    </Button>
                                                                </React.Fragment>
                                                        }
                                                    </ButtonGroup>
                                                </td>
                                            </tr>
                                        </React.Fragment>
                                    );
                                })
                        }
                    </tbody>
                </Table>
                {this.renderModal(this.state.data)}
            </React.Fragment>
        );
    }

    private renderModal = (data?: IInvitation) => {
        return <MokeModal
            title={"邀请函详情"}
            content={this.renderDetailsTable(data)}
            footer={
                data?.status !== InvitationStatusType.Sustaining
                    ? data?.status === InvitationStatusType.Accept
                        ? <CreateButton
                            invitationId={data.invitationId}
                            articleId={data.article.articleId.toString()} />
                        : null
                    : this.renderModalFooter(data?.invitationId)
            }
            isOpen={this.state.isOpen}
            onClose={() => {
                this.setState({
                    isOpen: false
                });
            }} />;
    }

    private renderModalFooter = (id?: string) => {
        return (
            <ButtonGroup>
                <Button variant="outline-success"
                    disabled={this.state.isAcceptLoading || this.state.isRejectLoading}
                    onClick={() => {
                        this.setState({
                            isAcceptLoading: true
                        });
                        this.props
                            .onAccept(id || "-1")
                            .then(() => {
                                this.setState({
                                    isAcceptLoading: false,
                                    isOpen: false,
                                });
                            });
                    }}>
                    {
                        this.state.isAcceptLoading
                            ? <Spinner animation="border" size="sm" />
                            : "同意"
                    }
                </Button>
                <Button variant="outline-danger"
                    disabled={this.state.isAcceptLoading || this.state.isRejectLoading}
                    onClick={() => {
                        this.setState({
                            isRejectLoading: true
                        });
                        this.props
                            .onReject(id || "-1")
                            .then(() => {
                                this.setState({
                                    isRejectLoading: false,
                                    isOpen: false,
                                });
                            });
                    }}>
                    {
                        this.state.isRejectLoading
                            ? <Spinner animation="border" size="sm" />
                            : "拒绝"
                    }
                </Button>
            </ButtonGroup>
        );
    }

    private renderDetailsTable = (data?: IInvitation) => {
        let status;
        switch (data?.status) {
            case InvitationStatusType.Accept:
                status = <Badge className="moke-invitation-modal-badge-large" variant="success">已同意</Badge>;
                break;
            case InvitationStatusType.Reject:
                status = <Badge className="moke-invitation-modal-badge-large" variant="danger">已拒绝</Badge>;
                break;
            case InvitationStatusType.Sustaining:
                status = <Badge className="moke-invitation-modal-badge-large" variant="warning">持续中</Badge>;
                break;
            case InvitationStatusType.Finished:
                status = <Badge className="moke-invitation-modal-badge-large" variant="secondary">已完成</Badge>;
                break;
            default:
                status = <span className="text-muted">未知</span>;
        };
        return (
            <React.Fragment>
                <Row>
                    <Col>
                        <Table>
                            <tr>
                                <th>发件人</th>
                                <td>{data?.author}</td>
                            </tr>
                            <tr>
                                <th>时间</th>
                                <td>{data?.date}</td>
                            </tr>
                            <tr>
                                <th>消息</th>
                                <td>{data?.description}</td>
                            </tr>
                            <tr>
                                <th>状态</th>
                                <td>{status}</td>
                            </tr>
                        </Table>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <MokeArticleTemplate
                            dataSource={data?.article || {
                                articleId: 0,
                                name: "未知",
                                authorId: "未知",
                                authorDisplayName: "未知",
                                lastModifiedDate: "未知",
                                createdDate: "未知",
                                articleTypeDisplayName: "未知",
                            }}
                            as={MokeCardAsType.button}
                            to={"/details"} /></Col>
                </Row>
            </React.Fragment>
        );
    }
}