import constants from "moke-constants";
import { IInvitationAction, IUserManagementAction, IArticleAction, ISubsidiaryAction } from "moke-action";
import { IInvitation, IInvitationRequest, IInvitationResponse, IUser, IArticleForDisplay, ISubsidiary } from "moke-model";
import { ThunkAction } from "redux-thunk";
import { IAppState } from "moke-state";
import { InvitationService, ArticleService, SubsidiaryService, UserService } from "moke-service";
import { mokeMapper } from "moke-mapper";
import { InvitationStatusType, UserStatusType } from "moke-enum";

type IManagementAction = ISubsidiaryAction | IUserManagementAction | IArticleAction;

const setUsers = (users: IUser[]): IUserManagementAction => {
    return {
        type: constants.MANAGEMENT_USER_SET,
        users,
    }
}

const setUserStatus = (id: string, status: UserStatusType): IUserManagementAction => {
    return {
        type: constants.MANAGEMENT_USER_STATUS_SET,
        id,
        status,
    }
}

const setArticles = (articles: IArticleForDisplay[]): IArticleAction => {
    return {
        type: constants.MANAGEMENT_ARTICLE_SET,
        articles,
    }
}

const setArticleStatusAccept = (id: string): IArticleAction => {
    return {
        type: constants.MANAGEMENT_ARTICLE_STATUS_SET,
        id,
    }
}

const setSubsidiaries = (subsidiaries: ISubsidiary[]): ISubsidiaryAction => {
    return {
        type: constants.MANAGEMENT_SUBSIDIARY_SET,
        subsidiaries,
    }
}

const setSubsidiaryStatusAccept = (id: string): ISubsidiaryAction => {
    return {
        type: constants.MANAGEMENT_SUBSIDIARY_STATUS_SET,
        id,
    }
}

const getAllBanedArticles = (): ThunkAction<Promise<IArticleForDisplay[]>, IAppState, null, IManagementAction> => {
    return (dispatch) => {
        return ArticleService
            .getAllBanedArticles()
            .then((data) => {
                const articles = data.map((item) => {
                    return mokeMapper.mapDisplayArticleInfoToModel(item);
                });
                dispatch(setArticles(articles));
                return articles
            });
    }
}

const acceptArticle = (
    id: string
): ThunkAction<Promise<void>, IAppState, null, IManagementAction> => {
    return (dispatch, getState) => {
        const adminId = getState().admin.id;
        return ArticleService
            .setArticleStatusAccept(id, adminId)
            .then(() => {
                dispatch(setArticleStatusAccept(id));
            });
    }
}

const getAllBanedSubsidiaries = (): ThunkAction<Promise<ISubsidiary[]>, IAppState, null, IManagementAction> => {
    return (dispatch) => {
        return SubsidiaryService
            .getAllBanedSubsidiaries()
            .then((data) => {
                const subsidiaries = data.map((item) => {
                    return mokeMapper.mapSubsidiaryInfoToModel(item);
                });
                dispatch(setSubsidiaries(subsidiaries));
                return subsidiaries
            });
    }
}

const acceptSubsidiary = (
    id: string
): ThunkAction<Promise<void>, IAppState, null, IManagementAction> => {
    return (dispatch, getState) => {
        const adminId = getState().admin.id;
        return SubsidiaryService
            .setSubsidiaryStatusAccept(id, adminId)
            .then(() => {
                dispatch(setSubsidiaryStatusAccept(id));
            });
    }
}

const getAllUsers = (): ThunkAction<Promise<IUser[]>, IAppState, null, IManagementAction> => {
    return (dispatch) => {
        return UserService
            .getAllUsers()
            .then((data) => {
                const users = data.map((item) => {
                    return mokeMapper.mapUserInfoToModel(item);
                });
                dispatch(setUsers(users));
                return users
            });
    }
}

const updateUserStatus = (
    id: string,
    status: UserStatusType
): ThunkAction<Promise<void>, IAppState, null, IManagementAction> => {
    return (dispatch, getState) => {
        const adminId = getState().admin.id;
        return UserService
            .setUserStatus(id, status, adminId)
            .then(() => {
                dispatch(setUserStatus(id, status));
            });
    }
}

export default {
    acceptArticle,
    acceptSubsidiary,
    updateUserStatus,
    getAllBanedArticles,
    getAllBanedSubsidiaries,
    getAllUsers,
}