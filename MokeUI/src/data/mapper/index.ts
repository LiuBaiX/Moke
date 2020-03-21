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
    IInvitation,
    IArticleInfo,
    IUserInfo,
    IUser,
    INotification,
    INotificationInfo
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

    public mapArticleInfoToModel(info: IArticleInfo): IArticle {
        return {
            articleId: info.article_id,
            isPublic: info.isPublic === ArticleIsPublic.Yes,
            name: info.title,
            description: info.description,
            articleType: info.type,
            articleSubType: info.subType,
            content: info.content,
        };
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
            articleId: info.article_id.toString(),
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

    public mapUserInfoToModel(info: IUserInfo): IUser {
        return {
            id: info.uid,
            username: info.name,
            password: info.password,
            createDate: info.create_date,
            status: info.status,
        }
    }

    public mapNotificationInfoToModel(info: INotificationInfo): INotification {
        return {
            id: info.message_id.toString(),
            senderId: info.sender.toString(),
            receiverId: info.receiver.toString(),
            senderDisplayName: info.admin_name,
            receiverDisplayName: info.name,
            title: info.title,
            message: info.message,
            sendedDate: info.sended_date,
            status: info.has_been_read,
        }
    }
}

const mokeMapper = new MokeMapper();
export {
    mokeMapper
}