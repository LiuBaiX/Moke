import React from "react";
import { MokeCard } from "../card";
import { Tab, Col, Nav, Row } from "react-bootstrap";
import { MokeAppreciationTemplate } from "./MokeAppreciationTemplate";
import { MokeAudioTemplate } from "./MokeAudioTemplate";
import { MokeImageTemplate } from "./MokeImageTemplate";
import { MokeVideoTemplate } from "./MokeVideoTemplate";
import { MokeBasicList } from "../list";
import { ISubsidiary } from "moke-model";
import { SubsidiaryType } from "moke-enum";
import { MokeNoDataTemplate } from "./ModeNoDataTemplate";

export interface IMokeSubsidiaryDetailsTemplateProps {
    dataSource: ISubsidiary[];
}

export class MokeSubsidiaryDetailsTemplate extends React.Component<IMokeSubsidiaryDetailsTemplateProps> {
    public render() {
        return (
            <React.Fragment>
                <MokeCard headerText="衍生作品" >
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