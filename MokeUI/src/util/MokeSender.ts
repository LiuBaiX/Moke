import axios from 'axios';
import qs from 'qs';

export default class MokeSender {
    public send = (url: string, method: string, data?: any): Promise<any> => {
        switch (method) {
            case 'GET': return axios.get(url);
            case 'PUT': return axios.put(url, qs.stringify(data));
            case 'POST': return axios.post(url, qs.stringify(data));
            case 'DELETE': return axios.delete(url);
            default: return Promise.resolve({ error: "error : Wrong method" });
        }
    }
}