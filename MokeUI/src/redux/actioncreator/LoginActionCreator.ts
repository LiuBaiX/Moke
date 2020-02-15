import constants from "moke-constants";
import {
    ILoginAction,
    IShowErrorAction
} from "moke-action";
import { UserService } from "moke-service";
import { RequestStatus } from "moke-enum";
import { showErrorActionCreator } from "./ShowErrorActionCreator";
import { ThunkAction } from "redux-thunk";
import { IAppState } from "moke-state";

const loginActionCreator = (username: string, uid: string) => {
    return {
        type: constants.COMMON_LOGIN,
        username,
        uid,
    }
}

const login = (
    username: string,
    password: string
): ThunkAction<void, IAppState, null, ILoginAction | IShowErrorAction> => {
    return (dispatch) => {
        UserService.login(username, password).then((data) => {
            if (data.status === RequestStatus.Failed) {
                dispatch(showErrorActionCreator(data.msg));
                return;
            }
            dispatch(loginActionCreator(username, data.uid));
        });
    }
}

export default{
    login
}