import ContenedorArchivo from '../../contenedor/ContenedorArchivo.js';

const url = '../../dataBase/db/products.json';

class ProductosDaoArchivo extends ContenedorArchivo {
  constructor () {
    super(url);
  }
}

export default ProductosDaoArchivo;