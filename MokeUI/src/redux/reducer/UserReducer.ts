import constants from "moke-constants";
import { IUserState } from "moke-state";
import { IUserAction } from "moke-action";
import { SimpleSession } from "moke-util";
import { UserStatusType } from "moke-enum";

const user = SimpleSession.getSession("user");

const defaultState: IUserState = {
    username: user?.username || "",
    uid: user?.uid || undefined,
    password: "",
    createDate: "",
    status: UserStatusType.Normal
};

const userReducer = (state: IUserState = defaultState, action: IUserAction): IUserState => {
    switch (action.type) {
        case constants.COMMON_LOGIN:
            return {
                ...state,
                uid: action.uid,
                username: action.username || ""
            };
        case constants.COMMON_LOGOUT:
            return {
                ...state,
                uid: undefined,
                username: ""
            }
        case constants.USER_INFORMATION_SET:
            return {
                ...state,
                password: action.password || "",
                status: action.status || UserStatusType.Normal,
                createDate: action.createDate || ""
            }
        case constants.USER_PASSWORD_SET:
            return {
                ...state,
                password: action.password || "",
            }
        default: return state;
    }
}

export { userReducer };