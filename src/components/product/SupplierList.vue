<template>
<Col span="4">
          <FormItem label="Suplidor" prop="supplier">
            <Select v-model="suppliers" style="width:200px">
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
                suppliers: ''
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
            }).catch()
        },
        getId(value){
            let self = this
            self.$emit('getIdSelected', value)
        }
    },
}
</script>