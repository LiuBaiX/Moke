import React from "react";
import { MokeModal } from "moke-components"
import { Button, Form } from "react-bootstrap";

interface ILoginModalViewOwnProps {
    isOpen: boolean;
    onClose: () => void;
}

interface ILoginModalViewMapDispatchToProps {
    login?: (username: string, password: string) => void
}

interface ILoginModalViewState {
    username: string;
    password: string;
}

export type ILoginModalViewProps = ILoginModalViewOwnProps & ILoginModalViewMapDispatchToProps;

export class LoginModalView extends React.Component<ILoginModalViewProps, ILoginModalViewState>{
    private inputRefName: React.RefObject<any>;
    private inputRefPassword: React.RefObject<any>;

    constructor(props: ILoginModalViewProps) {
        super(props);
        this.inputRefName = React.createRef();
        this.inputRefPassword = React.createRef();
        this.state = {
            username: "",
            password: ""
        };
    }

    public render() {
        return (
            <MokeModal
                isOpen={this.props.isOpen}
                title={"登录"}
                content={this.renderContent()}
                footer={this.renderFooter()} />
        );
    }
    private renderContent = () => {
        return (
            <React.Fragment>
                <Form.Control
                    ref={this.inputRefName}
                    defaultValue={this.state.username}
                />
                <Form.Control
                    ref={this.inputRefPassword}
                    defaultValue={this.state.password}
                />
            </React.Fragment>
        );
    }

    private renderFooter = () => {
        return (
            <React.Fragment>
                <Button
                    variant="secondary"
                    onClick={this.props.onClose}>关闭</Button>
                <Button
                    variant="primary"
                    onClick={() => {
                        const username = this.inputRefName.current.value;
                        const password = this.inputRefPassword.current.value;
                        this.props.login!(username, password);
                    }}>登录</Button>
            </React.Fragment>
        );
    }
}