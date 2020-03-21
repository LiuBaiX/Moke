import { InvitationStatusType, SubsidiaryType } from "moke-enum";

export default class MokeAPI {
    public baseURL = "http://localhost";

    public getUserByFuzzyName = (fuzzyName: string) => {
        return this.baseURL + `/user/${fuzzyName}`;
    }

    public getUserById = (id: string) => {
        return this.baseURL + `/user/${id}/information`;
    }

    public updatePassword = (id: string, newPassword: string) => {
        return this.baseURL + `/user/${id}/password/${newPassword}`;
    }

    public login = () => {
        return this.baseURL + "/user/login";
    }

    public isLogin = () => {
        return this.baseURL + "/user/isLogin";
    }

    public register = () => {
        return this.baseURL + "/user/register";
    }

    public getArticleType = () => {
        return this.baseURL + "/article/type";
    }

    public getArticleSubType = (id: number) => {
        return this.baseURL + `/article/subtype/${id}`;
    }

    public getPublicArticles = () => {
        return this.baseURL + "/article/public";
    }

    public addArticle = () => {
        return this.baseURL + "/article/add";
    }

    public editArticle = () => {
        return this.baseURL + "/article/edit";
    }

    public deleteArticle = (id: string) => {
        return this.baseURL + `/article/delete/${id}`;
    }

    public getArticleById = () => {
        return this.baseURL + "/article/not/display";
    }

    public getDisplayArticleById = () => {
        return this.baseURL + "/article"
    }

    public getSubsidiariesByArticleId = (id: string) => {
        return this.baseURL + `/subsidiary/${id}`;
    }

    public getSubsidiariesByUserId = (id: string) => {
        return this.baseURL + `/subsidiary/mine/${id}`;
    }

    public addSubsidiary = (articleId: string, uid: string, type_id: SubsidiaryType, invitationId: string) => {
        return this.baseURL + `/subsidiary/add/${articleId}/${uid}/${type_id}/${invitationId}`;
    }

    public deleteSubsidiary = (subsidiaryId: string) => {
        return this.baseURL + `/subsidiary/delete/${subsidiaryId}`;
    }

    public getMyArticles = (id: string) => {
        return this.baseURL + `/article/mine/${id}`;
    }

    public getMySendedInvitations = (id: string) => {
        return this.baseURL + `/invitation/send/${id}`;
    }

    public getMyReceivedInvitations = (id: string) => {
        return this.baseURL + `/invitation/receive/${id}`;
    }

    public updateMyReceivedInvitationStatus = (id: string, status: InvitationStatusType) => {
        return this.baseURL + `/invitation/receive/${id}/status/${status}`;
    }

    public cancelMySendedInvitation = (id: string) => {
        return this.baseURL + `/invitation/send/delete/${id}`;
    }

    public sendInvitation = (from: string, ref: string) => {
        return this.baseURL + `/invitation/send/${from}/ref/${ref}`;
    }

    public getNotificationsByReceiver = (receiverId: string) => {
        return this.baseURL + `/notification/receiver/${receiverId}`;
    }

    public setNotificationHabBeenRead = (notificationId: string) => {
        return this.baseURL + `/notification/read/${notificationId}`;
    }
}