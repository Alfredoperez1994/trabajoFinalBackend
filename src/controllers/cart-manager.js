const fs = require("fs").promises;

class CartManager {
    constructor(path) {
        this.carts = [];
        this.path = path;
        this.ultId = 0;

        //cargar los carritos almacenados en el archivo
        this.loadCarts();
    }

    async loadCarts() {
        try {
            const data = await fs.readFile(this.path, "utf-8");
            this.carts = JSON.parse(data);
            if (this.carts.length > 0) {
                //verifico si hay por lo menos un carrito creado
                this.ultId = Math.max(...this.carts.map(cart => cart.id));
                //utilizo el metodo map para crear un nuevo array que solo tenga los identificadores del carrito y con math.max obtengo el mayor
            }
        } catch (error) {
            console.error("Error al cargar los carritos desde el archivo", error);
            //si no existe el archivo, lo voy a crear
            await this.saveCarts();
            
        }
    }

    async saveCarts() {
        await fs.writeFile(this.path, JSON.stringify(this.carts, null, 2));
    }

    async createCart() {
        const newCart = {
            id: ++this.ultId,
            products: []
        };

        this.carts.push(newCart);

        //guardamos el array en el archivo
        await this.saveCarts();
        return newCart;
    }

    async getCartById(cartId) {
        try {
            const cart = this.carts.find(c => c.id === cartId);

            if (!cart) {
                throw Error(`No existe carrito con el id ${cartId}`);
            }

            return cart;
        } catch (error) {
            console.error("Error al obtener el carrito por ID", error);
            throw error;
        }
    }

    async addProductToCart(cartId, productId, quantity = 1) {
        const cart = await this.getCartById(cartId);
        
    }
}