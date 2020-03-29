import { MokeSender } from 'moke-util';
import MokeAPI from '../url';
import { ISubsidiaryInfo, ICommonResponseInfo, ISubsidiaryForm } from 'moke-model';

const mokeSender = new MokeSender();
const mokeAPI = new MokeAPI();

const getSubsidiariesByArticleId = (id: string): Promise<ISubsidiaryInfo[]> => {
    const url = mokeAPI.getSubsidiariesByArticleId(id);
    return mokeSender.send(url, "GET");
}

const addSubsidiary = (data: ISubsidiaryForm): Promise<ICommonResponseInfo> => {
    const {
        articleId,
        uid,
        type,
        title,
        content,
        src,
        file,
        invitationId
    } = data;
    const url = mokeAPI.addSubsidiary(articleId!, uid!, type, invitationId!);
    return mokeSender.send(url, "POST_FILE", {
        title,
        content,
        src,
        file
    });
}

const deleteSubsidiary = (id: string): Promise<void> => {
    const url = mokeAPI.deleteSubsidiary(id);
    return mokeSender.send(url, "POST");
}

const getSubsidiariesByUserId = (id: string): Promise<ISubsidiaryInfo[]> => {
    const url = mokeAPI.getSubsidiariesByUserId(id);
    return mokeSender.send(url, "GET");
}

const getAllBanedSubsidiaries = (): Promise<ISubsidiaryInfo[]> => {
    const url = mokeAPI.getAllBanedSubsidiaries();
    return mokeSender.send(url, "GET");
}

const setSubsidiaryStatusAccept = (id: string, adminId: string): Promise<ISubsidiaryInfo> => {
    const url = mokeAPI.setSubsidiaryStatus(id);
    return mokeSender.send(url, "POST", {
        admin_id: adminId
    });
}

export default {
    getSubsidiariesByArticleId,
    addSubsidiary,
    deleteSubsidiary,
    getSubsidiariesByUserId,
    getAllBanedSubsidiaries,
    setSubsidiaryStatusAccept,
}