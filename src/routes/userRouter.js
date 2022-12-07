import { Router } from 'express';

const usersRouter = Router();

import logger from '../utils/logger.js';
import sendMail from '../middleware/nodemailer.js';

import upload from '../middlewares/multer.js';

import { usuariosDao } from '../daos/controller.js';


usersRouter.get("/", (req, res) => {  

  const { method } = req;
  const time = new Date().toLocaleString();
  logger.info(`Ruta '/register' - con metodo: ${method} - time: ${time}`);

  res.render('register'); 
});


usersRouter.post("/", upload.single("myFile"), (req, res) => {

  const { method } = req;
  const time = new Date().toLocaleString();

  const file = req.file;
  const image = file.filename;
  
  const { username, edad, telefono, direccion, password, email } = req.body;
  usuariosDao.save({username, email, edad, telefono, direccion, password, image })
  .then (user => {
    if(user){
      sendMail(user);  
      logger.info(`Registro Exitoso: Ruta '/register' - con metodo: ${method} - time: ${time}`);      
      return res.render('succes');
    }else{
      logger.warn(`Registro Fallido: Ruta '/register' - con metodo: ${method} - time: ${time}`);
      res.render('error', {error: 'Usuario ya registrado', url: 'register' });
    }
  })

});

usersRouter.delete("/:id", (req, res) => {   
  let id = req.params.id  
  usuariosDao.deleteById(id) 
  .then(data => { 
    res.json(data);
  })
});

usersRouter.put("/:id", (req, res) => {
    let id = req.params.id
    const { username, email, password } = req.body
    usuariosDao.update(id, { username, email, password }) 
    .then(data => {
      res.json(data);
    })
  
});


export default usersRouter;

