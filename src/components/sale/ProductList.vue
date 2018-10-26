<template>
<div>
        <Modal
        v-model="modalP"
        title="Productos"
        @on-ok="ok"
        @on-cancel="cancel">
        <Table border :columns="columns" :data="data"></Table>
        </Modal>

        <Button @click="modalP = true" type="primary" icon="ios-search"></Button>  

        </div>  
</template>

<script>
    export default {
        data(){
            return {
                modalP: false,
                data: [],
                products: '',
                q: 0,
                quantity: 0,
                loading: false,
                columns: [{
                    title: 'Name',
                    key: 'name',
                },
                {
                    title: 'Cantidad',
                    key: 'quantity',
                    render: (h, params) => {
                        return h('div', [
                            h('Input', {
                                props: {
                                    type: 'number',
                                    min: 1,
                                    max: parseInt(this.q),
                                    value: parseInt(this.data[params.index].quantity),
                                    editable: false
                                },
                                style: {
                                    width: '40%'
                                },
                                on: {
                                    input: (value) => {
                                    this.q = value
                                    }
                                }
                            }), 
                        ]);
                    }
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
                                    icon: 'plus'
                                },
                                style: {
                                    marginRight: '5px'
                                },
                                on: {
                                    click: () => {
                                        this.modalP = false
                                        this.show(params.index)
                                    }
                                }
                            }), 
                        ]);
                    }
                }
            ],
            }
        },
    created() {
    let product = this
    product.getExistingProduct()
    },
    methods: {
        getExistingProduct(){
            let product = this
            product.loading = true
            product.$store.state.services.ProductService
            .getExistingProduct()
            .then(p => {
                product.loading = false
                product.data = p.data
            })
            .catch(e =>{
                
            })
        },
        getId(value){
            let self = this
            self.$emit('getIdSelected', value)
        },
        show(index){
            let self = this
            if(self.q == 0){
                self.quantity = self.data[index].quantity;
            }
            if(self.q != 0){
                self.quantity = self.q;
            }
            self.$emit('getIdSelected', 
            self.data[index].name, 
            self.data[index].productId, 
            self.quantity,
            self.data[index].quantity,
            self.data[index].pricePerSale,
            self.data[index].productCode,
            self.data[index].type,
            self.data[index].pricePerPurchase,
            self.data[index].supplierId
            )    
        }
    },
}
</script>