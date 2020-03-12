import { MokeSender } from 'moke-util';
import MokeAPI from '../url';
import { IArticleForm, IArticleForDisplayInfo, IArticleInfo, IUpdateArticleReturnsInfo } from 'moke-model';

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

export default {
    addArticle,
    getPublicArticles,
    getArticleById,
    getMyArticles,
    editArticle,
    getDisplayArticleById,
}