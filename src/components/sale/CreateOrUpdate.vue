<template>
    <div>
        <Row>
        <Col span="10">
        <h1>
            {{ pageTitle }}
            <Icon type="bag"></Icon>
        </h1>
        </Col>
    </Row>
    <br>
    <Form ref="form" :loading="loading" :model="form" :rules="ruleValidate" :label-width="80">
        <Row>
        <Col span="5">
            <FormItem label="Cliente" prop="nameC">
            <Input v-model="nameC" readonly></Input>
            </FormItem>
        </Col>
        <Col span="3" offset="1">
            <ClientList @getClientSelected="selectClient"></ClientList>
        </Col>
        <Col span="5">
            <FormItem label="Producto" prop="nameP">
            <Input v-model="nameP" readonly></Input>
            </FormItem>
        </Col>
        <Col span="5" offset="1">
            <ProductList @getIdSelected="selectProductId"></ProductList>
        </Col>
        </Row>
        <Row>
        <Col span="5">
            <FormItem label="Empleado" prop="nameE">
            <Input v-model="nameE" readonly></Input>
            </FormItem>
        </Col>
        <Col span="5" offset="1">
            <EmployeeList @getEmployeeSelected="selectEmployee"></EmployeeList>
        </Col>
        </Row>
        <Row>
        </Col>
        <Col span="4">
        <!-- El descuento es el itbis es un nuevo cambio
         -->
        <FormItem label="Itbis" prop="discount">
        <Input v-model="form.sale.discount" readonly ></Input>
        </FormItem>
        
        </Col>

        <Col span="6">
            <FormItem label="Total" prop="total">
            <Input v-model="form.sale.total" readonly ></Input>
            </FormItem>
        </Col>
        </Row>
        <Row>
            <Table border :columns="columns" :data="form.products"></Table>
        </Row>
        <Row>
        <br>
        <FormItem>
        <Col span="6" offset="6">
            <Button type="primary" @click="save()">Agregar Venta</Button>
        </Col>    
        </FormItem>
        </Row>
    </Form>
    </div>
</template>
<script>
import { EventBus } from '@/event-bus.js';

