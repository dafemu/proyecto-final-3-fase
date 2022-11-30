import { Router } from "express";
import logger from '../utils/logger.js';
import passport from '../middlewares/passport.js';

const loginRouter = Router();

loginRouter.get("/", (req, res) => {
    const { method } = req;
    const time = new Date().toLocaleString();
    logger.info(`Ruta '/login' - con metodo: ${method} - time: ${time}`);

    res.render("login");
});

loginRouter.post("/",
    passport.authenticate("local", { failureRedirect: "/login-error" }), 
    (req, res) => {
        const { method } = req;
        const time = new Date().toLocaleString();
        logger.info(`Ruta '/login' - con metodo: ${method} - time: ${time}`);
        res.redirect("/datos");
    }
);

export default loginRouter;
 