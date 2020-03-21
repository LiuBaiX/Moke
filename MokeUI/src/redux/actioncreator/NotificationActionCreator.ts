import constants from "moke-constants";
import { INotificationAction } from "moke-action";
import { INotification } from "moke-model";
import { ThunkAction } from "redux-thunk";
import { IAppState } from "moke-state";
import { NotificationService } from "moke-service";
import { mokeMapper } from "moke-mapper";

const setNotifications = (notifications: INotification[]): INotificationAction => {
    return {
        type: constants.NOTIFICATION_LIST_SET,
        notifications,
    }
}

const setNotificationHasBeenRead = (
    id: string
): INotificationAction => {
    return {
        type: constants.NOTIFICATION_HAS_BEEN_READ_SET,
        id
    };
}

const getNotificationsByReceiver = (): ThunkAction<Promise<INotification[]>, IAppState, null, INotificationAction> => {
    return (dispatch, getState) => {
        const receiverId = getState().user.uid!.toString();
        return NotificationService.getNotificationsByReceiver(receiverId).then((data) => {
            return data.map((item) => mokeMapper.mapNotificationInfoToModel(item));
        }).then((data) => {
            dispatch(setNotifications(data));
            return data;
        });
    }
}

const setNotificationStatusToRead = (id: string): ThunkAction<Promise<void>, IAppState, null, INotificationAction> => {
    return (dispatch) => {
        return NotificationService.setNotificationHasBeenRead(id).then(() => {
            dispatch(setNotificationHasBeenRead(id));
        });
    }
}

export default {
    getNotificationsByReceiver,
    setNotificationStatusToRead
}