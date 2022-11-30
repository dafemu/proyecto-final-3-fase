import carritosDao from '../daos/controller.js';
import logger from '../utils/logger.js';

import { Router } from "express";

const routerCarrito = Router();
const carritosDaoController = carritosDao.carritosDao;

routerCarrito.post('/', async (req,res) => {
    const { method } = req;
    const time = new Date().toLocaleString();
    logger.info(`Ruta '/api/carritos' - con metodo: ${method} - time: ${time}`);

    console.log('POSTcarrito request recibido');
    const carrito = {
        timestamp:  Date.now(),
    };
    const newCarrito = await carritosDaoController.created(carrito);
    res.status(201).json({
        result: 'Carrito Agregado',
        NuevoCarrito: newCarrito
    });
});

routerCarrito.delete('/:id', async(req,res) => {
    const { method } = req;
    const time = new Date().toLocaleString();
    logger.info(`Ruta '/api/carritos' - con metodo: ${method} - time: ${time}`);

    console.log('DELETEcarrito request recibido');
    const id = Number(req.params.id);
    const carritoBorrado = await carritosDaoController.delete(id);
    res.status(200).json({
        result: 'Carrito Borrado',
        id: req.params.id,
        NuevoListadoCarrito: carritoBorrado,
    });
});

// //Productos en el carrito
// routerCarrito.get('/:id/productos', async (req,res) => {
//     console.log('GET request recibido con id');
//     const id = Number(req.params.id);
//     const carrito = await carritosDaoController.readOne(id);
//     res.send(carrito);
// });

// routerCarrito.post('/:id/productos', async (req,res) => {
//     console.log('POSTcarrito dos request recibido');
//     const idCarrito = Number(req.params.id);
//     const idProducto = req.body.id;

//     const carrito = await carritosDaoController.readOne(idCarrito);
//     const producto = await productosDao.readOne(idProducto);
    
//     carrito.productos.push(producto);
//     await carritosDaoController.update(idCarrito, carrito)

//     res.status(201).json({
//         result: 'Producto agregado al carrito',
//         NuevoCarrito: carrito
//     });
// });

// routerCarrito.delete('/:id/productos/:id_prod', async (req,res) => {
//     console.log('DELETE request recibido');
//     const idCarrito = Number(req.params.id);
//     const idCarritoProd = Number(req.params.id_prod);

//     const carrito = await carritosDaoController.readOne(idCarrito);

//     const index = carrito.productos.findIndex(prod => prod.id == idCarritoProd);

//     if(index !== -1){
//         carrito.productos.splice(index,1);
//         await carritosDaoController.update(idCarrito,carrito);
//     }

//     res.status(200).json({
//         result: 'Producto borrado del carrito',
//         id: req.params.id,
//         ListadoProductosNuevo: carrito,
//     });
// });

export default routerCarrito;