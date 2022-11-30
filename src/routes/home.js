import { Router } from "express";
import logger from '../utils/logger.js';

const homeRouter = Router();

homeRouter.get("/", (req, res) => {
    const { method } = req;
    const time = new Date().toLocaleString();
    logger.info(`Ruta '/home' - con metodo: ${method} - time: ${time}`);

    console.log("req", req.session);
    if (req.session.nombre) {
        res.redirect("/datos");
    } else {
        res.redirect("/login");
    }
});

export default homeRouter;