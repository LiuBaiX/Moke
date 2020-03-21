import React from "react";
import { INotification } from "moke-model";
import { Col, Row } from "react-bootstrap";
import { MokeNotificationTemplate, MokeBasicList } from "moke-components";

interface INotificationViewOwnProps {
}

interface INotificationViewMapStateToProps {
    dataSource?: INotification[];
}

interface INotificationViewMapDispatchToProps {
    fetchNotifications?: () => Promise<INotification[]>;
    setNotificationHasBeenRead?: (id: string) => Promise<void>;
}

export type INotificationViewProps = INotificationViewOwnProps
    & INotificationViewMapDispatchToProps
    & INotificationViewMapStateToProps;

interface INotificationViewState {
    isLoading: boolean;
    isOpen: boolean;
}

export class NotificationView extends React.Component<INotificationViewProps, INotificationViewState>{
    constructor(props: INotificationViewProps) {
        super(props);
        this.state = {
            isOpen: false,
            isLoading: false,
        };
    }

    public componentDidMount() {
        this.setState({
            isLoading: true
        });
        this.props.fetchNotifications!().then(() => {
            this.setState({
                isLoading: false
            });
        });
    }

    public render() {
        return (
            <React.Fragment>
                <MokeBasicList
                    dataSource={this.getNotificationList()}
                    row={2}
                />
            </React.Fragment>
        );
    }

    private getNotificationList = () => {
        return this.props.dataSource!.map((data) => {
            return (
                <Row>
                    <Col>
                        <MokeNotificationTemplate
                            dataSource={data}
                            setNotificationHasBeenRead={this.props.setNotificationHasBeenRead!}
                        />
                    </Col>
                </Row>
            );
        });
    }
}