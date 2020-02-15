import constants from "moke-constants";
import { IShowErrorAction } from "moke-action";

const showErrorActionCreator = (message: string): IShowErrorAction => {
    return {
        type: constants.COMMON_SHOW_ERROR,
        message,
    }
}

export {
    showErrorActionCreator
}