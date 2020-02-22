import React from 'react';
import {
    Col,
    Row,
    Button,
    InputGroup,
    FormControl,
    Nav,
    ButtonGroup,
} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { LoginModal } from './loginmodal';
import './index.scss';

interface IMokeNavMapStateToProps {
    username: string;
    uid?: number;
};

interface IMokeNavMapDispatchToProps {
    logout: () => void;
};

type IMokeNavProps = IMokeNavMapStateToProps & IMokeNavMapDispatchToProps;

interface IMokeNavSate {
    isOpenLoginModal: boolean;
}

export class MokeNavView extends React.Component<IMokeNavProps, IMokeNavSate>{

    constructor(props: IMokeNavProps) {
        super(props);
        this.state = {
            isOpenLoginModal: false,
        }
    }

    public render(): JSX.Element {
        return (
            <React.Fragment>
                <Row>
                    <Col>
                        <Link
                            to="/home"
                            className="nav-link moke-homepage-nav-headerLink">
                            <h2>墨客</h2>
                        </Link>
                    </Col>
                    <Col className="">
                        <ButtonGroup className="float-right">
                            {
                                this.props.uid
                                    ? this.renderUserButtonGroup()
                                    : this.renderLoginAndRegisterButtonGroup()
                            }
                        </ButtonGroup>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <InputGroup>
                            <FormControl
                                placeholder="Username"
                                aria-label="Username"
                            />
                            <InputGroup.Append>
                                <Button variant="outline-secondary">搜索</Button>
                            </InputGroup.Append>
                        </InputGroup>
                    </Col>
                </Row>
                <Row>
                    <Nav className="flex-column">
                        <Link to="/article" className="nav-link">文学宝库</Link>
                        <Link to="/daily" className="nav-link">每日推荐</Link>
                        <Link to="/story" className="nav-link">典故大全</Link>
                        <Link to="/center" className="nav-link">个人中心</Link>
                        <Link to="/create" className="nav-link">开始创作</Link>
                    </Nav>
                </Row>
                <LoginModal isOpen={this.state.isOpenLoginModal}
                    onClose={() => {
                        this.setState({
                            isOpenLoginModal: false
                        })
                    }} />
            </React.Fragment>
        )
    }

    private renderUserButtonGroup = () => {
        return (
            <React.Fragment>
                <Button variant="outline-info"
                    onClick={() => {

                    }}>
                    {this.props.username}
                </Button>
                <Button variant="outline-danger"
                    onClick={() => {
                        this.props.logout();
                    }}>注销</Button>
            </React.Fragment>
        );
    }

    private renderLoginAndRegisterButtonGroup = () => {
        return (
            <React.Fragment>
                <Button variant="outline-info"
                    onClick={() => {
                        this.setState({ isOpenLoginModal: true });
                    }}>登录</Button>
                <Button variant="outline-info">注册</Button>
            </React.Fragment>
        );
    }
}
