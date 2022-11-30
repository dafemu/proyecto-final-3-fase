import { Router } from "express";
import minimist from "minimist";
import logger from '../utils/logger.js';

const infoRouter = Router();

/*----------- minimist -----------*/
const options = { alias: { p: "puerto", d: "debug" } };
const valueMinimist = minimist(process.argv.slice(2), options);

infoRouter.get("/", function (req, res) {
  const { method } = req;
  const time = new Date().toLocaleString();
  logger.info(`Ruta '/info' - con metodo: ${method} - time: ${time}`);

    res.send({
      Arguments: valueMinimist,
      OperatingSystem: process.platform,
      versionNode: process.version,
      routeFile: process.cwd(),
      processId : process.pid,
      executionPath : req.url,
      memory: process.memoryUsage().rss
    });
});

export default infoRouter;