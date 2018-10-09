<template>
<div>
    <Row>
        <Col span="8" offset="3">
        <Card style="width:260px">
            <div style="text-align:center">
                <Button type="text" @click="redirect('/clients')">
                    
                        <img src="../assets/images/001-friendship.png" height="64px" width="64px">
                                
                    <br>
                    <h3>Clientes</h3>
                </Button>
            </div>
        </Card>
        </Col>
        <Col span="8" offset="3">
        <Card style="width:260px">
            <div style="text-align:center">
                <Button type="text" @click="redirect('/employees')">
                    
                        <img src="../assets/images/002-student.png" height="64px" width="64px">
                    
                    <br>
                    <h3>Empleados</h3>
                </Button>
            </div>
        </Card>
        </Col>
    </Row>
    <br>
    <Row>
        <Col span="8" offset="3">
        <Card style="width:260px">
            <div style="text-align:center">
                <Button type="text" @click="redirect('/suppliers')">
                   
                        <img src="../assets/images/delivery-truck.png" height="64px" width="64px">
                   
                    <br>
                    <h3>Suplidores</h3>
                </Button>
            </div>
        </Card>
        </Col>
        <Col span="8" offset="3">
        <Card style="width:260px">
            <div style="text-align:center">
                <Button type="text" @click="redirect('/products')">
                    
                        <img src="../assets/images/004-cube.png" height="64px" width="64px">
                    
                    <br>
                    <h3>Productos</h3>
                </Button>
            </div>
        </Card>
        </Col>
    </Row>
    <br>
    <Row>
        <Col span="8" offset="3">
        <Card style="width:260px">
            <div style="text-align:center">
                <Button type="text" @click="redirect('/sales')">
                    
                        <img src="../assets/images/003-cashbox.png" height="64px" width="64px">
                    
                    <br>
                    <h3>Ventas</h3>
                </Button>
            </div>
        </Card>
        </Col>
        <Col span="8" offset="3">
        <Card style="width:260px">
            <div style="text-align:center">
                <Button type="text" @click="redirect('/bills')">
                    
                        <img src="../assets/images/bill.png" height="64px" width="64px">
                    
                    <br>
                    <h3>Facturas</h3>
                </Button>
            </div>
        </Card>
        </Col>
    </Row>
</div>
</template>

<script>
export default {
    data() {
        return {

        }
    },
    methods: {
        redirect(path) {
            if (path === undefined) return
            this.$router.push(path)
        }
    }
}
</script>