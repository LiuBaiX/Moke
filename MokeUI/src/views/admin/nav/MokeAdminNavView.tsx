import React from 'react';
import {
    Col,
    Row,
    Button,
    ButtonGroup,
    ListGroup,
} from 'react-bootstrap';
import { LoginModal } from './loginmodal';
import './index.scss';

interface IMokeAdminNavViewOwnProps {
    history: any;
}

interface IMokeAdminNavViewMapStateToProps {
    username: string;
    uid?: string;
};

interface IMokeAdminNavViewMapDispatchToProps {
    logout: () => void;
};

type IMokeAdminNavViewProps = IMokeAdminNavViewOwnProps
    & IMokeAdminNavViewMapStateToProps
    & IMokeAdminNavViewMapDispatchToProps;

interface IMokeAdminNavViewSate {
    isOpenLoginModal: boolean;
    isOpenRegisterModal: boolean;
    isActive: variant[];
}

type variant = undefined
    | 'primary'
    | 'secondary'
    | 'success'
    | 'danger'
    | 'warning'
    | 'info'
    | 'dark'
    | 'light';

const LogoutButton: React.FunctionComponent<{ logout: () => void }> = (props) => {
    return <Button variant="outline-danger"
        onClick={() => {
            props.logout();
            window.location.replace("/admin");
        }}>注销</Button>;
}

export class MokeAdminNavView extends React.Component<IMokeAdminNavViewProps, IMokeAdminNavViewSate>{
    constructor(props: IMokeAdminNavViewProps) {
        super(props);
        this.state = {
            isOpenLoginModal: false,
            isOpenRegisterModal: false,
            isActive: [undefined, undefined, undefined]
        }
    }

    public render(): JSX.Element {
        return (
            <React.Fragment>
                <Row>
                    <Col>
                        <div className="moke-homepage-nav-header">
                            <h3>墨客</h3>
                            <ButtonGroup className="float-right">
                                {
                                    this.props.uid !== ""
                                        ? this.renderUserButtonGroup()
                                        : <Button variant="outline-info"
                                            onClick={() => {
                                                this.setState({ isOpenLoginModal: true });
                                            }}>登录</Button>
                                }
                            </ButtonGroup>
                        </div>
                    </Col>
                </Row>
                <Row>
                    <ListGroup className="moke-nav-container">
                        <ListGroup.Item action
                            className={"moke-nav-item text-primary"}
                            variant={this.state.isActive[0] as any}
                            onClick={() => {
                                this.whichIsActive(0);
                                this.props.history.push("/admin/article");
                            }}>
                            文章审批
                        </ListGroup.Item>
                        <ListGroup.Item action
                            className={"moke-nav-item text-primary"}
                            variant={this.state.isActive[2] as any}
                            onClick={() => {
                                this.whichIsActive(2);
                                this.props.history.push("/admin/subsidiary");
                            }}>
                            衍生作品审批
                        </ListGroup.Item>
                        <ListGroup.Item action
                            className={"moke-nav-item text-primary"}
                            variant={this.state.isActive[3] as any}
                            onClick={() => {
                                this.whichIsActive(3);
                                this.props.history.push("/admin/user");
                            }}>
                            用户管理
                        </ListGroup.Item>
                    </ListGroup>
                </Row>
                <LoginModal isOpen={this.state.isOpenLoginModal}
                    onClose={() => {
                        this.setState({
                            isOpenLoginModal: false
                        });
                    }} />
            </React.Fragment>
        )
    }

    private whichIsActive = (index: number): void => {
        const isActive = [...this.state.isActive];
        isActive.fill(undefined);
        isActive[index] = "primary";
        this.setState({
            isActive,
        });
    }

    private renderUserButtonGroup = () => {
        return (
            <React.Fragment>
                <Button variant="outline-info">
                    {this.props.username}
                </Button>
                <LogoutButton logout={this.props.logout} />
            </React.Fragment>
        );
    }
}
