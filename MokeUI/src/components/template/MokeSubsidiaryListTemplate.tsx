import React from "react";
import { Table, Button, Row, Col, Badge, ButtonGroup, Spinner } from "react-bootstrap";
import { ISubsidiary } from "moke-model";
import { MokeModal } from "../modal";
import { SubsidiaryType } from "moke-enum";
import { MokeNoDataTemplate } from "../template/ModeNoDataTemplate";
import "./index.scss";

export interface IMokeSubsidiaryListTemplateProps {
    dataSource: ISubsidiary[];
    onDelete: (id: string) => Promise<void>;
}

interface IMokeSubsidiaryListTemplateState {
    isOpen: boolean;
    isDeleteLoading: boolean[];
    data?: ISubsidiary;
}

export class MokeSubsidiaryListTemplate extends React.Component<IMokeSubsidiaryListTemplateProps, IMokeSubsidiaryListTemplateState> {
    constructor(props: IMokeSubsidiaryListTemplateProps) {
        super(props);
        this.state = {
            isOpen: false,
            isDeleteLoading: new Array(this.props.dataSource.length).fill(false),
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
                            <th>标题</th>
                            <th>类型</th>
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
                                                <td>{item.title}</td>
                                                <td>{item.type}</td>
                                                <td>{item.createDate}</td>
                                                <td>
                                                    <ButtonGroup>
                                                        <Button variant="outline-warning"
                                                            onClick={() => {
                                                                this.setState({
                                                                    isOpen: true,
                                                                    data: item
                                                                });
                                                            }}
                                                        >详情</Button>
                                                        <Button variant="outline-danger"
                                                            onClick={() => {
                                                                this.setState({
                                                                    isDeleteLoading: [...this.state.isDeleteLoading.map((isLoading, isLoadingIndex) => {
                                                                        return isLoading = isLoadingIndex === index;
                                                                    })]
                                                                });
                                                                this.props.onDelete(item.subsidiaryId).then(() => {
                                                                    const newIsDeleteLoading = [...this.state.isDeleteLoading.fill(false)];
                                                                    newIsDeleteLoading.pop();
                                                                    this.setState({
                                                                        isDeleteLoading: newIsDeleteLoading
                                                                    });
                                                                });
                                                            }}
                                                        >
                                                            {
                                                                this.state.isDeleteLoading[index]
                                                                    ? <Spinner animation="border" size="sm" />
                                                                    : "删除"
                                                            }
                                                        </Button>
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

    private renderModal = (data?: ISubsidiary) => {
        return <MokeModal
            title={"衍生作品详情"}
            content={this.renderDetailsTable(data)}
            isOpen={this.state.isOpen}
            footer={() => <Button
                variant="secondary"
                onClick={() => {
                    this.setState({
                        isOpen: false
                    });
                }}
            >Close</Button>}
            onClose={() => {
                this.setState({
                    isOpen: false
                });
            }} />;
    }

    private renderDetailsTable = (data?: ISubsidiary) => {
        let type;
        switch (data?.type!) {
            case SubsidiaryType.Appreciation:
                type = "鉴赏";
                break;
            case SubsidiaryType.Declaim:
                type = "朗诵";
                break;
            case SubsidiaryType.Drawing:
                type = "绘画";
                break;
            case SubsidiaryType.Music:
                type = "音乐";
                break;
            case SubsidiaryType.Video:
                type = "视频";
                break;
            default:
                type = "未知";
        };
        return (
            <React.Fragment>
                <Row>
                    <Col>
                        <Table>
                            <tr>
                                <th>标题</th>
                                <td>{data?.title}</td>
                            </tr>
                            <tr>
                                <th>URL</th>
                                <td>{data?.src || "未填写"}</td>
                            </tr>
                            <tr>
                                <th>鉴赏内容</th>
                                <td>{data?.content || "未填写"}</td>
                            </tr>
                            <tr>
                                <th>创作时间</th>
                                <td>{data?.createDate}</td>
                            </tr>
                            <tr>
                                <th>类型</th>
                                <td className="moke-subsidiary-modal-badge-large">
                                    <Badge variant="info">{type}</Badge>
                                </td>
                            </tr>
                        </Table>
                    </Col>
                </Row>
            </React.Fragment>
        );
    }
}