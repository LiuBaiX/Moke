import MokeSender from '../../util/MokeSender';
import MokeAPI from '../url';
import { ICommonResponseInfo } from 'moke-model';

const mokeSender = new MokeSender();
const mokeAPI = new MokeAPI();

function login(name: string, password: string): Promise<ICommonResponseInfo> {
    const url = mokeAPI.adminLogin();
    return mokeSender.send(url, "POST", { name: name, password: password });
}

export default {
    login,
}