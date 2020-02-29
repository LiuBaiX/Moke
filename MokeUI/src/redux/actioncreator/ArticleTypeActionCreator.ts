import constants from "moke-constants";
import { IArticleType } from "moke-model";
import { IArticleTypeAction } from "moke-action";
import { ThunkAction } from "redux-thunk";
import { IAppState } from "moke-state";
import { ArticleTypeService } from "moke-service";
import { mokeMapper } from "moke-mapper";

const setArticleTypeList = (articleTypeList: IArticleType[]): IArticleTypeAction => {
    return {
        type: constants.ARTICLE_TYPE_LIST_SET,
        articleTypeList,
    }
}

const fetchArticleTypeList = (): ThunkAction<Promise<void>, IAppState, null, IArticleTypeAction> => {
    return (dispatch) => {
        return ArticleTypeService
            .getArticleType()
            .then((data) => {
                dispatch(
                    setArticleTypeList(
                        data.map((item) => {
                            return mokeMapper.mapArticleTypeInfoToModel(item);
                        })
                    )
                );
            });
    }
}

export default {
    fetchArticleTypeList
}