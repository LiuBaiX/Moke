import React from "react";
import { MokeModal } from "moke-components"
import { Button, Form, Spinner } from "react-bootstrap";
import "./index.scss";

interface ILoginModalViewOwnProps {
    isOpen: boolean;
    onClose: () => void;
}

interface ILoginModalViewMapDispatchToProps {
    login: (username: string, password: string) => Promise<void>
}

interface ILoginModalViewState {
    isLoading: boolean;
}

export type ILoginModalViewProps = ILoginModalViewOwnProps & ILoginModalViewMapDispatchToProps;

export class LoginModalView extends React.Component<ILoginModalViewProps, ILoginModalViewState>{
    private inputRefName: React.RefObject<any>;
    private inputRefPassword: React.RefObject<any>;

    constructor(props: ILoginModalViewProps) {
        super(props);
        this.inputRefName = React.createRef();
        this.inputRefPassword = React.createRef();
        this.state = { isLoading: false };
    }

    public render() {
        return (
            <MokeModal
                isOpen={this.props.isOpen}
                title={"登录"}
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
                            this.login()
                        }
                    }}
                    ref={this.inputRefName}
                    defaultValue={""}
                />
                <Form.Control
                    onKeyPress={(event: React.KeyboardEvent<HTMLInputElement>) => {
                        if (event.charCode === 13) {
                            this.login()
                        }
                    }}
                    ref={this.inputRefPassword}
                    defaultValue={""}
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
                <Button className="login-modal-button-login" variant="primary" onClick={this.login} disabled={this.state.isLoading}>
                    {
                        this.state.isLoading
                            ? this.renderSpinner()
                            : "登录"
                    }
                </Button>
            </React.Fragment>
        );
    }

    private login = () => {
        const username = this.inputRefName.current.value;
        const password = this.inputRefPassword.current.value;
        if (username && password) {
            this.setState({
                isLoading: true
            });
            this.props.login(username, password).then(() => {
                this.props.onClose();
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