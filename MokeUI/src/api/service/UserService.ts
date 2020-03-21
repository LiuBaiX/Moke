import MokeSender from '../../util/MokeSender';
import MokeAPI from '../url';
import { IUserInfo, ICommonResponseInfo } from 'moke-model';

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

function getUserById(id: string): Promise<IUserInfo> {
    const url = mokeAPI.getUserById(id);
    return mokeSender.send(url, "POST");
}

function updatePassword(id: string, newPassword: string, oldPassword: string): Promise<ICommonResponseInfo> {
    const url = mokeAPI.updatePassword(id, newPassword);
    return mokeSender.send(url, "POST", { password: oldPassword });
}

export default {
    login,
    register,
    getUserByFuzzyName,
    getUserById,
    updatePassword
}