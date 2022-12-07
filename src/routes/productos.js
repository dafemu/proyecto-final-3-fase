import { productosDao } from '../contenedores/daos/index.js';
import { usuariosDao } from '../contenedores/daos/index.js';

import auth from '../middlewares/auth.js';

import { Router } from "express";
import logger from '../utils/logger.js';

const routerProductos = Router();

routerProductos.get('/', auth, async (req, res) => {
    const { method } = req;
    const time = new Date().toLocaleString();

    const datosUsuario = await usuariosDao.getById(req.user._id);
    const user = datosUsuario.username;

    if (user.toLowerCase() !== 'pepe') {
        logger.info(`Acceso no Autorizado: Ruta '/productos' - con metodo: ${method} - time: ${time}`);
        return res.render('unauthorized')
    }

    const productos = await productosDao. getAll();
    logger.info(`Ruta '/productos' - con metodo: ${method} - time: ${time}`);
    
    res.render("products", {
        productos: productos
    });
});

routerProductos.get('/:id', auth, async (req,res) => {
    const { method } = req;
    const time = new Date().toLocaleString();
    logger.info(`Ruta '/productos/:id' - con metodo: ${method} - time: ${time}`);
    
    console.log('GET request recibido con id');
    productosDao.getById(id) 
    .then(data => {      
        res.status(201).json(data);
    })
});

routerProductos.post('/', auth, async (req,res) => {
    console.log('POST request recibido');

    const { method } = req;
    const time = new Date().toLocaleString();
    logger.info(`Ruta '/productos' - con metodo: ${method} - time: ${time}`);

    const { name, description, code, thumbnail, price, stock } = req.body
    productosDao.save({ name, description, code, thumbnail, price, stock })
    .then(data => {
        res.json(data);
    })
});

// routerProductos.put('/:id', async (req,res) => {
//     const { method } = req;
//     const time = new Date().toLocaleString();
//     logger.info(`Ruta '/api/productos' - con metodo: ${method} - time: ${time}`);

//     console.log('PUT request recibido');
//     const id = Number(req.params.id);
//     const productoEncontrado = {};
//     productoEncontrado.timestamp = req.query.timestamp;
//     productoEncontrado.nombre = req.query.nombre;
//     productoEncontrado.descripcion = req.query.descripcion;
//     productoEncontrado.codigo = req.query.codigo;
//     productoEncontrado.foto = req.query.foto;
//     productoEncontrado.precio = req.query.precio;
//     productoEncontrado.stock = req.query.stock;

//     await productosDao.update(id,productoEncontrado);
//     // res.status(201).json({
//     //     result: 'Producto Actualizado',
//     //     id: req.params.id,
//     //     ProductoActualizado : productoEncontrado,        
//     // });
// });

routerProductos.delete('/:id', auth, async (req,res) => {
    console.log('DELETE request recibido');

    const { method } = req;
    const time = new Date().toLocaleString();
    
    const datosUsuario = await usuariosDao.getById(req.user._id);
    const user = datosUsuario.username;
    if (user.toLowerCase() !== 'pepe') {
        logger.info(`Acceso no Autorizado: Ruta '/productos' - con metodo: ${method} - time: ${time}`);
        return res.render('unauthorized')
    } 

    logger.info(`Ruta '/productos/:id' - con metodo: ${method} - time: ${time}`);
    
    let id = req.params.id  
    productosDao.deleteById(id) 
    .then(data => { 
        res.json(data);
    })
});

routerProductos.get("/edtiProduct/:id", auth, async (req, res) => {

    const { method } = req;
    const time = new Date().toLocaleString();
  
    const datosUsuario = await usuariosDao.getById(req.user._id);
    const user = datosUsuario.username;
    const id = req.params.id;
  
    const producto = await productosDao.getById(id);
  
    if (user.toLowerCase() !== 'pepe') {
      logger.info(`Acceso no Autorizado: Ruta '/edtiProduct' - con metodo: ${method} - time: ${time}`);
      return res.render('unauthorized')
    } 
  
    logger.info(`Ruta '/edtiProduct' - con metodo: ${method} - time: ${time}`);
    return res.render('edtiProduct', {id: id, producto: producto})
  
  });
  
  
  routerProductos.put("/edtiProduct", auth, async (req, res) => {
  
    const { method } = req;
    const time = new Date().toLocaleString();
  
    const datosUsuario = await usuariosDao.getById(req.user._id);
    const user = datosUsuario.username;
  
    if (user.toLowerCase() !== 'pepe') {
      logger.info(`Acceso no Autorizado: Ruta '/edtiProduct' - con metodo: ${method} - time: ${time}`);
      return res.render('unauthorized')
    } 
      
    const {_id, name, description, code, thumbnail, price, stock} = req.body
    
    productosDao.changeById(_id, { name, description, code, thumbnail, price, stock }) 
    .then(data => {
      logger.info(`Producto Editado: Ruta '/edtiProduct' - con metodo: ${method} - time: ${time}`);
      res.json(data) 
    })
    
  });

export default routerProductos;