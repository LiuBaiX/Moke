import React from "react";
import { INotification } from "moke-model";
import { MokeCard } from "../card";
import "./index.scss";
import { Button, Badge, Spinner } from "react-bootstrap";
import { NotificationStatusType } from "moke-enum";

export interface IMokeNotificationTemplateProps {
    dataSource: INotification;
    setNotificationHasBeenRead: (id: string) => Promise<void>;
}

export const MokeNotificationTemplate: React.FunctionComponent<IMokeNotificationTemplateProps> = (props) => {
    const [isLoading, setIsLoading] = React.useState(false);
    const {
        dataSource,
        setNotificationHasBeenRead
    } = props;

    return (
        <React.Fragment>
            <MokeCard styles={{
                root: "moke-notification-container"
            }}>
                <div className="moke-notification-header">
                    <div>
                        <h5>
                            <b>{dataSource.title}</b>
                        </h5>
                        <p className="text-muted">尊敬的{dataSource.receiverDisplayName}</p>
                    </div>
                    <div>
                        {
                            dataSource.status === NotificationStatusType.NotRead
                                ? <Button
                                    variant="outline-warning"
                                    onClick={() => {
                                        setIsLoading(true);
                                        setNotificationHasBeenRead(dataSource.id).then(() => {
                                            setIsLoading(false);
                                        })
                                    }}
                                >
                                    {
                                        isLoading
                                            ? <Spinner animation="border" size="sm" />
                                            : "标为已读"
                                    }
                                </Button>
                                : <Badge className="moke-notification-badge" variant="secondary">已读</Badge>
                        }
                    </div>
                </div>
                <p>{dataSource.message}</p>
                <p className="text-muted">{`${dataSource.sendedDate} 来自 ${dataSource.senderDisplayName}`}</p>
            </MokeCard>
        </React.Fragment>
    );
}