import axios, { AxiosResponse } from 'axios';
import qs from 'qs';



const mapResponseToData = (response: AxiosResponse) => {
    return response.data;
}

export default class MokeSender {
    public send = (url: string, method: string, data?: any): Promise<any> => {
        switch (method) {
            case 'GET': return axios.get(url).then((response: AxiosResponse) => {
                return mapResponseToData(response);
            });
            case 'PUT': return axios.put(url, qs.stringify(data)).then((response: AxiosResponse) => {
                return mapResponseToData(response);
            });
            case 'POST': return axios.post(url, qs.stringify(data)).then((response: AxiosResponse) => {
                return mapResponseToData(response);
            });
            case 'DELETE': return axios.delete(url).then((response: AxiosResponse) => {
                return mapResponseToData(response);
            });
            default: return Promise.resolve({ error: "error : Wrong method" });
        }
    }
}