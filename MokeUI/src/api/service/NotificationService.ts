import { MokeSender } from 'moke-util';
import MokeAPI from '../url';
import { ISubsidiaryInfo, ICommonResponseInfo, ISubsidiaryForm, INotificationInfo } from 'moke-model';

const mokeSender = new MokeSender();
const mokeAPI = new MokeAPI();

const getNotificationsByReceiver = (receiverId: string): Promise<INotificationInfo[]> => {
    const url = mokeAPI.getNotificationsByReceiver(receiverId);
    return mokeSender.send(url, "GET");
}

const setNotificationHasBeenRead = (id: string): Promise<void> => {
    const url = mokeAPI.setNotificationHabBeenRead(id);
    return mokeSender.send(url, "POST");
}

export default {
    getNotificationsByReceiver,
    setNotificationHasBeenRead,
}