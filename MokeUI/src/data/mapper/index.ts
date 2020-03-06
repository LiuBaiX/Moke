import {
    IArticleType,
    IArticleTypeInfo,
    IArticleSubTypeInfo,
    IArticleSubType,
    IArticle,
    IArticleForm,
    IArticleForDisplayInfo,
    IArticleForDisplay,
    ISubsidiary,
    ISubsidiaryInfo,
    IInvitationInfo,
    IInvitation
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

    public mapDisplayArticleInfoToModel(info: IArticleForDisplayInfo): IArticleForDisplay {
        return {
            articleId: info.article_id,
            name: info.title,
            authorId: info.author.toString(),
            authorDisplayName: info.name,
            lastModifiedDate: info.last_modified_date,
            createdDate: info.create_date,
            description: info.description,
            articleTypeDisplayName: info.type_name,
            articleSubTypeDisplayName: info.display_name,
            content: info.content,
        }
    }

    public mapSubsidiaryInfoToModel(info: ISubsidiaryInfo): ISubsidiary {
        return {
            subsidiaryId: info.subsidiary_id.toString(),
            title: info.title,
            authorDisplayName: info.name,
            authorId: info.author.toString(),
            src: info.src,
            content: info.content,
            createDate: info.create_date,
            type: info.type,
        }
    }

    public mapInvitationInfoToModel(
        username: string,
        info: IInvitationInfo,
        article: IArticleForDisplayInfo
    ): IInvitation {
        return {
            invitationId: info.invitation_id.toString(),
            author: article.name,
            to: username,
            article: { ...this.mapDisplayArticleInfoToModel(article) },
            description: info.description,
            date: info.create_date,
            status: info.status
        };
    }

    public mapSendedInvitationInfoToModel(
        info: IInvitationInfo,
        article: IArticleForDisplayInfo
    ): IInvitation {
        return {
            invitationId: info.invitation_id.toString(),
            author: article.name,
            to: info.name || "",
            article: { ...this.mapDisplayArticleInfoToModel(article) },
            description: info.description,
            date: info.create_date,
            status: info.status
        };
    }
}

const mokeMapper = new MokeMapper();
export {
    mokeMapper
}