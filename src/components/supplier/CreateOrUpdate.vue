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
                    supplierId: 0,
                    name: '',
                    phone: '',
                    dni: '',
                    address: ''
                },
                ruleValidate: {
                    name: [
                        { required: true, message: 'Debes ingresar un Nombre', trigger: 'blur' }
                    ],
                    phone: [
                        { required: true, message: 'Debes ingresar el Telefono', trigger: 'blur' }
                    ],
                    dni: [
                        { required: true, message: 'Debes ingresar la Cedula', trigger: 'blur' }
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
                return self.form.supplierId === 0 ? 'Agregar Suplidores' : 'Editar Suplidor'; 
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
                self.$store.state.services.SupplierService
                .get(id)
                .then(r => {
                    self.loading = false;
                    
                    self.form.supplierId = r.data.supplierId
                    self.form.name = r.data.name
                    self.form.dni = r.data.dni
                    self.form.phone = r.data.phone
                    self.form.address = r.data.address
                    self.$Message.success('Suplidor Cargado');
                })
                .catch(r => {
                    self.$Message.error('Error!');
                });
            },
            save (form) {
                let self = this
                self.$refs[form].validate((valid) => {
                    if (valid) {
                        self.loading = true

                        if(self.form.supplierId > 0){
                        
                        self.$store.state.services.SupplierService
                        .update(self.form)
                        .then(r => {
                            self.loading = false;
                            
                            self.$router.push('/suppliers');
                            self.$Message.success('Suplidor Actualizado');
                        })
                        .catch(r => {
                            self.$Message.error('Error!');
                        });

                        } else {
                        
                        self.$store.state.services.SupplierService
                        .add(self.form)
                        .then(r => {
                            self.loading = false;
                            self.$Message.success('Agregado');
                            self.$router.push('/suppliers');
                        })
                        .catch(r => {
                            self.$Message.error('Error!');
                        });
                        
                        }
                    } else {
                        self.$Message.error('Error!');
                    }
                })
            },
            handleReset (form) {
                this.$refs[form].resetFields();
            }
        }
    }
</script>
