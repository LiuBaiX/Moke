import { MokeSender } from 'moke-util';
import MokeAPI from '../url';
import { IArticleTypeInfo } from "moke-model";

const mokeSender = new MokeSender();
const mokeAPI = new MokeAPI();

const getArticleType = (): Promise<IArticleTypeInfo[]> => {
    const url = mokeAPI.getArticleType();
    return mokeSender.send(url, "GET");
}

export default {
    getArticleType
}