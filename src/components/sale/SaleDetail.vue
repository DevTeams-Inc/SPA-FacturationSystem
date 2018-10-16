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
        <FormItem label="Descuento" prop="discount">
           <InputNumber :max="form.sale.discount" v-model="form.sale.discount"
            :formatter="value => `$ ${value}`.replace(/B(?=(d{3})+(?!d))/g, ',')"
            :parser="value => value.replace(/$s?|(,*)/g, '')"></InputNumber>
        </FormItem>
        
        </Col>

        <Col span="6">
        <FormItem label="Sub Total" prop="subTotal">
           <InputNumber :max="form.sale.subTotal" v-model="form.sale.subTotal"
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
            <Button type="primary" @click="save()">Agregar Venta</Button>
        </Col>    
        </FormItem>
        </Row>
    </Form>
    </div>
    
</template>
<script>
    export default {
        data () {
            return {
                data: [],
                modal1: false,
                loading: false,
                columns: [{
                    title: 'Producto',
                    key: 'name'
                },
                {
                    title: 'Cantidad',
                    key: 'quantity'
                },
                {
                    title: 'Precio',
                    key: 'pricePerSale'
                }, 
                {
                    title: 'SubTotal',
                    key: 'subTotal'
                },
                {
                    title: 'Opciones',
                    key: 'action',
                    width: 150,
                    align: 'center',
                    render: (h, params) => {
                        return h('div', [
                            h('Button', {
                                props: {
                                    type: 'primary',
                                    size: 'small',
                                    icon: 'search'
                                },
                                style: {
                                    marginRight: '5px'
                                },
                                on: {
                                    click: () => {
                                        this.show(params.index)
                                    }
                                }
                            }),
                            h('Button', {
                                props: {
                                    type: 'error',
                                    size: 'small',
                                    icon: 'close'
                                },
                                style: {
                                    marginRight: '5px'
                                },
                                on: {
                                    click: () => {
                                        this.remove(params.index)
                                    }
                                }
                            }),
                            h('Button', {
                                props: {
                                    type: 'success',
                                    size: 'small',
                                    icon: 'edit'
                                },
                                on: {
                                    click: () => {
                                        this.edit(params.index)
                                    }
                                }
                            })
                        ]);
                    }
                }
            ],
                form: {
                    products:[],
                    sale: []
                },
            
            }
        },
        computed: {
            pageTitle() {
              let self = this 
                return  'Agregar Venta'; 
            },
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
            let self = this
            self.get(self.$route.params.id)
        },
        methods: {
            get(id){
                if(id == undefined) return;

                let self = this
                
                self.loading = true
                self.$store.state.services.SaleService
                .get(id)
                .then(r => {
                    self.loading = false;
                    self.form.products = r.data.products;
                    self.form.sale = r.data.sale;
                })
                .catch(r => {
                    self.$Message.error('Error!');
                });
            },
            save () {
                let self = this
            
                self.loading = true 
                    
                    self.$store.state.services.SaleService
                    .add(self.form)
                    .then(r => {
                        self.loading = false;
                        self.$Message.success('Agregado');
                        self.$router.push('/sales');
                    })
                    .catch(r => {
                        self.$Message.error('Error!');
                    });
                        
            },
            handleReset (form) {
                this.$refs[form].resetFields();
            },
            remove (index) {
                this.products.splice(index, 1);
            }
        }
    }
</script>
