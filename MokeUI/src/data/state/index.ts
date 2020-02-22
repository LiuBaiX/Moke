import { IErrorState } from "./IErrorState";
import { IUserState } from "./IUserState";

interface IAppState {
    error: IErrorState;
    user: IUserState;
}

export {
    IAppState,
    IErrorState,
    IUserState,
};