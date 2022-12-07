import { Router } from "express";
import User from "../models/User.js";
import logger from '../utils/logger.js';
import { usuariosDao } from '../daos/controller.js';

const logoutRouter = Router();

logoutRouter.get("/", async (req, res) => {
  const datosUsuario = await usuariosDao.getById(req.user._id);
  const user = datosUsuario.username;

  req.session.destroy((err) => {
    if (!err) {
      const { method } = req;
      const time = new Date().toLocaleString();
      logger.info(`Ruta '/logout' - con metodo: ${method} - time: ${time}`);

      res.render('logout', {user});
    }
    else res.send("Error");
  });

});

export default logoutRouter;