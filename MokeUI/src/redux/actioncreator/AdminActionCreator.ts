import constants from "moke-constants";
import {
    IAdminAction
} from "moke-action";
import { AdminService } from "moke-service";
import { ThunkAction } from "redux-thunk";
import { IAppState } from "moke-state";
import { SimpleSession } from "moke-util";
import { ResponseStatusType } from "moke-enum";
import { ICommonResponseInfo } from "moke-model";

const loginActionCreator = (username: string, id: string): IAdminAction => {
    return {
        type: constants.ADMIN_LOGIN,
        username,
        id,
    }
}

const logoutActionCreator = (): IAdminAction => {
    return {
        type: constants.ADMIN_LOGOUT,
    }
}

const login = (
    username: string,
    password: string
): ThunkAction<Promise<ICommonResponseInfo>, IAppState, null, IAdminAction> => {
    return (dispatch) => {
        return AdminService.login(username, password).then((data) => {
            SimpleSession.clearSession();
            if (data.status === ResponseStatusType.Success) {
                SimpleSession.setSession("admin", {
                    id: data.id,
                    username
                });
                dispatch(loginActionCreator(username, data.id || ""));
            }
            return data;
        });
    }
}

const logout = (): ThunkAction<void, IAppState, null, IAdminAction> => {
    return (dispatch) => {
        SimpleSession.clearSession();
        dispatch(logoutActionCreator());
    }
};

export default {
    login,
    logout,
}