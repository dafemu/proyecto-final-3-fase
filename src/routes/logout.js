import { Router } from "express";
import User from "../models/User.js";
import logger from '../utils/logger.js';

const logoutRouter = Router();

logoutRouter.get("/", async (req, res) => {
  const { method } = req;
  const time = new Date().toLocaleString();
  logger.info(`Ruta '/logout' - con metodo: ${method} - time: ${time}`);

    req.logout(function (err) {
      if (err) {
        return next(err);
      }
      res.redirect("/");
    });
    // req.session.destroy(async (err) => {
    //   const datosUsuario = await User.findById(req.user._id).lean();
    //   if (!err) res.render('Logout', {datosUsuario}); 
    //   else res.send("Error");
    // });
});

export default logoutRouter;