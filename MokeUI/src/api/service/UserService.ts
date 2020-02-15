import MokeSender from '../../util/MokeSender';
import MokeAPI from '../url';

const mokeSender = new MokeSender();
const mokeAPI = new MokeAPI();

function login(name: string, password: string): Promise<any> {
    const login = `${mokeAPI.login()}`;
    return mokeSender.send(login, "POST", { name: name, password: password });
}

export default {
    login,
}