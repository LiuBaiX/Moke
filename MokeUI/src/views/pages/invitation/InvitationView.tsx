import React from "react";
import { Row, Col } from "react-bootstrap";
import {
    MokeCard,
    MokeLoadingPage,
    MokeInvitationTemplateByReceiver,
    MokeInvitationTemplateBySender
} from "moke-components";
import { InvitationStatusType } from "moke-enum";
import { IInvitation } from "moke-model";

interface ICreateCenterViewMapStateToProps {
    receivedInvitations?: IInvitation[];
    sendedInvitations?: IInvitation[];
}

interface IInvitationViewMapDispatchToProps {
    fetchMyReceivedInvitations?: () => Promise<void>;
    fetchMySendedInvitations?: () => Promise<void>;
    updateMyReceivedInvitationStatus?: (id: string, status: InvitationStatusType) => Promise<void>;
    cancelMySendedInvitation?: (id: string) => Promise<void>;
}

export type IInvitationViewProps = ICreateCenterViewMapStateToProps
    & IInvitationViewMapDispatchToProps;

interface IInvitationViewState {
    isLoading: boolean;
}

export class InvitationView extends React.Component<IInvitationViewProps, IInvitationViewState>{
    constructor(props: IInvitationViewProps) {
        super(props);
        this.state = {
            isLoading: true
        };
    }

    public componentDidMount() {
        const promises = [
            this.props.fetchMyReceivedInvitations!(),
            this.props.fetchMySendedInvitations!(),
        ];
        Promise.all(promises).then(() => {
            this.setState({
                isLoading: false
            });
        });
    }

    public render() {
        return (
            <React.Fragment>
                <Row className="moke-create-center-card">
                    <Col>
                        <MokeCard headerText={"收到的合著邀请函"}>
                            {
                                this.state.isLoading
                                    ? <MokeLoadingPage />
                                    : <MokeInvitationTemplateByReceiver
                                        onAccept={(id) => {
                                            return this.props.updateMyReceivedInvitationStatus!(id, InvitationStatusType.Accept);
                                        }}
                                        onReject={(id) => {
                                            return this.props.updateMyReceivedInvitationStatus!(id, InvitationStatusType.Reject);
                                        }}
                                        dataSource={this.props.receivedInvitations || []}
                                    />
                            }
                        </MokeCard>
                    </Col>
                </Row>
                <Row className="moke-create-center-card">
                    <Col>
                        <MokeCard headerText={"发送的合著邀请函"}>
                            {
                                this.state.isLoading
                                    ? <MokeLoadingPage />
                                    : <MokeInvitationTemplateBySender
                                        onCancel={(id) => {
                                            return this.props.cancelMySendedInvitation!(id);
                                        }}
                                        dataSource={this.props.sendedInvitations || []}
                                    />
                            }
                        </MokeCard>
                    </Col>
                </Row>
            </React.Fragment>
        );
    }
}