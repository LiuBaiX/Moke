import constants from "moke-constants";
import {
    IUserAction,
    IErrorAction
} from "moke-action";
import { UserService } from "moke-service";
import { RequestStatus } from "moke-enum";
import { loginErrorActionCreator, registerErrorActionCreator } from "./ErrorActionCreator";
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
            dispatch(loginErrorActionCreator(""));
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

const register = (username: string, password: string): ThunkAction<Promise<void>, IAppState, null, IUserAction> => {
    return (dispatch) => {
        return UserService.register(username, password)
            .then((data) => {
                if (data.status === RequestStatus.Failed) {
                    dispatch(registerErrorActionCreator(data.message));
                    return;
                }
                SimpleSession.setSession("user", {
                    uid: data.uid,
                    username
                });
                dispatch(loginActionCreator(username, data.uid));
                dispatch(registerErrorActionCreator(""));
            });
    }
}

export default {
    login,
    logout,
    register,
}