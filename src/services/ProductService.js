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
    
    add(model){
        let self = this;
        return self.axios.post(`${self.baseUrl}`, model);
    }

    get(id) {
        let self = this;
        return self.axios.get(`${self.baseUrl}/${id}`);
    }

    getExistingProduct(){
        let self = this;
        return self.axios.get(`${self.baseUrl}/existings`)
    }

    update(model) {
        let self = this;
        return self.axios.put(`${self.baseUrl}`, model);
    }

    remove(id){
        let self = this;
        return self.axios.delete(`${self.baseUrl}/${id}`);
    }

    getSoldOut(){
        let self = this;
        return self.axios.get(`${self.baseUrl}/sold-out`);
    }
    search(query){
        let self = this;
        return self.axios.get(`${self.baseUrl}/search?query=${query}`);
    }
}

export default ProductService