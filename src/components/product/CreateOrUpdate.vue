<template>
    <div>
        <Row>
        <Col span="10">
        <h1>
            {{ pageTitle }}
            <Icon type="ios-box" />
            </h1>
            
        </h1>
        </Col>
    </Row>
    <br>
    <Form ref="form" :loading="loading" :model="form" :rules="ruleValidate" :label-width="80">
        <Row>
        <Col span="8">
        <FormItem label="Nombre" prop="name">
            <Input v-model="form.name" placeholder="Ingresa el nombre del producto"></Input>
        </FormItem>
        </Col>
        <Col span="8">
        <FormItem label="Codigo Producto" prop="productCode">
            <Input v-model="form.productCode" readonly></Input>
        </FormItem>
        </Col>

        <Col span="8">
        <FormItem label="Tipo Producto" prop="type">
            <Input v-model="form.type" placeholder="Ingrsa el Tipo del Producto"></Input>
        </FormItem>
        </Col>
        </Row>

        <Row>
        <Col span="8">
            <FormItem label="Cantidad" prop="quantity">
            <InputNumber :max="999" :min="1" v-model="form.quantity"></InputNumber>
        </FormItem>
        </Col>

        <Col span="8">
        <FormItem label="Precio Venta" prop="pricePerSale">
           <InputNumber :max="10000" v-model="form.pricePerSale"
            :formatter="value => `$ ${value}`.replace(/B(?=(d{3})+(?!d))/g, ',')"
            :parser="value => value.replace(/$s?|(,*)/g, '')"></InputNumber>
        </FormItem>
        
        </Col>

        <Col span="8">
        <FormItem label="Precio Compra" prop="pricePerPurchase">
           <InputNumber :max="10000" v-model="form.pricePerPurchase"
            :formatter="value => `$ ${value}`.replace(/B(?=(d{3})+(?!d))/g, ',')"
            :parser="value => value.replace(/$s?|(,*)/g, '')"></InputNumber>
        </FormItem>

        </Col>
          <SupplierList @getIdSelected="selectSupplierId"></SupplierList>
        </Row>
        
        <Row class="button">
          <Col span="12" offset="6">
                 <FormItem>
            <Button type="primary" @click="save('form')">Guardar</Button>
            <Button @click="handleReset('form')" style="margin-left: 8px">Limpiar Formulario</Button>
        </FormItem>
          </Col>
        </Row>
    </Form>
    </div>
    
</template>
<script>
import SupplierList from "@/components/product/SupplierList";

export default {
  components: { SupplierList },
  data() {
    return {
      loading: false,
      form: {
        productId: 0,
        supplierId: 0,
        name: "",
        productCode: `POD-${Math.random()
          .toString(22)
          .substring(7)
          .toUpperCase()}`,
        type: "",
        quantity: 1,
        pricePerSale: 10,
        pricePerPurchase: 10
      },
      ruleValidate: {
        name: [
          {
            required: true,
            message: "Debes ingresar un Nombre",
            trigger: "blur"
          }
        ],
        productCode: [
          {
            required: true,
            message: "Debes ingresar un Apellido",
            trigger: "blur"
          }
        ],
        type: [
          {
            required: true,
            message: "Debes ingresar el Tipo Producto",
            trigger: "blur"
          }
        ]
      }
    };
  },
  computed: {
    pageTitle() {
      let self = this;
      return self.form.productId === 0 ? "Agregar Producto" : "Editar Producto";
    }
  },
  created() {
    let self = this;
    self.get(self.$route.params.id);
  },
  methods: {
    selectSupplierId: function(value) {
      let self = this;
      self.form.supplierId = value;
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
          self.form.pricePerPurchase = r.data.pricePerPurchase;
          self.form.pricePerSale = r.data.pricePerSale;
          // self.$Message.success('Producto Cargado');
        })
        .catch(r => {
          self.$Notice.config({
            top: 70,
            duration: 2.6
          });
          self.$Notice.error({
            title: "Error",
            desc: "Al cargar datos del producto o no existe"
          });
        });
    },
    save(form) {
      let self = this;
      self.$refs[form].validate(valid => {
        if (valid) {
          self.loading = true;

          if (self.form.productId > 0) {
            self.$store.state.services.ProductService.update(self.form)
              .then(r => {
                self.loading = false;

                self.$router.push("/products");
                 self.$Notice.config({
                        top: 70,
                        duration: 2.6
                    });
                        self.$Notice.success({
                            title: 'Producto actualizado!',
                        });
              })
              .catch(r => {
                self.$Notice.error("Error!");
              });
          } else {
            self.$store.state.services.ProductService.add(self.form)
              .then(r => {
                self.loading = false;
                self.$Notice.config({
                  top: 70,
                  duration: 2.6
                });
                self.$Notice.success({
                  title: "Producto agregado!",
                });
                self.$router.push("/products");
              })
              .catch(r => {
                self.$Notice.config({
                  top: 70,
                  duration: 2.6
                });
                self.$Notice.error({
                  title: "Error!",
                  desc: "Al agregar producto"
                });
              });
          }
        } else {
          self.$Notice.config({
            top: 70,
            duration: 2.6
          });
          self.$Notice.error({
            title: "Error!",
            desc: "Revise los campos"
          });
        }
      });
    },
    handleReset(form) {
      this.$refs[form].resetFields();
    }
  }
};
</script>
<style>
.button {
  padding: 5%;
}
</style>

