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
                q: '',
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
                                    value: this.data[params.index].quantity
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
    product.getAll()
    },
    methods: {
        getAll(){
            let product = this
            product.loading = true
            product.$store.state.services.ProductService
            .getAll()
            .then(p => {
                product.loading = false
                product.data = p.data
            })
            .catch()
        },
        getId(value){
            let self = this
            self.$emit('getIdSelected', value)
        },
        show(index){
            let self = this
            self.$emit('getIdSelected', 
            self.data[index].name, 
            self.data[index].productId, 
            self.q,
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