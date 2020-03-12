import MokeSender from '../../util/MokeSender';
import MokeAPI from '../url';
import { IUserInfo } from 'moke-model';

const mokeSender = new MokeSender();
const mokeAPI = new MokeAPI();

function login(name: string, password: string): Promise<any> {
    const url = `${mokeAPI.login()}`;
    return mokeSender.send(url, "POST", { name: name, password: password });
}

function register(name: string, password: string): Promise<any> {
    const url = mokeAPI.register();
    return mokeSender.send(url, "POST", { name, password });
}

function getUserByFuzzyName(fuzzyName: string): Promise<IUserInfo[]> {
    const url = mokeAPI.getUserByFuzzyName(fuzzyName);
    return mokeSender.send(url, "GET");
}

export default {
    login,
    register,
    getUserByFuzzyName
}