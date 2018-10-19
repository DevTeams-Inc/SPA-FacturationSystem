<style scoped>
</style>
<template>
    <Badge :count="qyt" class="effect">
        <div class="m">
        Inventario
        </div>
    </Badge>
</template>
<script>
export default {
  data() {
    return {
      loading: false,
      qyt: 0,
    };
  },
  created(){
      let self = this
      self.getSoldOut()
  },
  methods:{
      getSoldOut(){
          let self = this
          self.loading = true
          self.$store.state.services.ProductService
          .getSoldOut()
          .then(e =>{
              self.loading = false
              self.qyt = e.data.length
          })
          .catch(e =>{
          })
      }
  }
};
</script>
<style>
.m{
    margin:8px;
}
</style>


