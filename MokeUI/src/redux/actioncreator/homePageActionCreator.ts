import constants from '../constant';
import { IHomePageState } from '../state/IHomePageState';
import IHomePageAction from '../action/IHomePageAction';

const test = (): IHomePageAction => {
    return {
        type: constants.HOMEPAGE_TEST,
        value: "this is an action that sent by homepage"
    }
}

export default {
    test
}