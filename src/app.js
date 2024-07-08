const express = require("express");
const app = express();
const PUERTO = 8080;
const productsRouter = require("./routes/products.router.js");
const cartsRouter = require("./routes/carts.router.js");
const exphbs = require("express-handlebars");




// middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Configuramos motor de plantilla
app.engine("handlebars", exphbs.engine());
app.set("view engine", "handlebars");
app.set("views", "./src/views");



//rutas
app.use("/api", productsRouter);
app.use("/api", cartsRouter);
app.get("/", (req, res) => {
    res.render("index");
})





app.listen(PUERTO, () => {
    console.log(`Escuchando en http://localhost:${PUERTO}`);
})