export default class MokeAPI {
    public baseURL = "http://localhost";

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

    public getArticle = () => {
        return this.baseURL + "/article";
    }

    public addArticle = () => {
        return this.baseURL + "/article/add";
    }
}