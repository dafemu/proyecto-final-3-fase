import User from "../models/User.js";
import { Router } from "express";
import auth from "../middlewares/auth.js";
import logger from '../utils/logger.js';

const datosRouter = Router();

datosRouter.get("/", auth, async (req, res) => {
    const { method } = req;
    const time = new Date().toLocaleString();
    logger.info(`Ruta '/datos' - con metodo: ${method} - time: ${time}`);

    const datosUsuario = await User.findById(req.user._id).lean();
    res.render("datos", {
        datos: datosUsuario,
    });
});

export default datosRouter;