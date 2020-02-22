import constants from "moke-constants";
import { IErrorAction } from "moke-action";

const loginErrorActionCreator = (message: string): IErrorAction => {
    return {
        type: constants.ERROR_LOGIN,
        message,
    }
}

const registerErrorActionCreator = (message: string): IErrorAction => {
    return {
        type: constants.ERROR_REGISTER,
        message,
    }
}

export {
    loginErrorActionCreator,
    registerErrorActionCreator
}