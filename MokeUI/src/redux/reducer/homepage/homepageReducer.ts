import { IHomePageState } from "../../state/IHomePageState";
import constants from '../../constant';

const defaultState: IHomePageState = {
    testString: ""
}

const homepageReducer = (state = defaultState, action: any) => {
    switch (action.type) {
        case constants.HOMEPAGE_TEST:
            return state;
        default: return state;
    }
}

export {
    homepageReducer
}