import ContenedorMongo from '../../contenedor/ContenedorMongo.js';
import { Carrito } from '../../models/Carrito.js';
class CarritosDaoMongo extends ContenedorMongo {
    constructor(){
        super(Carrito);
    }

    async guardar(carrito){
        return super.created(carrito);
    }
    
    async readOne(id){
        const elemento = await this.modelo.find({'_id': id});
        return elemento;
    }
}

export default CarritosDaoMongo;