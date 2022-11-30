import { Router } from "express";
import { fork } from "child_process";
import logger from '../utils/logger.js';

const randomRouter = Router();

randomRouter.get("/", function (req, res) {
  const { method } = req;
  const time = new Date().toLocaleString();
  logger.info(`Ruta '/api/randoms' - con metodo: ${method} - time: ${time}`);

  const cantidad = req.params.cant;
  const child = fork("../utils/random.js");

  child.send(["start", cantidad]);  
  child.on("message", (numRand) => {
    res.send(`La numero Random es ${numRand}`);
  });
});

export default randomRouter;