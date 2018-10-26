import Axios from 'axios'
import ClientService from '../services/ClientService'
import EmployeeService from '../services/EmployeeService'
import ProductService from '../services/ProductService'
import SupplierService from '../services/SupplierService'
import SaleService from '../services/SaleService'

//  let apiUrl = 'http://192.168.83.241:45455/'
//let apiUrl = 'http://localhost:62432/';
let apiUrl = "http://192.168.99.169:45455/"; //devTe

// Axios Configuration
Axios.defaults.headers.common.Accept = 'application/json'

export default {
    ClientService: new ClientService(Axios, apiUrl),
    EmployeeService: new EmployeeService(Axios, apiUrl),
    ProductService: new ProductService(Axios, apiUrl),
    SupplierService: new SupplierService(Axios, apiUrl),
    SaleService: new SaleService(Axios, apiUrl)
}