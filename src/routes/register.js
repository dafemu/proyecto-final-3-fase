import { Router } from "express";
import User from "../models/User.js";
import bcrypt from "bcrypt";
import logger from '../utils/logger.js';

const registerRouter = Router();

registerRouter.get("/", (req, res) => {
    const { method } = req;
    const time = new Date().toLocaleString();
    logger.info(`Ruta '/register' - con metodo: ${method} - time: ${time}`);

    res.render("register");
});
  
registerRouter.post("/", (req, res) => {
    const { method } = req;
    const time = new Date().toLocaleString();
    logger.info(`Ruta '/register' - con metodo: ${method} - time: ${time}`);

    const { username, password, direccion } = req.body;
    User.findOne({ username }, async (err, user) => {
        if (err) console.log(err);
        if (user) res.render("register-error");
        if (!user) {
            const hashedPassword = await bcrypt.hash(password, 8);
            const newUser = new User({
                username,
                password: hashedPassword,
                direccion,
            });
            await newUser.save();
            res.redirect("/login");
        }
    });
});

export default registerRouter;