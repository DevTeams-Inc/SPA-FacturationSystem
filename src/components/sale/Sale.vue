<template>
<div>
    <Row>
        <Col span="10">
        <h1>Ventas
            <Icon type="ios-box" /></h1>
        </Col>
        <Col span="2" offset="9">
        <Button @click="redirect('/sales/add')" type="info"><h3>Agregar Venta <Icon type="bag"></Icon></h3></Button>
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
            data: [],
            columns: [{
                    title: 'Cliente',
                    key: 'saleId',
                    render: (h, params) => {
                        return h('div', [
                            h('Icon', {
                                props: {
                                    type: 'person'
                                }
                            }),
                            h('strong', params.row.client.name)
                        ]);
                    }
                },
                {
                    title: 'Fecha Factura',
                    key: 'registerDate'
                },
                {
                    title: 'Empleado',
                    key: 'name',
                    render: (h, params) => {
                        return h('div', [
                            h('Icon', {
                                props: {
                                    type: 'person'
                                }
                            }),
                            h('strong', params.row.user.name)
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
                                    type: 'error',
                                    size: 'small',
                                    icon: 'close'
                                },
                                on: {
                                    click: () => {
                                        this.remove(params.index)
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
        let sale = this
        sale.getAll()
    },
    methods: {
        getAll(){
            let sale = this
            sale.loading = true
            sale.$store.state.services.SaleService
            .getAll().then(p => {
                sale.loading = false
                sale.data = p.data
            }).catch()
        },
        show(index) {
            this.$router.push(`/sales/${this.data[index].saleId}/detail`)
        },
        remove(index) {
            this.data6.splice(index, 1);
        },
        redirect(path) {
            if (path === undefined) return
            this.$router.push(path)
        }
    }
}
</script>
