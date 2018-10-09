<template>
  <div id="app">
  <div class="layout">
        <Layout>
            <Header></Header>
            <Layout :style="{padding: '0 50px'}">
                <Breadcrumb :style="{margin: '16px 0'}">
                    <BreadcrumbItem>Home</BreadcrumbItem>
                    <BreadcrumbItem>{{path}}</BreadcrumbItem>
                </Breadcrumb>
                <Content :style="{padding: '24px 0', minHeight: '280px', background: '#fff'}">
                    <Layout>
                        <Sider hide-trigger :style="{background: '#fff'}">
                            <Sidebar></Sidebar>
                        </Sider>
                        <Content :style="{padding: '24px', minHeight: '455px', background: '#fff'}">
                            <router-view/>
                        </Content>
                    </Layout>
                </Content>
            </Layout>
            <Footer></Footer>
        </Layout>
      </div>
  </div>
</template>

<script>
import Header from './components/shared/Header'
import Sidebar from './components/shared/Sidebar'
import Footer from './components/shared/Footer'

export default {
  components: {Header, Sidebar, Footer},
  name: 'App',
  data(){
      return{
          Breadcrumb:''
      }
  },
  created(){
      
  },
  computed:{
      path(){
      let param = this
      return param.Breadcrumb = param.$route.name
      }
  }
}
</script>

<style>
.layout{
    border: 1px solid #d7dde4;
    background: #f5f7f9;
    position: relative;
    border-radius: 4px;
    overflow: hidden;
}
.layout-logo{
    width: 300px;
    height: 35px;
    background: #5b6270;
    border-radius: 3px;
    float: left;
    position: relative;
    top: 15px;
    left: 20px;
}
.layout-nav{
    width: 430px;
    margin: 0 auto;
    margin-right: -70px;
}
.layout-footer-center{
    text-align: center;
}

</style>
