<template>
<Col span="4">
          <FormItem label="Suplidor" prop="suppliers">
            <Select v-model="suppliers" style="width:200px" placeholder="Selecciona un suplidor">
                <Option :change="getId(suppliers)" v-for="item in data" :value="item.supplierId" :key="item.supplierId">{{ item.name }}</Option>
            </Select>
            </FormItem>
        </Col>       
</template>
<script>
    export default {
        data(){
            return {
                data: [],
                    suppliers: '',
            }
        },
    created() {
    let supplier = this
    supplier.getAll()
    },
    methods: {
        getAll(){
            let supplier = this
            supplier.$store.state.services.SupplierService
            .getAll()
            .then(s => {
                supplier.data = s.data
            }).catch(e => {
                supplier.$Notice.success({
                    title: 'Error',
                    desc: ''
                });
            })
        },
        getId(value){
            let self = this
            self.$emit('getIdSelected', value)
        }
    },
}
</script>