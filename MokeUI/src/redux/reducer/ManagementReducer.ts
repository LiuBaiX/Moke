import constants from "moke-constants";
import { IAdminState, IUserManagementState, IArticleManagementState, ISubsidiaryManagementState, IManagementState } from "moke-state";
import { IAdminAction, IUserManagementAction, IArticleAction, ISubsidiaryAction } from "moke-action";
import { ArticleStatusType, SubsidiaryStatusType } from "moke-enum";
import { combineReducers } from 'redux';

const defaultUserState: IUserManagementState = {
    users: []
};

const defaultArticleState: IArticleManagementState = {
    articles: []
};

const defaultSubsidiaryState: ISubsidiaryManagementState = {
    subsidiaries: []
};


const userReducer = (state = defaultUserState, action: IUserManagementAction): IUserManagementState => {
    switch (action.type) {
        case constants.MANAGEMENT_USER_SET:
            return {
                users: action.users || []
            };
        case constants.MANAGEMENT_USER_STATUS_SET:
            return {
                users: state.users.map((item) => {
                    return {
                        ...item,
                        status: action.id === item.id
                            ? action.status
                            : item.status
                    }
                })
            }
        default: return state;
    }
}

const articleReducer = (state = defaultArticleState, action: IArticleAction): IArticleManagementState => {
    switch (action.type) {
        case constants.MANAGEMENT_ARTICLE_SET:
            return {
                articles: action.articles || []
            };
        case constants.MANAGEMENT_ARTICLE_STATUS_SET:
            return {
                articles: state.articles
                    .filter(
                        (item) => item.articleId.toString() !== action.id
                    )
                    .map(item => {
                        return { ...item }
                    })
            }
        default: return state;
    }
}

const subsidiaryReducer = (state = defaultSubsidiaryState, action: ISubsidiaryAction): ISubsidiaryManagementState => {
    switch (action.type) {
        case constants.MANAGEMENT_SUBSIDIARY_SET:
            return {
                subsidiaries: action.subsidiaries || []
            };
        case constants.MANAGEMENT_SUBSIDIARY_STATUS_SET:
            return {
                subsidiaries: state.subsidiaries
                    .filter(
                        (item) => item.subsidiaryId !== action.id
                    )
                    .map(item => {
                        return { ...item }
                    })
            }
        default: return state;
    }
}

const managementReducer = combineReducers({
    user: userReducer,
    article: articleReducer,
    subsidiary: subsidiaryReducer
})

export { managementReducer };