<template>
<Menu active-name="1-1" theme="light" width="auto">
<MenuItem name="1-1"><span @click="redirect('/')"><Icon type="pie-graph"></Icon> Dashboard</span></MenuItem>
    <Submenu name="1">
        <template slot="title">
            <Icon type="ios-keypad"></Icon>
            Administrar
        </template>
        <MenuItem name="1-2"><span @click="redirect('/clients')"><Icon type="ios-person-outline" /> Clientes</span></MenuItem>
        <MenuItem name="1-3"><span @click="redirect('/employees')"><Icon type="person"></Icon> Empleados</span></MenuItem>
        <MenuItem name="1-4"><span @click="redirect('/suppliers')"><Icon type="ios-people" /> Suplidores</span></MenuItem>
        <MenuItem name="1-5"><span @click="redirect('/products')"><Icon type="ios-box"></Icon> Productos</span></MenuItem>
        <MenuItem name="1-6"><span @click="redirect('/sales')"><Icon type="bag"></Icon> Ventas</span></MenuItem>
        <MenuItem name="1-7"><span @click="redirect('/sold-out')"><Icon class="i" type="ios-box" /><Badge></Badge></span></MenuItem>
        
    </Submenu>
    <!-- <Submenu name="2">
        <template slot="title">
            <Icon type="gear-a"></Icon>
            Configuración
        </template>
        <MenuItem name="2-1"><Icon type="ios-contact-outline" /> Perfil</MenuItem>
        <MenuItem name="2-2"><Icon type="log-out"></Icon> Cerrar Sesión</MenuItem>
    </Submenu> -->
</Menu>
</template>

<script>
import Badge from "../product/productExist";
export default {
  components: { Badge },
  data() {
    return {};
  },
  methods: {
    redirect(path) {
      if (path === undefined) return;
      this.$router.push(path);
    }
  }
};
</script>