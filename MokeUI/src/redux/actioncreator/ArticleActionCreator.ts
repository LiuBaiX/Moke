import constants from "moke-constants";
import { IArticle, IArticleForDisplay, IUpdateArticleReturnsInfo } from "moke-model";
import { IArticleAction } from "moke-action";
import { ThunkAction } from "redux-thunk";
import { IAppState } from "moke-state";
import { ArticleService } from "moke-service";
import { mokeMapper } from "moke-mapper";

const addArticle = (dataSource: IArticle): ThunkAction<Promise<IUpdateArticleReturnsInfo>, IAppState, null, any> => {
    return (dispatch, getState) => {
        const uid = getState().user.uid;
        const articleForm = mokeMapper.mapArticleModelToArticleForm(dataSource, uid!);
        return ArticleService.addArticle(articleForm);
    }
}

const editArticle = (dataSource: IArticle): ThunkAction<Promise<IUpdateArticleReturnsInfo>, IAppState, null, any> => {
    return (dispatch, getState) => {
        const uid = getState().user.uid;
        const articleForm = mokeMapper.mapArticleModelToArticleForm(dataSource, uid!);
        return ArticleService.editArticle(articleForm);
    }
}

const pushArticle = (articles: IArticleForDisplay[], page: number): IArticleAction => {
    return {
        type: constants.ARTICLE_LIST_PUSH,
        articles,
        page,
    }
}

const pushMyArticle = (articles: IArticleForDisplay[], page: number): IArticleAction => {
    return {
        type: constants.MY_ARTICLE_LIST_PUSH,
        articles,
        page,
    }
}

const fetchArticles = (): ThunkAction<Promise<void>, IAppState, null, IArticleAction> => {
    return (dispatch, getState) => {
        let { page } = getState().articles;
        return ArticleService.getPublicArticles(page).then((data) => {
            const articles = data.map((item) => {
                return mokeMapper.mapDisplayArticleInfoToModel(item);
            })
            page++;
            dispatch(pushArticle(articles, page));
        })
    }
}

const fetchMyArticles = (): ThunkAction<Promise<void>, IAppState, null, IArticleAction> => {
    return (dispatch, getState) => {
        let { page } = getState().articles.myArticle;
        const { uid } = getState().user;
        return ArticleService.getMyArticles((uid || 0).toString(), page).then((data) => {
            const articles = data.map((item) => {
                return mokeMapper.mapDisplayArticleInfoToModel(item);
            })
            page++;
            dispatch(pushMyArticle(articles, page));
        })
    }
}

const deleteMyArticle = (id: string) => {
    return ArticleService.deleteArticle(id);
}

export default {
    addArticle,
    editArticle,
    fetchArticles,
    fetchMyArticles,
    deleteMyArticle
}