import constants from "moke-constants";
import { IInvitationAction } from "moke-action";
import { IInvitation, IInvitationRequest, IInvitationResponse } from "moke-model";
import { ThunkAction } from "redux-thunk";
import { IAppState } from "moke-state";
import { InvitationService, ArticleService } from "moke-service";
import { mokeMapper } from "moke-mapper";
import { InvitationStatusType } from "moke-enum";

const setInvitations = (type: string, invitations: IInvitation[]): IInvitationAction => {
    return {
        type,
        invitations,
    }
}

const updateReceivedInvitationStatus = (
    id: string,
    status: InvitationStatusType
): IInvitationAction => {
    return {
        type: constants.RECEIVED_INVITATION_UPDATE,
        id,
        status
    };
}

const deleteSendedInvitation = (id: string): IInvitationAction => {
    return {
        type: constants.SENDED_INVITATION_DELETE,
        id,
    };
}

const fetchMyReceivedInvitations = (): ThunkAction<Promise<void>, IAppState, null, IInvitationAction> => {
    return (dispatch, getState) => {
        const { uid, username } = getState().user;
        const fetchInvitationPromise = InvitationService.getMyReceivedInvitations((uid || -1).toString());

        return fetchInvitationPromise.then((invitationsInfos) => {

            const fetchArticlesPromiseArray = invitationsInfos.map((item) => {
                return ArticleService
                    .getDisplayArticleById(item.article_id)
                    .then((article) => {
                        return mokeMapper.mapInvitationInfoToModel(username, item, article);
                    })
            });

            return Promise.all(fetchArticlesPromiseArray);
        }).then((invitations) => {
            dispatch(setInvitations(constants.RECEIVED_INVITATION_LIST_SET, invitations));
        });
    };
}

const fetchMySendedInvitations = (): ThunkAction<Promise<void>, IAppState, null, IInvitationAction> => {
    return (dispatch, getState) => {
        const { uid } = getState().user;
        const fetchInvitationPromise = InvitationService.getMySendedInvitations((uid || -1).toString());

        return fetchInvitationPromise.then((invitationsInfos) => {

            const fetchArticlesPromiseArray = invitationsInfos.map((item) => {
                return ArticleService
                    .getDisplayArticleById(item.article_id)
                    .then((article) => {
                        return mokeMapper.mapSendedInvitationInfoToModel(item, article);
                    })
            });

            return Promise.all(fetchArticlesPromiseArray);
        }).then((invitations) => {
            dispatch(setInvitations(constants.SENDED_INVITATION_LIST_SET, invitations));
        });
    };
}

const updateMyReceivedInvitationStatus = (id: string, status: InvitationStatusType): ThunkAction<Promise<void>, IAppState, null, IInvitationAction> => {
    return (dispatch) => {
        return InvitationService
            .updateMyReceivedInvitationStatus(id, status)
            .then(() => {
                dispatch(updateReceivedInvitationStatus(id, status));
            });
    }
}

const cancelMySendedInvitation = (id: string): ThunkAction<Promise<void>, IAppState, null, IInvitationAction> => {
    return (dispatch) => {
        return InvitationService
            .cancelMySendedInvitation(id)
            .then(() => {
                dispatch(deleteSendedInvitation(id));
            });
    }
}

const sendInvitation = (data: IInvitationRequest): Promise<IInvitationResponse> => {
    return InvitationService.sendInvitation(data);
}

export default {
    fetchMyReceivedInvitations,
    fetchMySendedInvitations,
    updateMyReceivedInvitationStatus,
    cancelMySendedInvitation,
    sendInvitation,
}