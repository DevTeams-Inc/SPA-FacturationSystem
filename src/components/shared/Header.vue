<template>
<Header>
    <Menu mode="horizontal" theme="dark" active-name="1">
        <div class="layout-logo"></div>
        <div class="layout-nav">
            <Submenu name="1">
                <template slot="title">
                    <Icon type="ios-keypad"></Icon>
                    Administrar
                </template>
                <MenuItem name="1-2"><span @click="redirect('/employees')"><Icon type="person"></Icon> Empleados</span></MenuItem>
                <MenuItem name="1-3"><span @click="redirect('/suppliers')"><Icon type="person-stalker"></Icon> Suplidores</span></MenuItem>
                <MenuItem name="1-4"><span @click="redirect('/products')"><Icon type="ios-box"></Icon> Productos</span></MenuItem>
                <MenuItem name="1-5"><span @click="redirect('/sales')"><Icon type="bag"></Icon> Ventas</span></MenuItem>
            </Submenu>
            <MenuItem>
            <Icon class="i" type="ios-box" /><span @click="redirect('/sold-out')">
            <Badge></Badge></span>
            </MenuItem>
        </div>
    </Menu>
</Header>  
  
</template>

<script>
import Badge from "../product/productExist";
export default {
  components: { Badge },
  data() {
    return;
  },
  methods: {
    redirect(path) {
      if (path === undefined) return;
      this.$router.push(path);
    }
  }
};
</script>