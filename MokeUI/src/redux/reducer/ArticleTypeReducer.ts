import constants from "moke-constants";
import { IArticleTypeState } from "moke-state";
import { IArticleTypeAction } from "moke-action";

const defaultState: IArticleTypeState = {
    articleType: []
};

const articleTypeReducer = (state: IArticleTypeState = defaultState, action: IArticleTypeAction) => {
    switch (action.type) {
        case constants.ARTICLE_TYPE_LIST_SET:
            return {
                articleType: action.articleTypeList
            };
        default: return state;
    }
}

export { articleTypeReducer };