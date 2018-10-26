<template>
<div>
    <Row>
        <Col span="10">
        <h1>Agotado
            <Icon type="ios-box" /></h1>
        </Col>
        <!-- <Col span="2" offset="9">
        <Button @click="redirect('/sales/add')" type="info"><h3>Agregar Venta <Icon type="bag"></Icon></h3></Button>
        </Col> -->
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
            data: [],
            columns: [{
                    title: 'COD-Producto',
                    key: 'productCode',
                    // render: (h, params) => {
                    //     return h('div', [
                    //         h('Icon', {
                    //             props: {
                    //                 type: 'ios-box'
                    //             }
                    //         }),
                    //         h('strong', params.row.productCode)
                    //     ]);
                    // }
                },
                {
                    title: 'Producto',
                    key: 'name',
                    render: (h, params) => {
                        return h('div', [
                            // h('Icon', {
                            //     props: {
                            //         type: 'ios-box'
                            //     }
                            // }),
                            h('strong', params.row.name)
                        ]);
                    }
                },
                {
                    title: 'Tipo',
                    key: 'type',
                    // render: (h, params) => {
                    //     return h('div', [
                    //         h('Icon', {
                    //             props: {
                    //                 type: 'ios-box'
                    //             }
                    //         }),
                    //         h('strong', params.row.productCode)
                    //     ]);
                    // }
                },
                {
                    title: 'Fecha Registro',
                    key: 'registerDate',
                    render: (h, params) => {
                        let registerD = new Date(params.row.registerDate)
                        return h('div', [
                            ,
                            h('strong', `${registerD.getDate()}/${registerD.getMonth() + 1}/${registerD.getFullYear()}`)
                        ]);
                    }
                },
                {
                    title: 'Fecha Editado',
                    key: 'updatedDate',
                    render: (h, params) => {
                        let updatedD = new Date(params.row.updatedDate)
                        return h('div', [
                            ,
                            h('strong', `${updatedD.getDate()}/${updatedD.getMonth() + 1}/${updatedD.getFullYear()}`)
                        ]);
                    }
                },
                {
                    title: 'Action',
                    key: 'action',
                    width: 150,
                    align: 'center',
                    render: (h, params) => {
                        return h('div', [
                            h('Button', {
                                props: {
                                    type: 'primary',
                                    size: 'small',
                                    icon: 'eye'
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
                                    type: 'success',
                                    size: 'small',
                                    icon: 'plus'
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
        }
    },
    created() {
        let soldOut = this
        soldOut.getSoldOut()
    },
    methods: {
        getSoldOut(){
            let soldOut = this
            soldOut.$Loading.start()
            soldOut.loading = true
            soldOut.$store.state.services.ProductService
            .getSoldOut().then(p => {
                soldOut.$Loading.finish()
                soldOut.loading = false
                soldOut.data = p.data
            }).catch(e => {
                soldOut.$Loading.error()
            })
        },
        show(index) {
            this.$Modal.info({
                title: 'Información del Producto Agotado',
                content: `<b>COD-Producto</b>：${this.data[index].productCode}<br><b>Producto</b>：${this.data[index].name}<br><b>Tipo</b>：${this.data[index].type}
                <br><b>Cantidad</b>：${this.data[index].quantity}`
            })
        },
        remove(index) {
            this.data6.splice(index, 1);
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
