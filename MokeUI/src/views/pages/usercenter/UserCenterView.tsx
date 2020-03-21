import React from "react";
import { IUser, ICommonResponseInfo } from "moke-model";
import { Col, Row, Table, Badge, Button, Form, ButtonGroup, Spinner } from "react-bootstrap";
import { MokeCard, MokeModal, MokeFormLabel } from "moke-components";
import { UserStatusType, ResponseStatusType } from "moke-enum";

interface IUserCenterViewOwnProps {
    uid: string;
}

interface IUserCenterViewMapStateToProps {
    userInformation?: IUser;
}

interface IUserCenterViewMapDispatchToProps {
    fetchUserInformation?: (id: string) => Promise<IUser>;
    updatePassword?: (id: string, newPassword: string, oldPassword: string) => Promise<ICommonResponseInfo>;
}

export type IUserCenterViewProps = IUserCenterViewOwnProps
    & IUserCenterViewMapDispatchToProps
    & IUserCenterViewMapStateToProps;

interface IUserCenterViewState {
    isLoading: boolean;
    isOpen: boolean;
    oldPassword: string;
    newPassword: string;
}

export class UserCenterView extends React.Component<IUserCenterViewProps, IUserCenterViewState>{
    constructor(props: IUserCenterViewProps) {
        super(props);
        this.state = {
            isOpen: false,
            isLoading: false,
            oldPassword: "",
            newPassword: ""
        };
    }

    public componentDidMount() {
        this.props.fetchUserInformation!(this.props.uid);
    }

    public render() {
        const {
            userInformation
        } = this.props;
        const statusDisplayText = this.mapStatusToDisplayText(userInformation?.status || UserStatusType.Normal);
        return (
            <React.Fragment>
                <Row>
                    <Col>
                        <MokeCard
                            headerText={"个人中心"}
                            onRenderHeader={() => {
                                return (
                                    <Button
                                        className="float-right"
                                        variant="outline-warning"
                                        onClick={() => {
                                            this.setState({
                                                isOpen: true
                                            });
                                        }}
                                    >修改密码</Button>
                                );
                            }}>
                            <Table striped hover>
                                <tr>
                                    <th>用户名</th>
                                    <td>{userInformation?.username}</td>
                                </tr>
                                <tr>
                                    <th>密码</th>
                                    <td>{userInformation?.password}</td>
                                </tr>
                                <tr>
                                    <th>用户状态</th>
                                    <td>{statusDisplayText}</td>
                                </tr>
                                <tr>
                                    <th>注册时间</th>
                                    <td>{userInformation?.createDate}</td>
                                </tr>
                            </Table>
                        </MokeCard>
                    </Col>
                </Row>
                <MokeModal
                    title="修改密码"
                    content={
                        <Form>
                            <Form.Group>
                                <MokeFormLabel text="原密码" />
                                <Form.Control
                                    value={this.state.oldPassword}
                                    onChange={(event: any) => {
                                        this.setState({
                                            oldPassword: event.target.value
                                        });
                                    }}
                                />
                            </Form.Group>
                            <Form.Group>
                                <MokeFormLabel text="新密码" />
                                <Form.Control
                                    value={this.state.newPassword}
                                    onChange={(event: any) => {
                                        this.setState({
                                            newPassword: event.target.value
                                        });
                                    }}
                                />
                            </Form.Group>
                        </Form>
                    }
                    footer={
                        <ButtonGroup>
                            <Button
                                onClick={() => {
                                    this.setState({
                                        isOpen: false
                                    });
                                }}
                            >关闭</Button>
                            <Button
                                onClick={() => {
                                    this.setState({
                                        isLoading: true
                                    });
                                    if (!this.state.oldPassword || !this.state.newPassword) {
                                        alert("原始密码或新密码不得为空！");
                                        this.setState({
                                            isLoading: false
                                        });
                                        return;
                                    }
                                    if (this.state.oldPassword === this.state.newPassword) {
                                        alert("原始密码与新密码不得相同！");
                                        this.setState({
                                            isLoading: false
                                        });
                                        return;
                                    }
                                    this.props
                                        .updatePassword!(this.props.uid, this.state.newPassword, this.state.oldPassword)
                                        .then((data) => {
                                            if (data.status === ResponseStatusType.Failed) {
                                                alert("操作失败，消息：" + data.message);
                                                this.setState({
                                                    isLoading: false
                                                });
                                            } else {
                                                alert("操作成功，消息：" + data.message);
                                                this.setState({
                                                    isOpen: false,
                                                    isLoading: false
                                                });
                                            }
                                        });
                                }}
                            >{
                                    this.state.isLoading
                                        ? <Spinner animation="border" size="sm" />
                                        : "确定"
                                }</Button>
                        </ButtonGroup>
                    }
                    isOpen={this.state.isOpen}
                    onClose={() => { this.setState({ isOpen: false }); }}
                />
            </React.Fragment>
        );
    }

    private mapStatusToDisplayText = (status: UserStatusType): JSX.Element => {
        switch (status) {
            case UserStatusType.Normal:
                return <Badge style={{ fontSize: "1em" }} variant="success">正常</Badge>;
            case UserStatusType.Baned:
                return <Badge style={{ fontSize: "1em" }} variant="danger" >封禁</Badge>;
            case UserStatusType.Confined:
                return <Badge style={{ fontSize: "1em" }} variant="warning" >受限制</Badge>;
        }
    }
}