<template>
<div>
        <Modal
        v-model="modal"
        title="Clientes"
        @on-ok="ok"
        @on-cancel="cancel">
        <Table border :columns="columns" :data="data"></Table>
        </Modal>

        <Button @click="modal = true" type="primary" icon="ios-search"></Button>  

        </div>  
</template>

<script>
    export default {
        data(){
            return {
                modal: false,
                data: [],
                columns: [{
                    title: 'Nombre',
                    key: 'name',
                },
                {
                    title: 'Apellido',
                    key: 'lastName'
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
                                        this.modal = false
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
    let client = this
    client.getAll()
    },
    methods: {
        getAll(){
            let client = this
           
            client.$store.state.services.ClientService
            .getAll()
            .then(c => {
                client.data = c.data
            })
            .catch()
        },
        getId(value){
            let self = this
            self.$emit('getIdSelected', value)
        },
        show(index){
            let self = this
            self.$emit('getClientSelected', self.data[index].name, self.data[index].clientId)    
        }
    },
}
</script>