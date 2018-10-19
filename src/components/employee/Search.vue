<template>
<div>
    <div>
        <Input search enter-button="Search" v-model="search" placeholder="Buscar" >
                <Button @click="Search(search); modalP = true" slot="append" icon="ios-search"></Button>
        </Input>
    </div>
       <Modal
        v-model="modalP"
        title="Empleados"
        @on-ok="ok"
        @on-cancel="cancel">
        <Table border :columns="columns1" :data="data"></Table>
        </Modal>

        </div>  
</template>

<script>
export default {
    data(){
        return{
            search:'',
            data:[] ,
            modalP: false,

               columns1: [
                    {
                        title: 'Nombre',
                        key: 'name'
                    },
                      {
                        title: 'Nombre Usuario',
                        key: 'userName'
                    },
                    {
                        title: 'Email',
                        key: 'email'
                    }
                ],
                data: []
        }  
    },
    methods:{
        Search(value){
            let self = this;
            self.$store.state.services.EmployeeService
            .search(value)
            .then((result) => {
                self.data = result.data;
            }).catch((err) => {
            });
        }
    }
}
</script>
<style>
</style>

