import constants from "moke-constants";
import {
    IUserAction,
    IErrorAction
} from "moke-action";
import { UserService } from "moke-service";
import { RequestStatus, ResponseStatusType } from "moke-enum";
import { loginErrorActionCreator, registerErrorActionCreator } from "./ErrorActionCreator";
import { ThunkAction } from "redux-thunk";
import { IAppState } from "moke-state";
import { SimpleSession } from "moke-util";
import { IUser, ICommonResponseInfo } from "moke-model";
import { mokeMapper } from "moke-mapper";

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

const setUserInformation = (user: IUser): IUserAction => {
    return {
        type: constants.USER_INFORMATION_SET,
        password: user.password,
        createDate: user.createDate,
        status: user.status
    };
}

const setUserPassword = (password: string): IUserAction => {
    return {
        type: constants.USER_PASSWORD_SET,
        password,
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

const fetchUserDataByFuzzyName = (fuzzyName: string): Promise<IUser[]> => {
    return UserService.getUserByFuzzyName(fuzzyName).then((data) => {
        return data.map((item) => {
            return mokeMapper.mapUserInfoToModel(item);
        });
    });
}

const fetchUserInformationById = (id: string): ThunkAction<
    Promise<IUser>,
    IAppState,
    null,
    IUserAction
> => {
    return (dispatch) => {
        return UserService.getUserById(id).then((data) => {
            return mokeMapper.mapUserInfoToModel(data);
        }).then((data) => {
            dispatch(setUserInformation(data));
            return data;
        });
    }
}

const updatePassword = (id: string, newPassword: string, oldPassword: string): ThunkAction<
    Promise<ICommonResponseInfo>,
    IAppState,
    null,
    IUserAction
> => {
    return (dispatch) => {
        return UserService.updatePassword(id, newPassword, oldPassword)
            .then((data) => {
                if (data.status === ResponseStatusType.Success) {
                    dispatch(setUserPassword(newPassword));
                }
                return data;
            });
    }
}

export default {
    login,
    logout,
    register,
    fetchUserDataByFuzzyName,
    fetchUserInformationById,
    updatePassword
}