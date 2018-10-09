<template>
<div>
        <Modal
        v-model="modalP"
        title="Empleados"
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
                columns: [{
                    title: 'Name',
                    key: 'name',
                },
                {
                    title: 'Nombre de Usuario',
                    key: 'userName'
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
    let employee = this
    employee.getAll()
    },
    methods: {
        getAll(){
            let employee = this
           
            employee.$store.state.services.EmployeeService
            .getAll()
            .then(e => {
                employee.data = e.data
            })
            .catch()
        },
        getId(value){
            let self = this
            self.$emit('getIdSelected', value)
        },
        show(index){
            let self = this
            self.$emit('getEmployeeSelected', self.data[index].name, self.data[index].userId)    
        }
    },
}
</script>