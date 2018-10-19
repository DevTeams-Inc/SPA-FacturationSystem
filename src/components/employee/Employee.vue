<template>
<div>
    <Row>
        <Col span="10">
        <h1>Empleados
            <Icon type="ios-person-outline" /> </h1>
        </Col>
        <Col span="2" offset="9">
        <Button @click="redirect('/employees/add')" type="info"><h3>Agregar Empleado <Icon type="person"></Icon></h3></Button>
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
                    key: 'name',
                    render: (h, params) => {
                        return h('div', [
                            h('Icon', {
                                props: {
                                    type: 'person'
                                }
                            }),
                            h('strong', params.row.name)
                        ]);
                    }
                },
                {
                    title: 'Nombre Usuario',
                    key: 'userName' 
                },
                {
                    title: 'Email',
                    key: 'email'
                },
                {
                    title: 'Rol',
                    key: ('role')
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
        let employee = this
        employee.getAll()
    },
    methods: {
        getAll(){
            let employee = this
            employee.loading = true
            employee.$store.state.services.EmployeeService
            .getAll()
            .then(e => {
                employee.loading = false
                employee.data = e.data
                e.data.forEach(element => {
                    if(element.role == 1){
                        element.role = 'Admin';
                    }else if(element.role == 2){
                        element.role = 'Moderador';
                    }else if(element.role == 3){
                        element.role = 'Empleado';
                    }
                     e.data.role = element.role;
                });
            }).catch(e => {
                self.$Notice.error({
                    title: 'Error',
                    desc: ''
                });
            })
        },
        delete(id){
            let employee = this
            employee.loading = true
            employee.$store.state.services.EmployeeService
            .remove(id)
            .then(e => {
                employee.loading = false
                employee.getAll()
            })
            .catch(e => {
                 self.$Notice.error({
                    title: 'Error',
                    desc: ''
                });
            });
        },
        show(index) {
            this.$Modal.info({
                title: 'Informacion del Empleado',
                content: `Nombre：${this.data[index].name}
                <br>Nombre de Usuario：${this.data[index].userName}
                <br>Rol：${this.data[index].role}`
            })
        },
        remove(index) {
            this.$Modal.confirm({
                title: 'Eliminar Empleado',
                content: `¿Deseas Eliminar a <b>${this.data[index].name}</b>?`,
                okText: 'Confirmar',
                onOk: () => {
                    this.delete(this.data[index].userId),
                    self.$Notice.success({
                        title: 'Empleado Eliminado',
                        desc: ''
                    });
                },
                cancelText: 'Cancelar',
                onCancel: () => {
                    
                }
            })
        },
        edit(index){
            this.$router.push(`/employees/${this.data[index].userId}/edit`)
        },
        redirect(path) {
            if (path === undefined) return
            this.$router.push(path)
        }
    }
}
</script>
