import { MokeSender } from 'moke-util';
import MokeAPI from '../url';
import { IArticleSubTypeInfo } from "moke-model";

const mokeSender = new MokeSender();
const mokeAPI = new MokeAPI();

function getArticleSubType(id: number): Promise<IArticleSubTypeInfo[]> {
    const url = mokeAPI.getArticleSubType(id);
    return mokeSender.send(url, "GET");
}

export default {
    getArticleSubType
}