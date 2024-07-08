const express = require("express");
const router = express.Router();
const CartManager = require("../controllers/cart-manager.js");
const cartManager = new CartManager("./src/models/carts.json");

//Creamos un nuevo carrito
router.post("/", async (req, res) => {
    try {
        const newCart = await CartManager.createCart();
        res.json(newCart);
    } catch (error) {
        console.error("Error al crear nuevo carrito", error);
        res.status(500).json({error: "Error interno del servidor"});
        
    }
});


module.exports = router;