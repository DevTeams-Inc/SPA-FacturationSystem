<template>
<div class="search">
    <AutoComplete
        v-model="value"
        :data="data"
        :filter-method="filterMethod"
        placeholder="input here"
        style="width:200px">
    </AutoComplete>
    </div>
</template>
<script>
    export default {
        data () {
            return {
                value: '',
                data: []
            }
        },
        created() {
            let client = this
            client.getAll()
        },
        methods: {
            filterMethod (value, option) {
                return option.toUpperCase().indexOf(value.toUpperCase()) !== -1;
            },
            getAll(){
            let client = this
            client.$store.state.services.ClientService
            .getAll()
            .then(c => {
                client.data = c.data
                alert(c.data[0].name);
            })
            .catch()
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

