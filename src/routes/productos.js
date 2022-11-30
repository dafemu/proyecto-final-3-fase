import productosDao from '../daos/controller.js';
import { Router } from "express";
import logger from '../utils/logger.js';

const routerProductos = Router();

const productosDaoController = productosDao.productosDao;

routerProductos.get('/', async (req, res) => {
    const { method } = req;
    const time = new Date().toLocaleString();
    logger.info(`Ruta '/api/productos' - con metodo: ${method} - time: ${time}`);

    console. log('GET request recibido');
    console. log('productosDao: ', productosDao);
    const productos = await productosDaoController.read();
    // res.status(200).json({
    //     result: 'Productos',
    //     ListadoProductos : productos,
    // });
    //res.status(200).send(productos);
});

routerProductos.get('/:id', async (req,res) => {
    const { method } = req;
    const time = new Date().toLocaleString();
    logger.info(`Ruta '/api/productos' - con metodo: ${method} - time: ${time}`);

    console.log('GET request recibido con id');
    const id = Number(req.params.id);
    const producto = productosDaoController.readOne(id);
    // res.send(producto);
    //res.status(200).send(productos);
});

routerProductos.post('/', async (req,res) => {
    const { method } = req;
    const time = new Date().toLocaleString();
    logger.info(`Ruta '/api/productos' - con metodo: ${method} - time: ${time}`);

    console.log('POST request recibido');
    const producto ={ 
        timestamp: Date.now(),
        nombre: req.query.nombre,
        descripcion: req.query.descripcion,
        codigo: req.query.codigo,
        foto: req.query.foto,
        precio: req.query.precio,
        stock: req.query.stock,
    };
    const newProducto = await productosDaoController.created(producto);
    // res.status(201).json({
    //     result: 'Producto Agregado',
    //     NuevoProducto: newProducto
    // });
    //res.status(200).send(newProducto);
});

routerProductos.put('/:id', async (req,res) => {
    const { method } = req;
    const time = new Date().toLocaleString();
    logger.info(`Ruta '/api/productos' - con metodo: ${method} - time: ${time}`);

    console.log('PUT request recibido');
    const id = Number(req.params.id);
    const productoEncontrado = {};
    productoEncontrado.timestamp = req.query.timestamp;
    productoEncontrado.nombre = req.query.nombre;
    productoEncontrado.descripcion = req.query.descripcion;
    productoEncontrado.codigo = req.query.codigo;
    productoEncontrado.foto = req.query.foto;
    productoEncontrado.precio = req.query.precio;
    productoEncontrado.stock = req.query.stock;

    await productosDaoController.update(id,productoEncontrado);
    // res.status(201).json({
    //     result: 'Producto Actualizado',
    //     id: req.params.id,
    //     ProductoActualizado : productoEncontrado,        
    // });
});

routerProductos.delete('/:id', async (req,res) => {
    const { method } = req;
    const time = new Date().toLocaleString();
    logger.info(`Ruta '/api/productos' - con metodo: ${method} - time: ${time}`);
    
    console.log('DELETE request recibido');
    const id = Number(req.params.id);
    const productoBorrado = await productosDaoController.delete(id);
    // res.status(200).json({
    //     result: 'Producto Borrado',
    //     id: req.params.id,
    //     ListadoProductosNuevo: productoBorrado,
    // });
});

export default routerProductos;