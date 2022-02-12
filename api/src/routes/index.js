const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const { createGenreDB, allGames, searchGame, createGame, allPlatforms } = require('../functions/index.controllers')

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.get("/genres", createGenreDB);
router.get("/videogames", allGames);
router.get("/videogame/:idVideogame", searchGame)
router.post("/videogame", createGame)
router.get('/platforms', allPlatforms)


module.exports = router;
