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
            <Submenu name="2">
                <template slot="title">
                    <Icon type="gear-a"></Icon>
                    Configuración
                </template>
                <MenuItem name="2-1"><Icon type="ios-contact-outline" /> Perfil</MenuItem>
                <MenuItem name="2-2"><Icon type="log-out"></Icon> Cerrar Sesión</MenuItem>
            </Submenu>
        </div>
    </Menu>
</Header>    
</template>

<script>
    export default {
        data() {
            return
        },
        methods:{
            redirect(path){
                if(path === undefined) return
                this.$router.push(path)
            }
        }
    }
</script>