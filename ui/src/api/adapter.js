import axios from 'axios';

class Api {
    constructor() {
        this.adapter = axios.create({
            baseURL: 'http://localhost:9000'
        });

        this.requestType = {
            GET: 'get',
            POST: 'post',
            DELETE: 'delete',
            PATCH: 'patch' 
        }
    }

    makeRequest(url, type, payload) {
        return this.adapter[type](url, payload);
    }
}

export default new Api();