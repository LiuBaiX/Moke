import React from 'react';
import './index.scss';
import { connect } from 'react-redux';
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

export interface IMokeNavOwnProps {

}
export interface IMokeNavMapStateToProps {
    test?: string
}
export interface IMokeNavMapDispatchToProps {

}

type IMokeNavProps = IMokeNavOwnProps & IMokeNavMapStateToProps & IMokeNavMapDispatchToProps;

interface IMokeNavSate {
    isOpenLoginModal: boolean;
}

const mapStateToProps = ({ testString }: any) => {
    return {
        testString
    }
}


connect(mapStateToProps);

export class MokeNav extends React.Component<IMokeNavProps, IMokeNavSate>{

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
                            <Button variant="outline-info"
                                onClick={() => {
                                    this.setState({ isOpenLoginModal: true });
                                }}>登录</Button>
                            <Button variant="outline-info">注册</Button>
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
}
