import React from "react";
import { MokeModal } from "moke-components"
import { Button, Form, Spinner } from "react-bootstrap";
import "./index.scss";

interface IRegisterModalViewOwnProps {
    isOpen: boolean;
    onClose: () => void;
}

interface IRegisterModalViewMapStateToProps {
    error?: string;
}

interface IRegisterModalViewMapDispatchToProps {
    register: (username: string, password: string) => Promise<void>
}

interface IRegisterModalViewState {
    isLoading: boolean;
}

export type IRegisterModalViewProps = IRegisterModalViewOwnProps
    & IRegisterModalViewMapStateToProps
    & IRegisterModalViewMapDispatchToProps;

export class RegisterModalView extends React.Component<IRegisterModalViewProps, IRegisterModalViewState>{
    private inputRefName: React.RefObject<any>;
    private inputRefPassword: React.RefObject<any>;
    private inputRefRePassword: React.RefObject<any>;

    constructor(props: IRegisterModalViewProps) {
        super(props);
        this.inputRefName = React.createRef();
        this.inputRefPassword = React.createRef();
        this.inputRefRePassword = React.createRef();
        this.state = { isLoading: false };
    }

    public render() {
        return (
            <MokeModal
                isOpen={this.props.isOpen}
                title={"注册"}
                content={this.renderContent()}
                footer={this.renderFooter()}
                onClose={this.props.onClose} />
        );
    }
    private renderContent = () => {
        return (
            <React.Fragment>
                <Form.Control
                    className={"login-modal-input"}
                    onKeyPress={(event: React.KeyboardEvent<HTMLInputElement>) => {
                        if (event.charCode === 13) {
                            this.register()
                        }
                    }}
                    ref={this.inputRefName}
                    defaultValue={""}
                    placeholder="请输入用户名"
                />
                <Form.Control
                    onKeyPress={(event: React.KeyboardEvent<HTMLInputElement>) => {
                        if (event.charCode === 13) {
                            this.register()
                        }
                    }}
                    ref={this.inputRefPassword}
                    defaultValue={""}
                    type="password"
                    placeholder="请输入密码"
                />
                <Form.Control
                    onKeyPress={(event: React.KeyboardEvent<HTMLInputElement>) => {
                        if (event.charCode === 13) {
                            this.register()
                        }
                    }}
                    ref={this.inputRefRePassword}
                    defaultValue={""}
                    type="password"
                    placeholder="请再次输入密码"
                />
            </React.Fragment>
        );
    }

    private renderFooter = () => {
        return (
            <React.Fragment>
                <Button className="login-modal-button-close" variant="secondary" onClick={this.props.onClose} disabled={this.state.isLoading}>
                    关闭
                </Button>
                <Button className="login-modal-button-login" variant="primary" onClick={this.register} disabled={this.state.isLoading}>
                    {
                        this.state.isLoading
                            ? this.renderSpinner()
                            : "登录"
                    }
                </Button>
            </React.Fragment>
        );
    }

    private register = () => {
        const username = this.inputRefName.current.value;
        const password = this.inputRefPassword.current.value;
        const rePassword = this.inputRefRePassword.current.value;

        if (username && password) {
            if (password !== rePassword) {
                alert("两次输入密码不一致！");
                return;
            }
            this.setState({
                isLoading: true
            });
            this.props.register(username, password).then(() => {
                if (this.props.error) {
                    alert(this.props.error);
                } else {
                    this.props.onClose();
                }
            }).then(() => {
                this.setState({ isLoading: false });
            });
        } else {
            alert("用户名或密码不能为空");
        }
    }

    private renderSpinner = () => {
        return (
            <Spinner animation="border" role="status" size="sm">
                <span className="sr-only">Loading...</span>
            </Spinner>
        );
    }
}