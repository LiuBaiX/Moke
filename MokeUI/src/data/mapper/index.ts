import {
    IArticleType,
    IArticleTypeInfo,
    IArticleSubTypeInfo,
    IArticleSubType,
    IArticle,
    IArticleForm
} from "moke-model";
import { ArticleIsPublic } from "moke-enum";

class MokeMapper {
    public mapArticleTypeInfoToModel(info: IArticleTypeInfo): IArticleType {
        return {
            tid: info.tid,
            displayName: info.type_name,
        };
    }

    public mapArticleSubTypeInfoToModel(info: IArticleSubTypeInfo): IArticleSubType {
        return {
            parentTid: info.tid,
            tid: info.subsidiary_tid,
            displayName: info.display_name,
        }
    }

    public mapArticleModelToArticleForm(model: IArticle, uid: number): IArticleForm {
        return {
            uid,
            articleId: model.articleId,
            tid: model.articleType,
            subTid: model.articleSubType,
            name: model.name,
            description: model.description || "",
            content: model.content || "",
            isPublic: model.isPublic ? ArticleIsPublic.Yes : ArticleIsPublic.No,
        }
    }
}

const mokeMapper = new MokeMapper();
export {
    mokeMapper
}