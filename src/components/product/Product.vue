<template>
<div>
    <Row>
        <Col span="10">
        <h1>Productos
            <Icon type="ios-box" /></h1>
        </Col>
        <Col span="2" offset="9">
        <Button @click="redirect('/products/add')" type="info"><h3>Agregar Producto <Icon type="ios-box"></Icon></h3></Button>
        </Col>
    </Row>
    <br>
    <Table border :loading="loading" :columns="columns" :data="data"></Table>
    <br>
    <Col span="10" offset="8">
    <Page :total="100" prev-text="Previous" next-text="Next" />
    </Col>
</div>
</template>
<script>

export default {
    data() {
        return {
            data:[],
            loading: false,
            columns: [{
                    title: 'Name',
                    key: 'name'
                },
                {
                    title: 'COD',
                    key: 'productCode'
                },
                {
                    title: 'Tipo',
                    key: 'type',
                    width: 115,
                },
                {
                    title: 'Cantidad',
                    key: 'quantity'
                },
                {
                    title: 'Precio Compra',
                    key: 'pricePerSale',
                    width: 125,
                },
                {
                    title: 'Precio Venta',
                    key: 'pricePerPurchase',
                    width: 125,
                },
                {
                    title: 'Fecha Registro',
                    key: 'registerDate',
                    width: 125,
                    render: (h, params) => {
                        let registerD = new Date(params.row.registerDate)
                        return h('div', [
                            ,
                            h('strong', `${registerD.getDate()}/${registerD.getMonth() + 1}/${registerD.getFullYear()}`)
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
            ]
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
            .getAll().then(p => {
                product.loading = false
                product.data = p.data
            }).catch()
        },
        delete(id){
            let product = this
            product.loading = true
            product.$store.state.services.ProductService
            .remove(id)
            .then(s => {
                product.loading = false
                product.getAll()
            })
            .catch(r => {
                 self.$Notice.error({
                    title: 'Error',
                    desc: ''
                });
            });
        },
        show(index) {
            this.$Modal.info({
                title: 'Informacion del Producto',
                content: `<b>Nombre</b>：${this.data[index].name}<br><b>Tipo del Producto</b>：${this.data[index].type}<br><b>Cantidad</b>：${this.data[index].quantity}`
            })
        },
        remove(index) {
            this.$Modal.confirm({
                title: 'Eliminar Producto',
                content: `¿Deseas Eliminar a <b>${this.data[index].name}</b>?`,
                okText: 'Confirmar',
                onOk: () => {
                    this.delete(this.data[index].productId),
                    this.$Notice.success({
                        title: 'Producto Eliminado',
                        desc: ''
                    });
                },
                cancelText: 'Cancelar',
                onCancel: () => {
                    
                }
            })
        },
        edit(index){
            this.$router.push(`/products/${this.data[index].productId}/edit`)
        },
        redirect(path) {
            if (path === undefined) return
            this.$router.push(path)
        }
    }
}
</script>
