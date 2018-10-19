<template>
<div>
    <Row :gutter="186">
        <Col span="8">
        <h1>Supplidores
            <Icon type="ios-people" /> </h1>
        </Col>
         <Col span="8">
        <Search></Search>
        </Col>
        <Col span="8">
        <Button @click="redirect('/suppliers/add')" type="info"><h3>Agregar Suplidores <Icon type="ios-people"></Icon></h3></Button>
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
import Search from '../supplier/Search'

export default {
    components:{Search},
    data() {
        return {
            data:[],
            loading: false,
            columns: [{
                    title: 'Name',
                    key: 'name',
                    render: (h, params) => {
                        return h('div', [
                            // h('Icon', {
                            //     props: {
                            //         type: 'person'
                            //     }
                            // }),
                            h('strong', params.row.name)
                        ]);
                    }
                },
                {
                    title: 'Cédula',
                    key: 'dni'
                },
                {
                    title: 'Dirección',
                    key: 'address'
                },
                {
                    title: 'Telefono',
                    key: 'phone'
                },
                {
                    title: 'Fecha Registro',
                    key: 'registerDate'
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
        }
    },
    created() {
        let supplier = this
        supplier.getAll()
    },
    methods: {
        getAll(){
            let supplier = this
            supplier.loading = true
            supplier.$store.state.services.SupplierService
            .getAll()
            .then(s => {
                supplier.loading = false
                supplier.data = s.data
            }).catch()
        },
        delete(id){
            let supplier = this
            supplier.loading = true
            supplier.$store.state.services.SupplierService
            .remove(id)
            .then(s => {
                supplier.loading = false
                supplier.getAll()
            })
            .catch(r => {
                 self.$Message.error('Error!');
            });
        },
        edit(index){
            this.$router.push(`/suppliers/${this.data[index].supplierId}/edit`)
        },
        show(index) {
            this.$Modal.info({
                title: 'Información del Suplidor',
                content: `<b>Nombre</b>：${this.data[index].name}<br><b>Cédula</b>：${this.data[index].dni}<br><b>Dirección</b>：${this.data[index].address}`
            })
        },
        remove(index) {
            this.$Modal.confirm({
                title: 'Eliminar Suplidor',
                content: `¿Deseas Eliminar a <b>${this.data[index].name}</b>?`,
                okText: 'Confirmar',
                onOk: () => {
                    this.delete(this.data[index].supplierId),
                    this.$Message.success('Eliminado!')
                },
                cancelText: 'Cancelar',
                onCancel: () => {
                    
                }
            })
        },
        redirect(path) {
            if (path === undefined) return
            this.$router.push(path)
        }
    }
}
</script>
