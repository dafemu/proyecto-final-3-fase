import ContenedorMemoria from "../../contenedor/ContenedorMemoria.js";
import { productos } from '../../dataBase/db/memoria.js';

class ProductosDaoMemoria extends ContenedorMemoria {

  constructor () {
    super(productos);
  }
  
}

export default ProductosDaoMemoria;