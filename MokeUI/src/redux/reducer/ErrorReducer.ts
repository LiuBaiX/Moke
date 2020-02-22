import constants from "moke-constants";
import { IErrorState } from "moke-state";
import { IErrorAction } from "moke-action";

const defaultState: IErrorState = {
    message: "",
};

const errorReducer = (state: IErrorState = defaultState, action: IErrorAction) => {
    switch (action.type) {
        case constants.ERROR_LOGIN:
            return {
                message: action.message
            };
        case constants.ERROR_REGISTER:
            return {
                message: action.message
            };
        default: return state;
    }
}

export { errorReducer };