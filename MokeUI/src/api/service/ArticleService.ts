import { MokeSender } from 'moke-util';
import MokeAPI from '../url';
import { IArticleForm, IArticleForDisplayInfo, IArticleInfo, IUpdateArticleReturnsInfo, IInvitationResponse } from 'moke-model';
import { ArticleStatusType } from 'moke-enum';

const mokeSender = new MokeSender();
const mokeAPI = new MokeAPI();

const addArticle = (articleForm: IArticleForm): Promise<IUpdateArticleReturnsInfo> => {
    const url = mokeAPI.addArticle();
    return mokeSender.send(url, "POST", articleForm);
}

const editArticle = (articleForm: IArticleForm): Promise<IUpdateArticleReturnsInfo> => {
    const url = `${mokeAPI.editArticle()}/${articleForm.articleId}`;
    return mokeSender.send(url, "POST", articleForm);
}

const deleteArticle = (id: string): Promise<IInvitationResponse> => {
    const url = mokeAPI.deleteArticle(id);
    return mokeSender.send(url, "POST");
}

const getPublicArticles = (page: number): Promise<IArticleForDisplayInfo[]> => {
    const url = mokeAPI.getPublicArticles();
    return mokeSender.send(url, "POST", { page }).then(({ data }) => {
        return data;
    });
}

const getDisplayArticleById = (id: number): Promise<IArticleForDisplayInfo> => {
    const url = `${mokeAPI.getDisplayArticleById()}/${id}`;
    return mokeSender.send(url, "GET");
}

const getArticleById = (id: number): Promise<IArticleInfo> => {
    const url = `${mokeAPI.getArticleById()}/${id}`;
    return mokeSender.send(url, "GET");
}

const getMyArticles = (uid: string, page: number): Promise<IArticleForDisplayInfo[]> => {
    const url = mokeAPI.getMyArticles(uid);
    return mokeSender.send(url, "POST", { page }).then(({ data }) => {
        return data;
    })
}

const getAllBanedArticles = (): Promise<IArticleForDisplayInfo[]> => {
    const url = mokeAPI.getAllArticles();
    return mokeSender.send(url, "GET");
}

const setArticleStatusAccept = (id: string, adminId: string): Promise<IArticleForDisplayInfo> => {
    const url = mokeAPI.setArticleStatus(id);
    return mokeSender.send(url, "POST", {
        admin_id: adminId
    });
}

export default {
    addArticle,
    getPublicArticles,
    getArticleById,
    getMyArticles,
    editArticle,
    getDisplayArticleById,
    deleteArticle,
    getAllBanedArticles,
    setArticleStatusAccept
}