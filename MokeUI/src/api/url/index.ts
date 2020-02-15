export default class MokeAPI {
    public baseURL = "http://localhost";

    public login = () => {
        return this.baseURL + "/user/login";
    }

    public register = () => {
        return this.baseURL + "/user/register";
    }

    public getType = () => {
        return this.baseURL + "/type";
    }

    public getArticle = () => {
        return this.baseURL + "/article";
    }

    public addArticle = () => {
        return this.baseURL + "/article/add";
    }
}