import MokeSender from '../../util/MokeSender';
import MokeAPI from '../url';

const mokeSender = new MokeSender();
const mokeAPI = new MokeAPI();

function login(name: string, password: string): Promise<any> {
    const url = `${mokeAPI.login()}`;
    return mokeSender.send(url, "POST", { name: name, password: password });
}

function isLogin(): Promise<any> {
    const url = `${mokeAPI.isLogin()}`;
    return mokeSender.send(url, "GET");
}

export default {
    login,
    isLogin
}