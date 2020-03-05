import constants from "moke-constants";
import { IArticleState } from "moke-state";
import { IArticleAction } from "moke-action";

const defaultState: IArticleState = {
    data: [],
    page: 1,
    myArticle: {
        data: [],
        page: 1
    },
};

const articleReducer = (state: IArticleState = defaultState, action: IArticleAction) => {
    switch (action.type) {
        case constants.ARTICLE_LIST_PUSH:
            return {
                ...state,
                data: [
                    ...state.data,
                    ...action.articles || []
                ],
                page: action.page,
            };
        case constants.MY_ARTICLE_LIST_PUSH:
            return {
                ...state,
                myArticle:{
                    data:[
                        ...state.myArticle.data,
                        ...action.articles||[]
                    ],
                    page:action.page,
                }
            }
        default: return state;
    }
}

export { articleReducer };