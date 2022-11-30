import  ContenedorMongo  from '../../contenedor/ContenedorMongo.js';
import { Producto } from '../../models/Producto.js';
class ProductosDaoMongo extends ContenedorMongo {
    constructor(){
        super(Producto);
    }

    async guardar(producto){
        return super.created(producto);
    }

    async readOne(id){
        const elemento = await this.modelo.find({'_id': id});
        return elemento;
    }
}

export default ProductosDaoMongo;