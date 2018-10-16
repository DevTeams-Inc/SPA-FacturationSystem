<template>
    <div>
        <Input search enter-button="Search" v-model="search" placeholder="Buscar" >
                <Button @click="Search(search)" slot="append" icon="ios-search"></Button>
        </Input>
    </div>
</template>

<script>
export default {
    data(){
        return{
            search:'',
            data:[] ,

            
        }  
    },
    methods:{
        Search(value){
            let self = this;
            self.$store.state.services.ClientService
            .search(value)
            .then((result) => {
                self.data = result.data;
            }).catch((err) => {
            });
        },
        
           handleRender () {
                this.$Modal.confirm({
                    render: (h) => {
                        return h('Input', {
                            props: {
                                value: this.value,
                                autofocus: true,
                                placeholder: 'Please enter your name...'
                            },
                            on: {
                                input: (val) => {
                                    this.value = val;
                                }
                            }
                        })
                    }
                })
            }
    }
}
</script>
<style>
</style>

