import { Router } from "express";
const router = Router();

import datos from "./datos.js";
import info from "./info.js";
import loginError from "./login-error.js";
import login from "./login.js";
import logout from "./logout.js";
import random from "./random.js";
import register from "./register.js";
import home from "./home.js";
import productos from "./productos.js";
import carrito from "./carrito.js";
import error from "./error.js";
import sessions from './sessions.js';
import userInfo from './userInfo.js';
import users from './userRouter.js'

//routas
router.use("/datos", datos);
router.use("/info", info);
router.use("/login-error", loginError);
router.use("/login", login);
router.use("/logout", logout);
// router.use("/register", register);
router.use("/register", users);
router.use("/", home);
router.use("/api/randoms", random);
router.use('/api/productos', productos);
router.use('/api/carrito', carrito);
router.use("/sessions", sessions); 
router.use("/user", userInfo);

router.use("*", error);

export default router;