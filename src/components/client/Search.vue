<template>
<div class="search">
    <AutoComplete
        v-model="value"
        icon="ios-search"
        placeholder="Buscar"
         :filter-method="filterMethod"
        style="width:250px">
        <div class="demo-auto-complete-item" v-for="item in data4">
            <div class="demo-auto-complete-group">
                <span>{{ item.title }}</span>
            </div>
            <Option v-for="option in item.children" :value="option.title" :key="option.title">
                <span class="demo-auto-complete-title">{{ option.title }}</span>
                <span class="demo-auto-complete-count">{{ option.count }}</span>
            </Option>
        </div>
    </AutoComplete>
</div>
</template>
<script>
    export default {
        data () {
            return {
                value: '',
                data4: [
                    {
                        title: 'Clientes',
                        children: [
                            {
                                title: 'iView',
                                count: 10000,

                            },
                            {
                                title: 'iView UI',
                                count: 10600,

                            }
                        ]
                    },
                ]
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
    .demo-auto-complete-item{
        padding: 4px 0;
        border-bottom: 1px solid #F6F6F6;
    }
    .demo-auto-complete-group{
        font-size: 12px;
        padding: 4px 6px;
    }
    .demo-auto-complete-group span{
        color: #666;
        font-weight: bold;
    }
    .demo-auto-complete-group a{
        float: right;
    }
    .demo-auto-complete-count{
        float: right;
        color: #999;
    }
    .demo-auto-complete-more{
        display: block;
        margin: 0 auto;
        padding: 4px;
        text-align: center;
        font-size: 12px;
    }
</style>

