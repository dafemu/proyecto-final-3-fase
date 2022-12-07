import ContenedorMemoria from "../../contenedor/ContenedorMemoria";
import { carrito } from '../../dataBase/db/memoria';
import fetch from 'node-fetch';

class CarritosDaoMemoria extends ContenedorMemoria { 
  constructor () {
    super(carrito);
  }

  async save() {
    let obj = { products: [] };
    super.save(obj);
  }

  async addProduct(idCart, idProduct) {
    try {
      const productData = await fetch (`/api/productos/${idProduct}`);
      const product = await productData.json();

      if (product.error) {
        return ({ error: 'Producto no encontrado' });
      }
      
      const arr = await super.getItems();
      
      if (arr.length === 0) {
        return ({"Error" : "No hay Carritos"});
      }

      let indexCart = arr.findIndex(item => item.id == idCart);

      if (indexCart == -1) {
        return ({ error: 'Carrito no encontrado' });
      }

      arr[indexCart].products.push(product);

      return "Producto Agregado";

    }
    catch (err) {
      throw new Error('Error: ', err)
    }
     
  }

  async deleteProduct(idCart, idProduct) {
    try {
      const arr = await super.getItems();

      if (arr.length === 0) {
        return ({"Error" : "No hay Carritos"});
      } 
  
      let indexCart = arr.findIndex(item => item.id == idCart);

      if (indexCart == -1) {
        return ({ error: 'Carrito no encontrado' });
      }   
      
      let indexProduct = arr[indexCart].products.findIndex(item => item.id == idProduct)

      if (indexProduct == -1) {
        return ({ error: 'Producto no encontrado' });
      }   
      
      arr[indexCart].products.splice(indexProduct, 1);

      return "Producto Eliminado";
    } 
    catch (err) {
      throw new Error('Error: ', err)
    }
  }

}

export default CarritosDaoMemoria;