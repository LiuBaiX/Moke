import { IHomePageState } from "../../state/IHomePageState";
import constants from "../../../constant";
import IHomePageAction from "../../action/IHomePageAction";

const defaultState: IHomePageState = {
    testString: ""
}

const homepageReducer = (state = defaultState, action: IHomePageAction) => {
    switch (action.type) {
        case constants.HOMEPAGE_TEST:
            return { ...state, testString: action.value };
        default: return state;
    }
}

export {
    homepageReducer
}