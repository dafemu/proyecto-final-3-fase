import { Router } from "express";
import logger from '../utils/logger.js';


//declaro el router
const errorRouter = Router();

errorRouter.get("*", (req, res) => {
  const { url, method } = req;      
  logger.warn(`Ruta ${url} con método ${method} no implementada`);  
  res.json({ error : -2, descripcion: `ruta inexistente` })
});

errorRouter.post("*", (req, res) => {  
  const { url, method } = req;      
  logger.warn(`Ruta ${url} con método ${method} no implementada`);  
  res.json({ error : -2, descripcion: `ruta inexistente` })
});

errorRouter.delete("*", (req, res) => { 
  const { url, method } = req;      
  logger.warn(`Ruta ${url} con método ${method} no implementada`);   
  res.json({ error : -2, descripcion: `ruta inexistente` })
});

errorRouter.put("*", (req, res) => {  
  const { url, method } = req;      
  logger.warn(`Ruta ${url} con método ${method} no implementada`);  
  res.json({ error : -2, descripcion: `ruta inexistente` })
});

export default errorRouter;