import fs from 'fs';

class ContenedorArchivo {
    constructor(nombreFile){
        this.nombreFile = nombreFile;
        this.productos = [];

        const escribir = async(file) => {
            try {
                await fs.promises.writeFile(file, JSON.stringify(this.productos));
            } catch (error) {
                console.log("error write: ", error);
            }
        }
        escribir(this.nombreFile);
    }

    async save(objProducto){
        try {
            if(this.productos.length == 0){
                objProducto.id = 1;
            }else{
                let id = this.productos[this.productos.length-1].id
                objProducto.id = id + 1;
            }
            this.productos.push(objProducto);
            console.log('Productos: ', this.productos);
            await fs.promises.writeFile(this.nombreFile, JSON.stringify(this.productos));
        } catch (error) {
            console.log("error save: ", error);
        }
    }

    async getById(id){
        try {
            const contenido = await fs.promises.readFile(this.nombreFile, 'utf-8');
            const contenidoObj = JSON.parse(contenido);
            const finded = contenidoObj.find(prod => prod.id === id) || null;
            console.log('Producto Encontrado: ', finded);
            return finded;
        } catch (error) {
            console.log("error getById: ", error);
        }
        //return this.productos.find(prod => prod.id === id) || null;
    }

    async getAll(){
        try {
            const contenido = await fs.promises.readFile(this.nombreFile, 'utf-8');
            const contenidoObj = JSON.parse(contenido);
            console.log('Todos los productos: ', contenidoObj);
            return contenidoObj;
        } catch (error) {
            console.log("error getAll: ", error);
        }
        //return this.productos;
    }

    async deleteById(id){
        try {
            const contenido = await fs.promises.readFile(this.nombreFile, 'utf-8');
            const contenidoObj = JSON.parse(contenido);
            const filtered = contenidoObj.filter(prod => prod.id !== id);
            console.log("Productos Restantes: ", filtered);
            await fs.promises.writeFile(this.nombreFile, JSON.stringify(filtered));
        } catch (error) {
            console.log("error deleteById: ", error);
        }
        // this.productos = this.productos.filter(prod => prod.id !== id);

    }

    async deleteAll(){
        try {
            const contenido = await fs.promises.readFile(this.nombreFile, 'utf-8');
            let contenidoObj = JSON.parse(contenido);
            contenidoObj = [];
            console.log("Prodcutos Borrados: ", contenidoObj);
            await fs.promises.writeFile(this.nombreFile, JSON.stringify(contenidoObj));
        } catch (error) {
            console.log("error deleteAll: ", error);
        }
    }
}

export default ContenedorArchivo;