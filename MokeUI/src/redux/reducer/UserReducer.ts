import constants from "moke-constants";
import { IUserState } from "moke-state";
import { IUserAction } from "moke-action";
import { SimpleSession } from "moke-util";

const user = SimpleSession.getSession("user");

const defaultState: IUserState = {
    username: user?.username || "",
    uid: user?.uid || undefined,
};

const userReducer = (state: IUserState = defaultState, action: IUserAction): IUserState => {
    switch (action.type) {
        case constants.COMMON_LOGIN:
            return {
                uid: action.uid,
                username: action.username || ""
            };
        case constants.COMMON_LOGOUT:
            return {
                uid: undefined,
                username: ""
            }
        default: return state;
    }
}

export { userReducer };