import MokeSender from '../../util/MokeSender';
import MokeAPI from '../url';

const mokeSender = new MokeSender();
const mokeAPI = new MokeAPI();

function login(name: string, password: string): Promise<any> {
    const url = `${mokeAPI.login()}`;
    return mokeSender.send(url, "POST", { name: name, password: password });
}

function register(name: string, password: string): Promise<any> {
    const url = mokeAPI.register();
    return mokeSender.send(url, "POST" ,{ name, password });
}

export default {
    login,
    register
}