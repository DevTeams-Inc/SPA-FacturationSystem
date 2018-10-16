import Axios from 'axios'
import ClientService from '../services/ClientService'
import EmployeeService from '../services/EmployeeService'
import ProductService from '../services/ProductService'
import SupplierService from '../services/SupplierService'
import SaleService from '../services/SaleService'

let apiUrl = 'http://192.168.99.169:45455/'
<<<<<<< HEAD

=======
>>>>>>> 04b44951d33f66da7463e126223112b15e80abe8

// Axios Configuration
Axios.defaults.headers.common.Accept = 'application/json'

export default {
    ClientService: new ClientService(Axios, apiUrl),
    EmployeeService: new EmployeeService(Axios, apiUrl),
    ProductService: new ProductService(Axios, apiUrl),
    SupplierService: new SupplierService(Axios, apiUrl),
    SaleService: new SaleService(Axios, apiUrl)
}