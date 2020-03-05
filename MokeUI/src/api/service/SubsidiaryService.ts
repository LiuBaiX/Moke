import { MokeSender } from 'moke-util';
import MokeAPI from '../url';
import { ISubsidiaryInfo } from 'moke-model';

const mokeSender = new MokeSender();
const mokeAPI = new MokeAPI();

const getSubsidiariesByArticleId = (id: string): Promise<ISubsidiaryInfo[]> => {
    const url = mokeAPI.getSubsidiariesByArticleId(id);
    return mokeSender.send(url, "GET");
}

export default {
    getSubsidiariesByArticleId
}