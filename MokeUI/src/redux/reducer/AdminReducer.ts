import constants from "moke-constants";
import { IAdminState } from "moke-state";
import { IAdminAction } from "moke-action";
import { SimpleSession } from "moke-util";

const admin = SimpleSession.getSession("admin");

const defaultState: IAdminState = {
    username: admin?.username || "",
    id: admin?.id ? `${admin?.id}` : ""
};

const adminReducer = (state = defaultState, action: IAdminAction): IAdminState => {
    switch (action.type) {
        case constants.ADMIN_LOGIN:
            return {
                id: action.id || "",
                username: action.username || ""
            };
        case constants.ADMIN_LOGOUT:
            return {
                id: "",
                username: ""
            }
        default: return state;
    }
}

export { adminReducer };