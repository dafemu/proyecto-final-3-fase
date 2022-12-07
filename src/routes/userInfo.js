import { Router } from 'express';
import auth from '../middlewares/auth.js';
import { usuariosDao } from '../daos/controller.js';

//declaro el router
const userInfoRouter = Router();

userInfoRouter.get("/", auth, async (req, res) => {  
  const userData = await usuariosDao.getById(req.user._id);
  res.render('user', {userData});
});

export default userInfoRouter;

