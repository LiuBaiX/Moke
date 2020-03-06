import constants from "moke-constants";
import { IInvitationAction } from "moke-action";
import { IInvitation } from "moke-model";
import { ThunkAction } from "redux-thunk";
import { IAppState } from "moke-state";
import { InvitationService, ArticleService } from "moke-service";
import { mokeMapper } from "moke-mapper";

const setInvitations = (invitations: IInvitation[]): IInvitationAction => {
    return {
        type: constants.INVITATION_LIST_FETCH,
        invitations,
    }
}

const fetchMyInvitation = (): ThunkAction<Promise<void>, IAppState, null, IInvitationAction> => {
    return (dispatch, getState) => {
        const { uid, username } = getState().user;
        const fetchInvitationPromise = InvitationService.getMyInvitations((uid || -1).toString());

        return fetchInvitationPromise.then((invitationsInfos) => {

            const fetchArticlesPromiseArray = invitationsInfos.map((item) => {
                return ArticleService
                    .getArticleById(item.article_id)
                    .then((article) => {
                        return mokeMapper.mapInvitationInfoToModel(username, item, article);
                    })
            });

            return Promise.all(fetchArticlesPromiseArray);
        }).then((invitations) => {
            dispatch(setInvitations(invitations));
        });
    };
}

export default{
    fetchMyInvitation
}