<style scoped>
</style>
<template>
    <Badge :count="qyt">
        <div class="m">
        Existencias
        </div>
    </Badge>
</template>
<script>
export default {
  data() {
    return {
      qyt: 0,
    };
  },
  created(){
      let self = this
      self.getAll()
  },
  methods:{
      getSoldOut(){
          let self = this;
          self.$store.state.services.ProductService
          .exist()
          .then(e =>{
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


