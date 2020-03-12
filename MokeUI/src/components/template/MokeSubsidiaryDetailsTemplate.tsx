import React from "react";
import { MokeCard } from "../card";
import { Tab, Col, Nav, Row, Button, Form, Spinner } from "react-bootstrap";
import { MokeAppreciationTemplate } from "./MokeAppreciationTemplate";
import { MokeAudioTemplate } from "./MokeAudioTemplate";
import { MokeImageTemplate } from "./MokeImageTemplate";
import { MokeVideoTemplate } from "./MokeVideoTemplate";
import { MokeNoDataTemplate } from "./ModeNoDataTemplate";
import { ISubsidiary, IUser, IInvitationResponse } from "moke-model";
import { SubsidiaryType, ResponseStatusType } from "moke-enum";
import {
    MokeModal,
    MokePeoplePicker,
    MokeBasicList
} from "moke-components";
import { IBasePicker, IPersonaProps, RefObject } from "office-ui-fabric-react";

export interface IMokeSubsidiaryDetailsTemplateProps {
    dataSource: ISubsidiary[];
    isDisplayInviteButton: boolean;
    fetchUserDataByFuzzyName?: (fuzzyName: string) => Promise<IUser[]>;
    onSubmit?: (description: string) => Promise<IInvitationResponse>;
    pickerRef?: React.RefObject<IBasePicker<IPersonaProps>>;
}

interface IMokeSubsidiaryDetailsTemplateState {
    isOpen: boolean;
    isRequesting: boolean;
}

export class MokeSubsidiaryDetailsTemplate extends React.Component<IMokeSubsidiaryDetailsTemplateProps, IMokeSubsidiaryDetailsTemplateState> {
    private descriptionRef: React.RefObject<any>;

    constructor(props: IMokeSubsidiaryDetailsTemplateProps) {
        super(props);
        this.state = {
            isOpen: false,
            isRequesting: false,
        };
        this.descriptionRef = React.createRef();
    }

    public render() {
        return (
            <React.Fragment>
                <MokeCard headerText="衍生作品"
                    onRenderHeader={
                        this.props.isDisplayInviteButton
                            ? () => {
                                return (
                                    <Button
                                        className="float-right"
                                        variant="outline-success"
                                        onClick={() => {
                                            this.setState({
                                                isOpen: true
                                            });
                                        }}
                                    >邀请</Button>
                                );
                            }
                            : undefined
                    }
                >
                    <Tab.Container id="left-tabs-example" defaultActiveKey="drawing">
                        <Row>
                            <Col sm={2}>
                                <Nav variant="pills" className="flex-column">
                                    <Nav.Item>
                                        <Nav.Link eventKey="drawing">绘画</Nav.Link>
                                    </Nav.Item>
                                    <Nav.Item>
                                        <Nav.Link eventKey="declaim">朗诵</Nav.Link>
                                    </Nav.Item>
                                    <Nav.Item>
                                        <Nav.Link eventKey="music">音乐</Nav.Link>
                                    </Nav.Item>
                                    <Nav.Item>
                                        <Nav.Link eventKey="appreciate">鉴赏</Nav.Link>
                                    </Nav.Item>
                                    <Nav.Item>
                                        <Nav.Link eventKey="video">视频</Nav.Link>
                                    </Nav.Item>
                                </Nav>
                            </Col>
                            <Col sm={10} className={"moke-article-details-template-tab-pane"}>
                                {this.renderTabContent(this.props.dataSource)}
                            </Col>
                        </Row>
                    </Tab.Container>
                </MokeCard>
                <MokeModal
                    title={"邀请合著者"}
                    footer={this.renderModalFooter()}
                    content={this.renderModalContent()}
                    isOpen={this.state.isOpen}
                    onClose={() => {
                        this.setState({
                            isOpen: false
                        });
                    }}
                />
            </React.Fragment>
        );
    }

    private renderModalFooter = () => {
        return <Button
            variant="outline-success"
            disabled={this.state.isRequesting}
            onClick={() => {
                this.setState({
                    isRequesting: true
                });
                this.props
                    .onSubmit!(this.descriptionRef.current.value)
                    .then((data) => {
                        alert(
                            data.status === ResponseStatusType.Failed
                                ? `输入未通过验证,${data.message}`
                                : `通过验证,${data.message}`,
                        );
                        this.setState({
                            isRequesting: false,
                            isOpen: false,
                        });
                    });
            }}>
            {
                this.state.isRequesting
                    ? <Spinner size="sm" animation="border" />
                    : "邀请"
            }
        </Button>;
    }

    private renderModalContent = () => {
        return (
            <React.Fragment>
                <Form as={"div"}>
                    <Form.Group as={Row} controlId="formPlaintextEmail">
                        <Form.Label column sm="2">
                            收件人
                        </Form.Label>
                        <Col sm="10">
                            <MokePeoplePicker
                                fetchUserData={this.props.fetchUserDataByFuzzyName}
                                pickerRef={this.props.pickerRef}
                            />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row}>
                        <Form.Label column sm="2">
                            描述
                        </Form.Label>
                        <Col sm="10">
                            <Form.Control as="textarea" ref={this.descriptionRef} />
                        </Col>
                    </Form.Group>
                </Form>
            </React.Fragment>
        );
    }

    private renderTabContent = (dataSource: ISubsidiary[]) => {
        const drawing = dataSource.filter((item) => {
            return item.type === SubsidiaryType.Drawing;
        });
        const declaim = dataSource.filter((item) => {
            return item.type === SubsidiaryType.Declaim;
        });
        const appreciation = dataSource.filter((item) => {
            return item.type === SubsidiaryType.Appreciation;
        });
        const music = dataSource.filter((item) => {
            return item.type === SubsidiaryType.Music;
        });
        const video = dataSource.filter((item) => {
            return item.type === SubsidiaryType.Video;
        });
        return (
            <Tab.Content>
                <Tab.Pane eventKey="drawing">
                    {
                        drawing.length === 0
                            ? <MokeNoDataTemplate />
                            : <MokeBasicList dataSource={drawing.map((item, index) => {
                                return <MokeImageTemplate dataSource={item} key={index} />;
                            })} row={3} />
                    }
                </Tab.Pane>
                <Tab.Pane eventKey="declaim">
                    {
                        declaim.length === 0
                            ? <MokeNoDataTemplate />
                            : <MokeBasicList dataSource={declaim.map((item, index) => {
                                return <MokeAudioTemplate dataSource={item} key={index} />;
                            })} row={1} />
                    }
                </Tab.Pane>
                <Tab.Pane eventKey="music">
                    {
                        music.length === 0
                            ? <MokeNoDataTemplate />
                            : <MokeBasicList dataSource={music.map((item, index) => {
                                return <MokeAudioTemplate dataSource={item} key={index} />;
                            })} row={1} />
                    }
                </Tab.Pane>
                <Tab.Pane eventKey="appreciate">
                    {
                        appreciation.length === 0
                            ? <MokeNoDataTemplate />
                            : <MokeBasicList dataSource={appreciation.map((item, index) => {
                                return <MokeAppreciationTemplate dataSource={item} key={index} />;
                            })} row={1} />
                    }
                </Tab.Pane>
                <Tab.Pane eventKey="video">
                    {
                        video.length === 0
                            ? <MokeNoDataTemplate />
                            : <MokeBasicList dataSource={video.map((item, index) => {
                                return <MokeVideoTemplate dataSource={item} key={index} />;
                            })} row={1} />
                    }
                </Tab.Pane>
            </Tab.Content>
        );
    }
} 