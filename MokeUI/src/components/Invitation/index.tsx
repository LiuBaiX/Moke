import React from "react";
import { Table, Button, ButtonGroup, Row, Col } from "react-bootstrap";
import { IInvitation } from "moke-model";
import { Link } from "react-router-dom";
import { MokeModal } from "../modal";
import { MokeArticleTemplate } from "../template";
import { MokeCardAsType } from "../card";
import { InvitationStatusType } from "moke-enum";
import { MokeNoDataTemplate } from "../template/ModeNoDataTemplate";

export interface IMokeInvitationProps {
    dataSource: IInvitation[];
    onAccept: (id: string) => void;
    onReject: (id: string) => void;
}

interface IMokeInvitationState {
    isOpen: boolean;
    data?: IInvitation;
}

export class MokeInvitation extends React.Component<IMokeInvitationProps, IMokeInvitationState> {
    constructor(props: IMokeInvitationProps) {
        super(props);
        this.state = {
            isOpen: false
        };
    }

    public render() {
        const { dataSource } = this.props;
        return (
            <React.Fragment>
                <Table bordered>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>作者</th>
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
                                    <td colSpan={3}>
                                        <MokeNoDataTemplate />
                                    </td>
                                </tr>
                                : dataSource.map((item, index) => {
                                    return (
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
                                                    <Button variant="outline-success"
                                                        onClick={() => {
                                                            this.props.onAccept(item.invitationId);
                                                        }}>同意</Button>
                                                    <Button variant="outline-warning"
                                                        onClick={() => {
                                                            this.setState({
                                                                isOpen: true,
                                                                data: item
                                                            });
                                                        }}>详情</Button>
                                                    <Button variant="outline-danger"
                                                        onClick={() => {
                                                            this.props.onReject(item.invitationId);
                                                        }}>拒绝</Button>
                                                </ButtonGroup>
                                            </td>
                                        </tr>
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
            footer={this.renderModalFooter(data?.invitationId)}
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
                <Button variant="outline-success">同意</Button>
                <Button variant="outline-danger">拒绝</Button>
            </ButtonGroup>
        );
    }

    private renderDetailsTable = (data?: IInvitation) => {
        let status;
        switch (data?.status) {
            case InvitationStatusType.Accept:
                status = <span className="text-success">已同意</span>;
                break;
            case InvitationStatusType.Reject:
                status = <span className="text-danger">已拒绝</span>;
                break;
            case InvitationStatusType.Sustaining:
                status = <span className="text-warning">持续中</span>;
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
                                <th>作者</th>
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