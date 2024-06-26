const express = require("express");
const app = express();
const PUERTO = 8080;


app.get("/",(req, res) => {
    res.send("mi primera chamba");
})



app.get("/tienda", (req, res) => {
    res.send("mi primera tienda");
})

const misProductos = [
    {id:1, nombre:"pan", precio: 100},
    {id:2, nombre:"leche", precio: 500},
    {id:3, nombre:"atun", precio: 200},
    {id:4, nombre:"tomate", precio: 300},
    {id:5, nombre:"fideo", precio: 400},
]

const clientes = [
    {id:1, nombre:"pepe", apellido:"simpson"},
    {id:2, nombre:"bart", apellido:"simpson"},
    {id:3, nombre:"lisa", apellido:"simpson"},
    {id:4, nombre:"maggi", apellido:"simpson"},
    {id:5, nombre:"homero", apellido:"simpson"},
    {id:6, nombre:"marge", apellido:"simpson"},
    {id:7, nombre:"moe", apellido:"sislac"},
    {id:8, nombre:"barni", apellido:"gomez"},
    {id:9, nombre:"jefe", apellido:"gorgori"},
    {id:10, nombre:"ned", apellido:"flanders"},
]

app.get("/productos/:id",(req, res) => {
    let id = req.params.id;

    const producto = misProductos.find(item => item.id == id);

    if(producto) {
        res.send(producto);
    }else {
        res.send("Producto no encontrado");
    }
})

// Si usamos datos complejos usar:
app.use(express.json());
app.use(express.urlencoded({extended:true}));


app.get("/clientes", (req, res) => {
    let {nombre, apellido} = req.query;

    res.send(`Bienvenido ${nombre} ${apellido}`);

})


app.get("/product", (req, res) => {
    let limit = parseInt(req.query.limit);

    const productos = misProductos.slice(0, limit);
    res.send(productos)

    if(limit){
        res.send(productos);
    }else{
        res.send(misProductos);
    }
})

//Post

app.post("/", (req, res) => {
    const clienteNuevo = req.body;

    clientes.push(clienteNuevo);
    console.log(clientes);
    res.send({status:"success", message: "Cliente creado"});
})








app.listen(PUERTO, () => {
    console.log(`Escuchando en http://localhost:${PUERTO}`);
})