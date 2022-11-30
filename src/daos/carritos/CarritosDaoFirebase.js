import ContenedorFirebase from '../../contenedor/ContenedorFirebase.js';
class CarritosDaoFirebase extends ContenedorFirebase {
    constructor(){
        super('carritos');
    }

    async guardar(producto){
        return super.created(producto);
    }
}

export default CarritosDaoFirebase;