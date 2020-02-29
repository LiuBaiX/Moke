import { MokeSender } from 'moke-util';
import MokeAPI from '../url';
import { IArticleForm, IArticle } from 'moke-model';
import { mokeMapper } from 'moke-mapper';

const mokeSender = new MokeSender();
const mokeAPI = new MokeAPI();

const addArticle = (articleForm: IArticleForm): Promise<void> => {
    const url = mokeAPI.addArticle();
    return mokeSender.send(url, "POST", articleForm);
}

export default {
    addArticle
}