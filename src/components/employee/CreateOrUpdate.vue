<template>
    <div>
        <Row>
        <Col span="10">
        <h1>
            {{ pageTitle }}
            <Icon type="person"></Icon>
        </h1>
        </Col>
    </Row>
    <br>
    <Form ref="form" :loading="loading" :model="form" :rules="ruleValidate" :label-width="80">
        <Row>
        <Col span="7">
        <FormItem label="Nombre" prop="name">
            <Input v-model="form.name" placeholder="Ingresa el Nombre"></Input>
        </FormItem>
        </Col>
        <Col span="7">
        <FormItem label="Usuario" prop="userName">
            <Input v-model="form.userName" placeholder="Ingresa el nombre de usuario"></Input>
        </FormItem>
        </Col>
       
<Col span="7">
        <FormItem label="Contraseña" prop="password">
            <Input type="password" v-model="form.password"></Input>
        </FormItem>
        </Col>
        <Col span="7">
        <FormItem label="Telefono" prop="phone">
            <Input v-model="form.phone" placeholder="Ingresa el Telefono"></Input>
        </FormItem>
        </Col>

        <Col span="7">
            <FormItem label="Rol" prop="role">
            <Select v-model="form.role" placeholder="Seleccione el Rol">
                <Option value="1">Administrador</Option>
                <Option value="2">Moderador</Option>
                <Option value="3">Empleado</Option>
            </Select>
        </FormItem>
        </Col>
 <Col span="7">
        <FormItem label="Repite la Contraseña" prop="passwdCheck">
            <Input type="password" v-model="form.passwdCheck"></Input>
        </FormItem>
        </Col>
         <Col span="7">
        <FormItem label="E-email" prop="email">
            <Input v-model="form.email" placeholder="Ingresa el Email"></Input>
        </FormItem>
        </Col>

       

        </Row >
        <Row class="button">
              <Col span="12" offset="6">
               <FormItem>
                <Button type="primary" @click="save('form')">Guardar</Button>
                <Button @click="handleReset('form')" style="margin-left: 8px">Limpiar Formulario</Button>
            </FormItem>
              </Col>
        </Row>
    </Form>
            <div>
              <Button class="backp" @click="redirect()" icon="ios-arrow-back">Back</Button>
           </div>
    </div>
    
</template>
<script>
export default {
  data() {
    return {
      loading: false,
      form: {
        userId: 0,
        name: "",
        userName: "",
        email: "",
        phone: "",
        password: "",
        role: ""
      },
      ruleValidate: {
        name: [
          {
            required: true,
            message: "Debes ingresar un nombre",
            trigger: "blur"
          }
        ],
        userName: [
          {
            required: true,
            message: "Debes ingresar un nombre de usuario",
            trigger: "blur"
          }
        ],
        email: [
          {
            required: true,
            message: "Debes ingresar un email",
            trigger: "blur"
          },
          {
            type: "email",
            message: "Formato de email incorrecto",
            trigger: "blur"
          }
        ],
        phone: [
          {
            required: true,
            message: "Debes ingresar el telefono",
            trigger: "blur"
          }
        ],
        password: [
          {
            required: true,
            message: "Debes ingresar la contraseña",
            trigger: "blur"
          }
        ],
        role: [
          {
            required: true,
            message: "Debes selecciona un rol",
            trigger: "change"
          }
        ],
        passwdCheck: [
          {
            required: true,
            message: "Debes repertir la contraseña",
            trigger: "blur"
          }
        ]
      }
    };
  },
  computed: {
    pageTitle() {
      let self = this;
      return self.form.userId === 0 ? "Agregar Empleados" : "Editar Empleado";
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
      self.$store.state.services.EmployeeService.get(id)
        .then(r => {
          self.loading = false;

          self.form.userId = r.data.userId;
          self.form.name = r.data.name;
          self.form.userName = r.data.userName;
          self.form.email = r.data.email;
          self.form.phone = r.data.phone;
          self.form.role = r.data.role;
          self.form.password = r.data.password;
          // self.$Notice.success({
          //     title: 'Empleado Cargado',
          //     desc: ''
          // });
        })
        .catch(e => {
          self.$Notice.error({
            title: "error.",
            desc: ""
          });
        });
    },
    save(form) {
      let self = this;
      self.$refs[form].validate(valid => {
        if (valid) {
          self.loading = true;

          if (self.form.userId > 0) {
            self.$store.state.services.EmployeeService.update(self.form)
              .then(r => {
                self.loading = false;

                self.$router.push("/employees");
                self.$Notice.success({
                  title: "Empleado Actualizado",
                  desc: ""
                });
              })
              .catch(e => {
                self.$Notice.error({
                  title: "error.",
                  desc: ""
                });
              });
          } else {
            self.$store.state.services.EmployeeService.add(self.form)
              .then(r => {
                self.loading = false;
                self.$Notice.success({
                  title: "Empleado Agregado",
                  desc: ""
                });
                self.$router.push("/employees");
              })
              .catch(e => {
                self.$Notice.error({
                  title: "error.",
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
    },
    redirect() {
      this.$router.push("/employees");
    }
  }
};
</script>
<style>
.button {
  padding: 5%;
}
.backe {
  position: relative;
  float: right;
  background-color: #515a6e;
  color: aliceblue;
  top: 22px;
}
.backe:hover {
  background-color: #747b8b;
  color: white;
  outline: none;
}
</style>