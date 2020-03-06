import { MokeSender } from 'moke-util';
import MokeAPI from '../url';
import { IArticleTypeInfo, IInvitationInfo } from "moke-model";

const mokeSender = new MokeSender();
const mokeAPI = new MokeAPI();

const getMyInvitations = (id: string): Promise<IInvitationInfo[]> => {
    const url = mokeAPI.getMyInvitations(id);
    return mokeSender.send(url, "GET");
}

export default {
    getMyInvitations
}