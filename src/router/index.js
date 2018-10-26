import Vue from 'vue'
import Router from 'vue-router'
import Dashboard from '../components/Dashboard'

import Client from '../components/client/Client'
import ClientCreateOrUpdate from '../components/client/CreateOrUpdate'

import Supplier from '../components/supplier/Supplier'
import SupplierCreateOrUpdate from '../components/supplier/CreateOrUpdate'

import Employee from '../components/employee/Employee'
import EmployeeCreateOrUpdate from '../components/employee/CreateOrUpdate'

import Product from '../components/product/Product'
import ProductCreateOrUpdate from '../components/product/CreateOrUpdate'

import Sale from '../components/sale/Sale'
import SaleCreateOrUpdate from '../components/sale/CreateOrUpdate'
import SaleDetail from '../components/sale/SaleDetail'

import Bill from '../components/bill/Bill'

import SoldOut from '../components/product/SoldOut'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Dashboard',
      component: Dashboard,
      meta: {
        breadcrumb: [
          { name: 'Dashboard' }
        ]
      }
    },
    {
      path: '/clients',
      name: 'Clientes',
      component: Client
    },
    {
      path: '/clients/add',
      name: 'Agregar Cliente',
      component: ClientCreateOrUpdate
    },
    {
      path: '/clients/:id/edit',
      name: 'Editar Cliente',
      component: ClientCreateOrUpdate
    },
    {
      path: '/suppliers',
      name: 'Suplidores',
      component: Supplier
    },
    {
      path: '/suppliers/add',
      name: 'Agregar Suplidor',
      component: SupplierCreateOrUpdate
    },
    {
      path: '/suppliers/:id/edit',
      name: "Editar Suplidor",
      component: SupplierCreateOrUpdate
    },
    {
      path: '/employees',
      name: 'Empleados',
      component: Employee
    },
    {
      path: '/employees/add',
      name: 'Agregar Empleado',
      component: EmployeeCreateOrUpdate
    },
    {
      path: '/employees/:id/edit',
      name: 'Editar Empleado',
      component: EmployeeCreateOrUpdate
    },
    {
      path: '/products',
      name: 'Productos',
      component: Product
    },
    {
      path: '/products/:id/edit',
      name: 'Editar Producto',
      component: ProductCreateOrUpdate
    },
    {
      path: '/products/add',
      name: 'Agregar Producto',
      component: ProductCreateOrUpdate
    },
    {
      path: '/sales',
      name: 'Ventas',
      component: Sale
    },
    {
      path: '/sales/add',
      name: 'Agregar Venta',
      component: SaleCreateOrUpdate
    },
    {
      path: '/sales/:id/detail',
      name: 'Detalle de la Venta',
      component: SaleDetail
    },
    {
      path: '/bills',
      name: 'Facturas',
      component: Bill
    },
    {
      path: '/sold-out',
      name: 'Agotado',
      component: SoldOut
    }
  ]
})
