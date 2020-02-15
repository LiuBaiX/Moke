import constants from "moke-constants";
import { IErrorMessageState, IAppState } from "moke-state";
import { IShowErrorAction } from "moke-action";

const defaultState: IErrorMessageState = {
    message: "",
};

const errorReducer = (state: IAppState, action: IShowErrorAction) => {
    switch (action.type) {
        case constants.COMMON_SHOW_ERROR:
            return {
                errorMessage: action.message
            };
        default: return defaultState;
    }
}

export default errorReducer;