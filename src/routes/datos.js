import User from "../models/User.js";
import { Router } from "express";
import auth from "../middlewares/auth.js";
import logger from '../utils/logger.js';

const datosRouter = Router();

datosRouter.get("/", auth, async (req, res) => {
    const { method } = req;
    const time = new Date().toLocaleString();  

    const carts = await carritosDao.getAll()
    const cart = carts.find(el => el.userId == req.user._id) 

    if (!cart) {
        const newCart = await carritosDao.save(req.user._id)    
        const productos = await productosDao.getAll();    
        const datosUsuario = await usersDao.getById(req.user._id);    
        logger.info(`Ruta '/' - con metodo: ${method} - time: ${time}`);
        res.render("home", {
            userData : datosUsuario,
            productos,
            cart: newCart
        });
    }else{
        const productos = await productosDao.getAll();
        const datosUsuario = await usersDao.getById(req.user._id);  
        logger.info(`Ruta '/' - con metodo: ${method} - time: ${time}`);
        res.render("home", {
            userData : datosUsuario,      
            productos,
            cart
        });
    }
});

export default datosRouter;