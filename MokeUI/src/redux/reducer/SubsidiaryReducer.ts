import constants from "moke-constants";
import { ISubsidiaryState } from "moke-state";
import { ISubsidiaryAction } from "moke-action";

const defaultState: ISubsidiaryState = {
    subsidiary: []
};

const subsidiaryReducer = (
    state: ISubsidiaryState = defaultState,
    action: ISubsidiaryAction
): ISubsidiaryState => {
    switch (action.type) {
        case constants.SUBSIDIARY_SET:
            return {
                subsidiary: action.subsidiaries || [],
            };
        case constants.SUBSIDIARY_DELETE:
            return {
                subsidiary: state.subsidiary.filter((item) => {
                    return item.subsidiaryId !== action.id;
                })
            }
        default: return state;
    }
}

export { subsidiaryReducer };