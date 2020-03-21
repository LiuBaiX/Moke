import { NotificationView } from "./NotificationView";
import { connect } from "react-redux";
import { IAppState } from "moke-state";
import { NotificationActionCreator } from "moke-action-creator";

const mapStateToProps = ({ notification }: IAppState) => {
    return {
        dataSource: notification.data
    }
}

const mapDispatchToProps = {
    fetchNotifications: NotificationActionCreator.getNotificationsByReceiver,
    setNotificationHasBeenRead: NotificationActionCreator.setNotificationStatusToRead
};

const Notification = connect(mapStateToProps, mapDispatchToProps)(NotificationView);

export {
    Notification
}