<template>
    <div>
        <Row>
        <Col span="10">
        <h1>
            Detalle de la venta
            <Icon type="bag"></Icon>
        </h1>
        </Col>
    </Row>
    <br>
    <Form ref="form" :loading="loading" :model="form" :rules="ruleValidate" :label-width="80">
        <Row>
        
        <Col span="5">
            <FormItem label="Cliente" prop="nameC">
            <Input v-model="form.sale.client.name+ ' ' +form.sale.client.lastName" readonly></Input>
            </FormItem>
        </Col>
        
        </Row>

        <Row>
        <Col span="5">
            <FormItem label="Empleado" prop="nameE">
            <Input v-model="form.sale.user.name" readonly></Input>
            </FormItem>
        </Col>
        </Row>

        <Row>

        <Col span="4">
        <!-- <FormItem label="Descuento" prop="discount">
           <InputNumber :max="form.sale.discount" v-model="form.sale.discount"
            :formatter="value => `$ ${value}`.replace(/B(?=(d{3})+(?!d))/g, ',')"
            :parser="value => value.replace(/$s?|(,*)/g, '')"></InputNumber>
        </FormItem> -->
        
        </Col>

        <Col span="6">
        <FormItem label="Total" prop="Total">
           <InputNumber :max="form.sale.total" v-model="form.sale.total"
            :formatter="value => `$ ${value}`.replace(/B(?=(d{3})+(?!d))/g, ',')"
            :parser="value => value.replace(/$s?|(,*)/g, '')" readonly></InputNumber>
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
            <Button type="error" @click="redirect()" icon="ios-arrow-back">Regresar</Button>
            <Button type="success" @click="save(); pdf()" icon="ios-copy-outline">Imprimir</Button>
        </Col>   
        </FormItem>
        </Row>
    </Form>
    </div>
    
</template>
<script>
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
export default {
  data() {
    return {
      data: [],
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
      form: {
        products: [],
        sale: []
      }
    };
  },
  computed: {
    pageTitle() {
      let self = this;
      return "Agregar Venta";
    }
    // total: function(){
    //     let total = []
    //     Object.entries(this.products).forEach(([key, val])=> {
    //         total.push(val.subTotal);
    //     });
    //     return (this.form.total = total.reduce(function(total, num){
    //         return (total += Number(num))
    //     }), 0);
    // }
  },
  created() {
    let self = this;
    self.get(self.$route.params.id);
  },
  methods: {
    get(id) {
      if (id == undefined) return;

      let self = this;

      self.loading = true;
      self.$store.state.services.SaleService.get(id)
        .then(r => {
          self.loading = false;
          self.form.products = r.data.products;
          self.form.sale = r.data.sale;
        })
        .catch(r => {
          self.$Message.error("Error!");
        });
    },
    save() {
      let self = this;

      self.loading = true;

      self.$store.state.services.SaleService.add(self.form)
        .then(r => {
          self.loading = false;
          self.$Message.success("Agregado");
          self.$router.push("/sales");
        })
        .catch(r => {
          self.$Message.error("Error!");
        });
    },
    handleReset(form) {
      this.$refs[form].resetFields();
    },
    remove(index) {
      this.products.splice(index, 1);
    },
    redirect() {
      this.$router.push("/sales");
    },
    pdf() {
      let self = this;

      let doc = new jsPDF();
      doc.setFontSize(40);
      doc.text(20, 30, "Factura");
      doc.line(10, 50, 200, 50);
      doc.setFontSize(20);
      doc.text(130, 20, "Codigo: " + self.form.sale.saleId);
      doc.text(130, 40, "Fecha: " + self.form.sale.registerDate);
      doc.setFontSize(20);
      doc.text(10, 70, "Cliente: " + self.form.sale.client.name);
      doc.text(10, 85, "Vendedor: " + self.form.sale.client.name);
      doc.text(10, 100, "Correo: " + self.form.sale.client.email);
      doc.line(10, 115, 200, 115);
      doc.setFontSize(30);
      doc.text(10, 130, "Detalle de venta");
      doc.line(10, 50, 200, 50);

      doc.setFontSize(20);
      doc.text(130, 130, "Total : $" + self.form.sale.total);

      //add colunms in jtable
      let columns = [
       {title: "Codigo" , datakey:"productCode"},
       {title: "Nombre" , datakey:"name"},
       {title: "Cantidad" , datakey:"quantity"},
       {title: "Precio" , datakey:"pricePerSale"},
      ];

      try {
        //this row is when the object product 
        //is created and inserted into the table
        var rows = [];
        self.form.products.forEach(element => {
          rows.push([
            element.productCode,
            element.name,
            element.quantity,
            element.pricePerSale
          ]);
        });
        doc.autoTable(columns, rows, { margin: { top: 140 } });
        doc.save(`Factura-${self.form.sale.saleId}.pdf`);
      } catch (e) {
        alert(e);
      }
    }
  }
};
</script>
