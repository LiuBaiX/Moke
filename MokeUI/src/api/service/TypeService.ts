import MokeSender from '../../util/MokeSender';
import MokeAPI from '../url';

const mokeSender = new MokeSender();
const mokeAPI = new MokeAPI();

function getType(): Promise<any> {
    const getType = `${mokeAPI.getType()}`;
    return mokeSender.send(getType, "GET");
}

export default {
    getType,
}