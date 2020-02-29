import constants from "moke-constants";
import { IArticle } from "moke-model";
import { IArticleTypeAction } from "moke-action";
import { ThunkAction } from "redux-thunk";
import { IAppState } from "moke-state";
import { ArticleService } from "moke-service";
import { mokeMapper } from "moke-mapper";

const addArticle = (dataSource: IArticle): ThunkAction<Promise<void>, IAppState, null, any> => {
    return (dispatch, getState) => {
        const uid = getState().user.uid;
        const articleForm = mokeMapper.mapArticleModelToArticleForm(dataSource, uid!);
        return ArticleService.addArticle(articleForm);
    }
}

export default {
    addArticle
}