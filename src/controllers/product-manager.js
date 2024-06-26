const fs = require("fs").promises;


class ProductManager {
    //Variable estatica,Recordar que esta le corresponde a la clase
    static ultId = 0;

    //Desarollamos el constructor con el elemento products, el cual sera un array vacio.

    constructor(path) {
        this.products = [];
        this.path = path;
    }

    //Metodos:

    async addProduct(nuevoObjeto) {
        let { title, description, price, image, code, stock } = nuevoObjeto;


        //Validamos que se completen todos los campos:
        if (!title || !description || !price || !image || !code || !stock) {
            console.log("Todos los campos son obligatorios villero");
            return;
        }

        //Validamos que el codigo sea unico 
        if (this.products.some(item => item.code === code)) {
            console.log("El codigo debe ser unico hdrmp!");
            return;
        }

        //Creamos un nuevo objeto con todos estos datos:

        const newProduct = {
            id: ++ProductManager.ultId,
            title,
            description,
            price,
            image,
            code,
            stock
        }

        //Lo agregamos al array
        this.products.push(newProduct);
        //Guardamos el array en el archivo
        await this.guardarArchivo(this.products);




    }

    getProducts() {
        console.log(this.products);
    }

    async getProductById(id) {
        try {
            const arrayProductos = await this.leerArchivo();
            const buscado = arrayProductos.find(item => item.id === id);

            if (!buscado) {
                console.log("Producto no encontrado");
            } else {
                console.log("SII lo encontramos!");
                return buscado;
            }

        } catch (error) {
            console.log("Error al leer archivo", error);
        }
    }

    // nuevos metodos desafio 2

    async leerArchivo() {
        try {
            const respuesta = await fs.readFile(this.path, "utf-8");
            const arrayProductos = JSON.parse(respuesta);
            return arrayProductos;

        } catch (error) {
            console.log("Error al leer un archivo", error);
        }
    }

    async guardarArchivo(arrayProductos) {
        try {
            await fs.writeFile(this.path, JSON.stringify(arrayProductos, null, 2))

        } catch (error) {
            console.log("Error al guardar el archivo", error);

        }
    }

    //Actualizamos un producto

    async updateProduct(id, productoActualizado) {
        try {
            const arrayProductos = await this.leerArchivo();
            const index = arrayProductos.findIndex(item => item.id === id);

            if (index !== -1) {
                //puedo usar el metodo de array splice para remplazar el objeto en la posicion del index;
                arrayProductos.splice(index, 1, productoActualizado);
                await this.guardarArchivo(arrayProductos);
            }else {
                console.log("no se encontro el producto");
            }

        } catch (error) {
            console.log("Error al actualizar el producto", error);
        }
    }


    // Eliminamos el producto
    async deleteProduct(id) {
        try {
            
        } catch (error) {
            console.log("Error al eliminar el producto", error);
            
        }
    }



}

module.exports = ProductManager;