import ClientList from "@/components/sale/ClientList";
import ProductList from "@/components/sale/ProductList";
import EmployeeList from "@/components/sale/EmployeeList";
export default {
  components: { ClientList, ProductList, EmployeeList },
  data() {
    return {
      modal1: false,
      loading: false,
      columns: [
        {
          title: "Producto",
          key: "name"
        },
        {
          title: "Cantidad",
          key: "quantity"
        },
        {
          title: "Precio",
          key: "pricePerSale"
        },
        {
          title: "SubTotal",
          key: "subTotal"
        },
        {
          title: "Opciones",
          key: "action",
          width: 150,
          align: "center",
          render: (h, params) => {
            return h("div", [
              h("Button", {
                props: {
                  type: "primary",
                  size: "small",
                  icon: "search"
                },
                style: {
                  marginRight: "5px"
                },
                on: {
                  click: () => {
                    this.show(params.index);
                  }
                }
              }),
              h("Button", {
                props: {
                  type: "error",
                  size: "small",
                  icon: "close"
                },
                style: {
                  marginRight: "5px"
                },
                on: {
                  click: () => {
                    this.remove(params.index);
                  }
                }
              }),
              h("Button", {
                props: {
                  type: "success",
                  size: "small",
                  icon: "edit"
                },
                on: {
                  click: () => {
                    this.edit(params.index);
                  }
                }
              })
            ]);
          }
        }
      ],
      nameE: "",
      nameP: "",
      nameC: "",
      type: "",
      form: {
        sale: {
          clientId: 0,
          saleId: 0,
          userId: 0,
          discount: 0,
          subTotal: 10,
          total: 0
        },
        products: []
      },
      productId: 0,
      supplierId: 0,
      quantity: 0,
      quantityProduct: 0,
      pricePerPurchase: 10,
      total: 10,
      ruleValidate: {
        nameE: [
          { required: true, message: "Ingresa el Empleado", trigger: "blur" }
        ],
        nameC: [
          { required: true, message: "Ingresa el Cliente", trigger: "blur" }
        ],
        type: [
          {
            required: true,
            message: "Debes ingresar el Tipo Producto",
            trigger: "blur"
          }
        ],
        nameP: [
          { required: true, message: "Ingresa el Producto", trigger: "blur" }
        ]
      }
    };
  },
  computed: {
    pageTitle() {
      let self = this;
      return "Agregar Venta";
    }
  },
  created() {
    let self = this;
    self.get(self.$route.params.id);
  },
  methods: {
    selectClient: function(name, clientId) {
      let self = this;
      self.nameC = name;
      self.form.sale.clientId = clientId;
    },
    selectProductId: function(
      name,
      productId,
      quantity,
      quantityProduct,
      pricePerSale,
      productCode,
      type,
      pricePerPurchase,
      supplierId
    ) {
      let self = this;
      self.nameP = name;
      self.form.products.productId = productId;
      self.form.products.quantity = quantity;
      self.quantityProduct = quantityProduct;
      self.form.products.pricePerSale = pricePerSale;
      self.form.products.supplierId = supplierId;
      self.form.quantityN = quantity;
      function productExist(productId) {
        return self.form.products.some(function(p) {
          return p.productId == productId;
        });
      }
      if (!productExist(productId)) {
        self.form.products.push({
          productId: productId,
          name: name,
          quantity: quantity,
          pricePerSale: pricePerSale,
          subTotal: quantity * pricePerSale,
          productCode: productCode,
          type: type,
          pricePerPurchase: pricePerPurchase,
          supplierId: supplierId
        });
      } else {
        self.$Notice.error({
            title: 'Este Producto ya Existe',
            desc: ''
        });
      }
      //add total of sale
      let cal = (quantity * pricePerSale);
      let itbis = (16 * ( (cal) / 100) );
      this.form.sale.discount += itbis;
      this.form.sale.total += (cal + itbis);
    },
    selectEmployee: function(name, employeeId) {
      let self = this;
      self.nameE = name;
      self.form.sale.userId = employeeId;
    },
    get(id) {
      if (id == undefined) return;
      let self = this;
      self.loading = true;
      self.$store.state.services.ProductService.get(id)
        .then(r => {
          self.loading = false;
          self.form.supplierId = r.data.supplierId;
          self.form.productId = r.data.productId;
          self.form.name = r.data.name;
          self.form.productCode = r.data.productCode;
          self.form.type = r.data.type;
          self.form.quantity = r.data.quantity;
          self.form.quantityN = r.data.quantity;
          self.form.pricePerPurchase = r.data.pricePerPurchase;
          self.form.discount = r.data.discount;
          self.$Notice.success({
            title: 'Producto Cargado',
            desc: ''
        });
        })
        .catch(e => {
            self.$Notice.error({
              title: 'Error',
              desc: ''
          });
        });
    },
    save() {
      let self = this;
      self.loading = true;
      self.$store.state.services.SaleService.add(self.form)
        .then(r => {
          self.loading = false;
          self.$Notice.success({
            title: 'Venta Realizada',
            desc: ''
        });
          EventBus.$emit('get')
          self.$router.push("/sales");
        })
        .catch(e => {
          self.$Notice.error({
            title: 'Error',
            desc: ''
          });
        });
    },
    handleReset(form) {
      this.$refs[form].resetFields();
    },
    remove(index) {
        let price = this.form.products[index].pricePerSale;
        let qyt = this.form.products[index].quantity;
        let pQ = price * qyt;
        let itbs = (16 * ( (pQ) / 100));
        let total = itbs + pQ;
        this.form.sale.total -= total;
        this.form.sale.discount -= itbs;
        if(this.form.products.length == 1){
          this.form.sale.total = 0;
          this.form.sale.discount = 0;
        }
      this.form.products.splice(index, 1);
    }
  }
};
</script>
