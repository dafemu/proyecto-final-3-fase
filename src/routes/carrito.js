import { carritosDao } from '../daos/controller.js';
import { productosDao } from '../daos/controller.js';
import { usuariosDao } from '../daos/controller.js';

import auth from '../middlewares/auth.js';

import logger from '../utils/logger.js';

import { Router } from "express";

const routerCarrito = Router();

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

//Productos en el carrito
routerCarrito.get('/:id/productos', auth, (req, res) => {  
    const { method } = req;
    const time = new Date().toLocaleString();

    let id = req.params.id    
    carritosDao.getById(id)
    .then (data => { 
      logger.info(`Ruta '/carrito' - con metodo: ${method} - time: ${time}`);
      res.status(201).send(data.products)
    })
});

routerCarrito.post('/:id/productos', async (req,res) => {
    console.log('POSTcarrito dos request recibido');
    const {method} = req;
    const time = new Date().toLocaleString();
    
    let idCarrito = req.params.idCarrito  
    let idProducto = req.params.idProducto

    const product = await productosDao.getById(idProducto)
    
    carritosDao.addProduct(idCarrito, product)
    .then(data => {
        logger.info(`Ruta '/carrito' - con metodo: ${method} - time: ${time}`);
        res.status(201).json(data)
    }) 
});

routerCarrito.delete('/:id/productos/:id_prod', async (req,res) => {
    console.log('DELETE request recibido');
    const {method} = req;
    const time = new Date().toLocaleString();

    let idCarrito = req.params.idCarrito
    let idProducto = req.params.idProducto
    
    carritosDao.deleteProduct(idCarrito, idProducto)
    .then(data => {
        logger.info(`Ruta '/carrito' - con metodo: ${method} - time: ${time}`);
        res.status(201).json(data)
    })
});

routerCarrito.put("/buy", async (req, res) => {  
    const {method} = req;
    const time = new Date().toLocaleString();
  
    const datosUsuario = await usuariosDao.getById(req.user._id);
    const userName = datosUsuario.username; 
    const userMail = datosUsuario.email;
    const userPhone = datosUsuario.telefono;
  
    const carts = await carritosDao.getAll();
    const cart = carts.find(el => el.userId == req.user._id)
    const products = cart.products;
  
    const id = req.body.cartId 
  
    const data = {
      userName,
      userMail,
      products
    }
    
    newPurchase(data);
    sendSMS(userPhone);
  
    carritosDao.deleteAllProducts(id)
      .then(data => {
        logger.info(`Compra Realizada con Exito --> Ruta '/carrito' - con metodo: ${method} - time: ${time}`);
        res.redirect("/");
      }) 
});

export default routerCarrito;