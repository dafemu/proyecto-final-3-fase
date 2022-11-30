import { Router } from "express";
import logger from '../utils/logger.js';

const loginErrorRouter = Router();

loginErrorRouter.get("/", (req, res) => {
    const { method } = req;
    const time = new Date().toLocaleString();
    logger.info(`Ruta '/login-error' - con metodo: ${method} - time: ${time}`);

    res.render("login-error");
});

export default loginErrorRouter;