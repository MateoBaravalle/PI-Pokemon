const { Router } = require("express");
const axios = require("axios");
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const pokemonRouter = require("../handlers/pokemonHandler.js");
const userRouter = require("../handlers/userHandler.js");
const typeRouter = require("../handlers/typeHandler.js");

const router = Router();
// Configurar los routers
router.use("/", pokemonRouter);
router.use("/", userRouter);
router.use("/", typeRouter);
// Hay que agregar el resto de modulos de rutas

module.exports = router;
