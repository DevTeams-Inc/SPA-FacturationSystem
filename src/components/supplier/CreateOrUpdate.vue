<template>
    <div>
        <Row>
        <Col span="10">
        <h1>
            {{ pageTitle }}
            <Icon type="ios-person-outline" /> 
        </h1>
        </Col>
    </Row>
    <br>
    <Form ref="form" :loading="loading" :model="form" :rules="ruleValidate" :label-width="80">
        <Row>
        <Col span="7">
        <FormItem label="Nombre" prop="name">
            <Input v-model="form.name" placeholder="Ingresa el nombre"></Input>
        </FormItem>
        </Col>

        <Col span="7">
        <FormItem label="Cedula" prop="dni">
            <Input v-model="form.dni" placeholder="Ingresa la Cedula"></Input>
        </FormItem>
        </Col>

        <Col span="7">
        <FormItem label="Telefono" prop="phone">
            <Input v-model="form.phone" placeholder="Ingresa el Telefono"></Input>
        </FormItem>
        </Col>
        <Col span="8">
        <FormItem label="Direccion" prop="address">
            <Input v-model="form.address" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="Ingresa la direccion"></Input>
        </FormItem>
        </Col>

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
export default {
  data() {
    return {
      loading: false,
      form: {
        supplierId: 0,
        name: "",
        phone: "",
        dni: "",
        address: ""
      },
      ruleValidate: {
        name: [
          {
            required: true,
            message: "Debes ingresar un Nombre",
            trigger: "blur"
          }
        ],
        phone: [
          {
            required: true,
            message: "Debes ingresar el Telefono",
            trigger: "blur"
          }
        ],
        dni: [
          {
            required: true,
            message: "Debes ingresar la Cedula",
            trigger: "blur"
          }
        ],
        address: [
          {
            required: true,
            message: "Debes ingresar la direccion",
            trigger: "blur"
          },
          {
            type: "string",
            min: 10,
            message: "Debes ingresar al menos 10 caracteres",
            trigger: "blur"
          }
        ]
      }
    };
  },
  computed: {
    pageTitle() {
      let self = this;
      return self.form.supplierId === 0
        ? "Agregar Suplidores"
        : "Editar Suplidor";
    }
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
      self.$store.state.services.SupplierService.get(id)
        .then(r => {
          self.loading = false;

          self.form.supplierId = r.data.supplierId;
          self.form.name = r.data.name;
          self.form.dni = r.data.dni;
          self.form.phone = r.data.phone;
          self.form.address = r.data.address;
          self.$Notice.success({
            title: "Suplidor Cargado",
            desc: ""
          });
        })
        .catch(r => {
          self.$Notice.success({
            title: "Error",
            desc: ""
          });
        });
    },
    save(form) {
      let self = this;
      self.$refs[form].validate(valid => {
        if (valid) {
          self.loading = true;

          if (self.form.supplierId > 0) {
            self.$store.state.services.SupplierService.update(self.form)
              .then(r => {
                self.loading = false;
                self.$router.push("/suppliers");
                self.$Notice.success({
                  title: "Suplidor Actualizado",
                  desc: ""
                });
              })
              .catch(e => {
                self.$Notice.error({
                  title: "Error",
                  desc: ""
                });
              });
          } else {
            self.$store.state.services.SupplierService.add(self.form)
              .then(r => {
                self.loading = false;
                self.$Notice.success({
                  title: "Suplidor Agregado",
                  desc: ""
                });
                self.$router.push("/suppliers");
              })
              .catch(e => {
                self.$Notice.error({
                  title: "Error",
                  desc: ""
                });
              });
          }
        } else {
          self.$Notice.config({
            top: 70,
            duration: 2.6
          });
          self.$Notice.error({
            title: "Error",
            desc: "Revisar los campos."
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
.button{
 padding: 5%;
}
</style>

