import { Router } from 'express';
import auth from '../middlewares/auth.js';

import { usuariosDao } from '../daos/controller.js';

import logger from '../utils/logger.js';

const sessionsRouter = Router();

sessionsRouter.get("/", auth, async (req, res) => {
  const { method } = req;
  const time = new Date().toLocaleString();
  logger.info(`Ruta '/sessions' - con metodo: ${method} - time: ${time}`);

  const datosUsuario = await usuariosDao.getById(req.user._id);
  const user = datosUsuario.username;
  res.status(201).json({ data: user })

});

export default sessionsRouter;
