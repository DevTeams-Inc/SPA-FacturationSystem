class ClientService {
    axios
    baseUrl

    constructor(axios, apiUrl){
        this.axios = axios
        this.baseUrl = `${apiUrl}clients`
    }

    getAll() {
        let self = this;
        return self.axios.get(`${self.baseUrl}`);
    }

    get(id) {
        let self = this;
        return self.axios.get(`${self.baseUrl}/${id}`);
    }

    add(model) {
        let self = this;
        return self.axios.post(`${self.baseUrl}`, model);
    }

    update(model) {
        let self = this;
        return self.axios.put(`${self.baseUrl}`, model);
    }

    remove(id){
        let self = this;
        return self.axios.delete(`${self.baseUrl}/${id}`);
    }

    search(query){
        let self = this;
        return self.axios.get(`${self.baseUrl}/search?query=${query}`);
    }
}

export default ClientService