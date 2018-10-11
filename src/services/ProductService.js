class ProductService {
    axios
    baseUrl

    constructor(axios, apiUrl){
        this.axios = axios
        this.baseUrl = `${apiUrl}products`
    }

    getAll() {
        let self = this;
        return self.axios.get(`${self.baseUrl}`);
    }

<<<<<<< HEAD
    getProductQ() {
        let self = this;
        return self.axios.get(`${self.baseUrl}/GetProduct`);
    }
=======
    // getProductQ() {
    //     let self = this;
    //     return self.axios.get(`${self.baseUrl}/GetProduct`);
    // }
>>>>>>> 472f8a39198cb07fbf0529f56e204e265db77da8

    add(model){
        let self = this;
        return self.axios.post(`${self.baseUrl}`, model);
    }

    get(id) {
        let self = this;
        return self.axios.get(`${self.baseUrl}/${id}`);
    }

    update(model) {
        let self = this;
        return self.axios.put(`${self.baseUrl}`, model);
    }

    remove(id){
        let self = this;
        return self.axios.delete(`${self.baseUrl}/${id}`);
    }
}

export default ProductService