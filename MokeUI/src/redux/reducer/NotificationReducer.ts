import constants from "moke-constants";
import { INotificationState } from "moke-state";
import { INotificationAction } from "moke-action";
import { NotificationStatusType } from "moke-enum";

const defaultState: INotificationState = {
    data: []
};

const notificationReducer = (
    state: INotificationState = defaultState,
    action: INotificationAction
): INotificationState => {
    switch (action.type) {
        case constants.NOTIFICATION_LIST_SET:
            return {
                data: action.notifications || [],
            };
        case constants.NOTIFICATION_HAS_BEEN_READ_SET:
            return {
                data: state.data.map((item) => {
                    return item.id === action.id
                        ? {
                            ...item,
                            status: NotificationStatusType.Read
                        }
                        : item;
                })
            }
        default: return state;
    }
}

export { notificationReducer };