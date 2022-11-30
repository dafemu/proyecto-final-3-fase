import ContenedorFirebase from '../../contenedor/ContenedorFirebase';
class ProductosDaoFirebase extends ContenedorFirebase {
    constructor(){
        super('productos');
    }

    async guardar(producto){
        return super.created(producto);
    }
}

export default ProductosDaoFirebase;