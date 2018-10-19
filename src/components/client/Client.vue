<template>
<div>
    <Row :gutter="220">
        <Col span="8">
        <h1>Clientes
            <Icon type="ios-person-outline" /> </h1>
        </Col>
        <Col span="8">
        <Search></Search>
        </Col>
        <Col span="8">
        <Button @click="redirect('/clients/add')" type="info"><h3>Agregar Cliente <Icon type="ios-person-outline"></Icon></h3></Button>
        </Col>
    </Row>
    <br>
    <Table border :loading="loading" :columns="columns" :data="data"></Table>
    <br>
    <Col span="10" offset="8">
    <Page :total="data.length" prev-text="Previous" next-text="Next" />
    </Col>
</div>
</template>

<script>
import Search from '../shared/Search'
export default {
    components:{Search},
    data() {
        return {
            data:[],
            search: '',
            loading: false,
            columns: [{
                    title: 'Nombre',
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
                    title: 'Apellido',
                    key: 'lastName'
                },
                {
                    title: 'Email',
                    key: 'email'
                },
                {
                    title: 'Telefono',
                    key: 'phone'
                },
                {
                    title: 'Sexo',
                    key: 'sex'
                },
                {
                    title: 'Address',
                    key: 'address'
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
            ]
        }
    },
    created() {
        let client = this
        client.getAll()
    },
    methods: {
        getAll(){
            let client = this
            client.$Loading.start()
            client.loading = true
            client.$store.state.services.ClientService
            .getAll()
            .then(c => {
                client.$Loading.finish();
                client.loading = false
                client.data = c.data
            })
            .catch(e => {
                client.$Loading.error();
            })
        },

        delete(id){
            let client = this
            client.loading = true
            client.$store.state.services.ClientService
            .remove(id)
            .then(c => {
                client.loading = false
                client.getAll()
            })
            .catch(r => {
                 client.$Notice.error({
                    title: 'Error',
                    desc: ''
                    });
            });
        },
        
        edit(index){
            this.$router.push(`/clients/${this.data[index].clientId}/edit`)
        },
        show(index) {
            this.$Modal.info({
                title: 'Informacion del Cliente',
                content: `<b>Nombre</b>：${this.data[index].name}
                <br><b>Apellido</b>：${this.data[index].lastName}
                <br><b>Direccion</b>：${this.data[index].address}
                <br><b>Email</b>：${this.data[index].email}`
            })
        },
        remove(index) {
            this.$Modal.confirm({
                title: 'Eliminar Cliente',
                content: `¿Deseas Eliminar a <b>${this.data[index].name}</b>?`,
                okText: 'Confirmar',
                onOk: () => {
                    this.delete(this.data[index].clientId),
                    this.$Notice.success({
                    title: 'Cliente Eliminado',
                    desc: ''
                    });
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
    },
    computed:{
        search(){
            return this.data.filter((search) => {
                search.name.includes(this.search);
            })
        }
    }
}
</script>
<style>
.search{
        position: relative;
        top: 34px;
        left: 30%;
    }
</style>
