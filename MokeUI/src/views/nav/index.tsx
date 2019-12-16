import React from 'react';
import './index.scss';
import { connect, MapDispatchToProps, MapStateToProps } from 'react-redux';
import reducer from '../../redux/reducer';
import {
    Col,
    Row,
    Container,
    Button,
    InputGroup,
    FormControl,
    Nav,
    ButtonGroup
} from 'react-bootstrap';

export interface IHomePageOwnProps {

}
export interface IHomePageMapStateToProps {
    test?: string
}
export interface IHomePageMapDispatchToProps {

}
type IHomePageProps = IHomePageOwnProps & IHomePageMapStateToProps & IHomePageMapDispatchToProps;

const mapStateToProps = ({ testString }: any) => {
    return {
        testString
    }
}

const mapDispatchToProps = () => {
    return reducer
}

connect(mapStateToProps);

export default class MokeNav extends React.Component<IMokeNavProps>{
    constructor(props: IMokeNavProps) {
        super(props);
        this.state = {

        }
    }
    public render(): JSX.Element {
        return (
            <Container>
                <Row>
                    <Col md={3}>
                        <Row>
                            <h1>墨客</h1>
                            <Col className={"moke-homepage-nav-alignRight"}>
                                <ButtonGroup>
                                    <Button variant="outline-info">登录</Button>
                                    <Button variant="outline-info">注册</Button>
                                </ButtonGroup>
                            </Col>
                        </Row>
                        <Row>
                            <InputGroup>
                                <FormControl
                                    placeholder="Username"
                                    aria-label="Username"
                                />
                                <InputGroup.Append>
                                    <Button variant="outline-secondary">搜索</Button>
                                </InputGroup.Append>
                            </InputGroup>
                        </Row>
                        <Row>
                            <Nav defaultActiveKey="/home" className="flex-column">
                                <Nav.Link href="/home">文学宝库</Nav.Link>
                                <Nav.Link eventKey="link-1">每日推荐</Nav.Link>
                                <Nav.Link eventKey="link-2">典故大全</Nav.Link>
                                <Nav.Link eventKey="link-2">个人中心</Nav.Link>
                            </Nav>
                        </Row>
                    </Col>
                    <Col md={9}>

                    </Col>
                </Row>
            </Container>
        )
    }
}
