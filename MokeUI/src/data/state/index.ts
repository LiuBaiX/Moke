import { IErrorMessageState } from "./IErrorMessageState";
import { IUserState } from "./IUserState";

interface IAppState {
    errorMessage: IErrorMessageState;
    user: IUserState;
}

export {
    IAppState,
    IErrorMessageState,
    IUserState,
};