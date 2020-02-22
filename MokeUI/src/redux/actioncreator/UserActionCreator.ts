import constants from "moke-constants";
import {
    IUserAction,
    IErrorAction
} from "moke-action";
import { UserService } from "moke-service";
import { RequestStatus } from "moke-enum";
import { loginErrorActionCreator } from "./ErrorActionCreator";
import { ThunkAction } from "redux-thunk";
import { IAppState } from "moke-state";
import { SimpleSession } from "moke-util";

const loginActionCreator = (username: string, uid: number): IUserAction => {
    return {
        type: constants.COMMON_LOGIN,
        username,
        uid,
    }
}

const logoutActionCreator = (): IUserAction => {
    return {
        type: constants.COMMON_LOGOUT,
    }
}

const login = (
    username: string,
    password: string
): ThunkAction<Promise<void>, IAppState, null, IUserAction | IErrorAction> => {
    return (dispatch) => {
        return UserService.login(username, password).then((data) => {
            if (data.status === RequestStatus.Failed) {
                dispatch(loginErrorActionCreator(data.message));
                return;
            }
            SimpleSession.setSession("user", {
                uid: data.uid,
                username
            });
            dispatch(loginActionCreator(username, data.uid));
        });
    }
}

const logout = (): ThunkAction<void, IAppState, null, IUserAction> => {
    return (dispatch) => {
        SimpleSession.clearSession();
        dispatch(logoutActionCreator());
    }
};

export default {
    login,
    logout,
}