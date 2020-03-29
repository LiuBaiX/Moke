import React from "react";
import { Table, Button, ButtonGroup, Row, Col, Badge, Spinner } from "react-bootstrap";
import { IInvitation } from "moke-model";
import { Link } from "react-router-dom";
import { MokeModal } from "../modal";
import { MokeArticleTemplate } from "../template";
import { MokeCardAsType } from "../card";
import { InvitationStatusType } from "moke-enum";
import { MokeNoDataTemplate } from "../template/ModeNoDataTemplate";
import "./index.scss";

export interface IMokeInvitationTemplateBySenderProps {
    dataSource: IInvitation[];
    onCancel: (id: string) => Promise<void>;
}

interface IMokeInvitationTemplateBySenderState {
    isOpen: boolean;
    isLoading: boolean;
    data?: IInvitation;
}

export class MokeInvitationTemplateBySender extends React.Component<IMokeInvitationTemplateBySenderProps, IMokeInvitationTemplateBySenderState> {
    constructor(props: IMokeInvitationTemplateBySenderProps) {
        super(props);
        this.state = {
            isOpen: false,
            isLoading: false,
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
                            <th>收件人</th>
                            <th>作品</th>
                            <th>时间</th>
                            <th>操作</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            dataSource.length === 0
                                ? <tr className={"text-center"}>
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
                                                <td>{item.to}</td>
                                                <td>
                                                    <Link to={`/details/${item.article.articleId}`}>
                                                        {item.article.name}
                                                    </Link>
                                                </td>
                                                <td>{item.date}</td>
                                                <td>
                                                    <ButtonGroup>
                                                        <Button variant="outline-warning"
                                                            disabled={this.state.isLoading}
                                                            onClick={() => {
                                                                this.setState({
                                                                    isOpen: true,
                                                                    data: item
                                                                });
                                                            }}>详情</Button>
                                                        {
                                                            item.status !== InvitationStatusType.Sustaining
                                                                ? null
                                                                : <Button variant="outline-danger"
                                                                    disabled={this.state.isLoading}
                                                                    onClick={() => {
                                                                        this.setState({
                                                                            isLoading: true
                                                                        });
                                                                        this.props
                                                                            .onCancel(item.invitationId)
                                                                            .then(() => {
                                                                                this.setState({
                                                                                    isLoading: false
                                                                                });
                                                                            });
                                                                    }}>
                                                                    {
                                                                        this.state.isLoading
                                                                            ? <Spinner animation="border" size="sm" />
                                                                            : "撤销"
                                                                    }
                                                                </Button>
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
                    ? null
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
                <Button variant="outline-danger"
                    disabled={this.state.isLoading}
                    onClick={() => {
                        this.setState({
                            isLoading: true
                        });
                        this.props
                            .onCancel(id || "-1")
                            .then(() => {
                                this.setState({
                                    isLoading: false,
                                    isOpen: false,
                                });
                            });
                    }}>
                    {
                        this.state.isLoading
                            ? <Spinner animation="border" size="sm" />
                            : "撤销"
                    }
                </Button>
            </ButtonGroup>
        );
    }

    private renderDetailsTable = (data?: IInvitation) => {
        let status;
        switch (data?.status) {
            case InvitationStatusType.Accept:
                status = <Badge variant="success">已同意</Badge>;
                break;
            case InvitationStatusType.Reject:
                status = <Badge variant="danger">已拒绝</Badge>;
                break;
            case InvitationStatusType.Sustaining:
                status = <Badge variant="warning">持续中</Badge>;
                break;
            case InvitationStatusType.Finished:
                status = <Badge variant="secondary">已完成</Badge>;
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
                                <th>收件人</th>
                                <td>{data?.to}</td>
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
                                <td className="moke-invitation-modal-badge-large">
                                    {status}
                                </td>
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