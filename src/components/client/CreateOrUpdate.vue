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
        <FormItem label="Apellido" prop="lastName">
            <Input v-model="form.lastName" placeholder="Ingresa el apellido"></Input>
        </FormItem>
        </Col>
        <Col span="7">
        <FormItem label="E-mail" prop="email">
            <Input v-model="form.email" placeholder="Ingresa el Email"></Input>
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

        <Col span="7">
            <FormItem label="Sexo" prop="sex">
            <RadioGroup v-model="form.sex">
                <Radio label="Masculino">Masculino</Radio>
                <Radio label="Femenino">Femenino</Radio>
            </RadioGroup>
            </FormItem>
        </Col>

        </Row>

        <Col span="8">
        <FormItem label="Direccion" prop="address">
            <Input v-model="form.address" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="Ingresa la direccion"></Input>
        </FormItem>
        <FormItem>
            <Button type="primary" @click="save('form')">Guardar</Button>
            <Button @click="handleReset('form')" style="margin-left: 8px">Limpiar Formulario</Button>
        </FormItem>
        </Col>
    </Form>
    </div>
    
</template>
<script>
    export default {
        data () {
            return {
                loading: false,
                form: {
                    clientId: 0,
                    name: '',
                    lastName: '',
                    email: '',
                    phone: '',
                    dni: '',
                    sex: '',
                    address: ''
                },
                ruleValidate: {
                    name: [
                        { required: true, message: 'Debes ingresar un Nombre', trigger: 'blur' }
                    ],
                    lastName: [
                        { required: true, message: 'Debes ingresar un Apellido', trigger: 'blur' }
                    ],
                    email: [
                        { required: true, message: 'Debes ingresar un email', trigger: 'blur' },
                        { type: 'email', message: 'Formato de email incorrecto', trigger: 'blur' }
                    ],
                    phone: [
                        { required: true, message: 'Debes ingresar el Telefono', trigger: 'blur' }
                    ],
                    dni: [
                        { required: true, message: 'Debes ingresar la Cedula', trigger: 'blur' }
                    ],
                    sex: [
                        { required: true, message: 'Por favor selecciona un sexo', trigger: 'change' }
                    ],
                    address: [
                        { required: true, message: 'Debes ingresar la direccion', trigger: 'blur' },
                        { type: 'string', min: 10, message: 'Debes ingresar al menos 10 caracteres', trigger: 'blur' }
                    ]
                }
            }
        },
        computed: {
            pageTitle() {
              let self = this 
                return self.form.clientId === 0 ? 'Agregar Clientes' : 'Editar Cliente'; 
            }
        },
        created() {
            let self = this
            self.get(self.$route.params.id)
        },
        methods: {
            get(id){
                if(id == undefined) return;

                let self = this
                
                self.loading = true
                self.$store.state.services.ClientService
                .get(id)
                .then(r => {
                    self.loading = false;
                    
                    self.form.clientId = r.data.clientId
                    self.form.name = r.data.name
                    self.form.lastName = r.data.lastName
                    self.form.email = r.data.email
                    self.form.dni = r.data.dni
                    self.form.phone = r.data.phone
                    self.form.sex = r.data.sex
                    self.form.address = r.data.address
                    self.$Notice.info({
                    title: 'Cliente Cargado',
                    desc: ''
                    });
                })
                .catch(r => {
                    self.$Notice.error({
                    title: 'Error',
                    desc: ''
                    });
                });
            },
            save (form) {
                let self = this
                self.$refs[form].validate((valid) => {
                    if (valid) {
                        self.loading = true

                        if(self.form.clientId > 0){
                        
                        self.$store.state.services.ClientService
                        .update(self.form)
                        .then(r => {
                            self.loading = false;
                            
                            self.$router.push('/clients');
                            self.$Notice.success({
                                title: 'Cliente Actualizado',
                                desc: ''
                            });
                        })
                        .catch(r => {
                            self.$Notice.error({
                                title: 'Error',
                                desc: ''
                            });
                        });

                        } else {
                        
                        self.$store.state.services.ClientService
                        .add(self.form)
                        .then(r => {
                            self.loading = false;
                            self.$Notice.success({
                                title: 'Cliente Agregado',
                                desc: ''
                            });
                            self.$router.push('/clients');
                        })
                        .catch(r => {
                            self.$Notice.error({
                                title: 'Error',
                                desc: ''
                            });
                        });
                        
                        }
                    } else {
                        self.$Notice.error({
                                title: 'Error',
                                desc: ''
                            });
                    }
                })
            },
            handleReset (form) {
                this.$refs[form].resetFields();
            }
        }
    }
</script>
