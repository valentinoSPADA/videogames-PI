require("dotenv").config(); //Configuración para utilizar .env
const axios = require("axios");
const { Genre, Videogame } = require("../db");
const { API_KEY } = process.env;


const games = async () => {
    try {

        //Creo un array vacio donde estaran los juegos. Hago una variable page que sera la que traera los 15 juegos por pagina de la api
        //Por eso hago un while hasta el 6. Asi obtengo solo 100 juegos y no todos los que ofrece la api
        let totalGames = [];
        let page = 1;
        while (page < 6) {
            const gamesFromPage = await axios(`https://api.rawg.io/api/games?key=${API_KEY}&page=${page}`);
            let { results } = gamesFromPage.data;
            totalGames = totalGames.concat(results);
            page++;
        }
        return totalGames;
    }
    catch (err) {
        console.log(err);
    }
}


const gameDetail = async (id) => {
    try {
        const game = axios(`https://api.rawg.io/api/games/${id}?key=${API_KEY}`);
        return game;
    } catch (err) {
        console.log(err);
    }
}


const genreLoaded = async () => {
    try {
        //fijarse si la database esta vacia
        let gen = await Genre.count();
        //si esta vacia procedo a traer la informacion de la api
        if (gen === 0) {
            const genre = await axios(`https://api.rawg.io/api/genres?key=${API_KEY}`);
            const { results } = genre.data;
            //Itero cada uno de los resultados para extraer las propiedad name e ir asignando los valores a la tabla Genre
            for (let i = 0; i < results.length; i++) {
                const { name } = results[i];
                await Genre.create({
                    name: name
                });
            }
        }
    } catch (err) {
        console.log(err)
    }
}


const createGenreDB = async (req, res) => {
    await genreLoaded();
    res.status(200).json(await Genre.findAll());
}





const allGames = async (req, res) => {
    try {
        const list = await games();
        const videoGames = new Array();
        const countVideoGame = await Videogame.count();

        /* Si tengo Video juegos en la DB los pongo en un array para ser enviado */
        if (countVideoGame !== 0) {
            const game = await Videogame.findAll({ //Me traigo todos los datos de las DB incluida la de Generos
                attributes: ["id", "name", "rating", "background_image"],
                include: [Genre],
            });
            game.map((g) => {
                videoGames.push({
                    id: g.id,
                    name: g.name,
                    genres: g.genres.map((genre) => {
                        return {
                            id: genre.id,
                            name: genre.name,
                        };
                    }),
                    rating: g.rating,
                    background_image: g.background_image,
                });
            });
        }
        for (const game of list) { //de la lista de juegos que me traigo, extraigo los valores que necesito para luego pushear al array.
            const { id, name, background_image, genres, rating } = game;
            const genresArray = [];
            for (const genre of genres) { //de los generos que me traigo de la descripcion de la api, extraigo los valores para armar un array aparte para mí.
                const { name, id } = genre;
                genresArray.push({
                    id,
                    name,
                });
            }
            videoGames.push({
                id,
                name,
                background_image,
                genres: genresArray,
                rating,
            });
        }
        if (req.query.name) {
            const nameQuery = req.query.name.toLocaleLowerCase(); 
            encodeURI(nameQuery); 
            const arrayGames = [];
            let i = 0;

            try {
                const game = await axios(
                    `https://api.rawg.io/api/games?search=${nameQuery}&key=${API_KEY}`
                );

                const { results } = game.data;
                if (results.length === 0) { 
                    res.status(200).json({ error: "Game not found" });
                } else {
                    for (const result of results) { 
                        const { id, name, background_image, genres, rating } = result;
                        if (i < 15) { 
                            arrayGames.push({
                                id,
                                name,
                                background_image,
                                genres: genres.map((genre) => {
                                    return { name: genre.name, id: genre.id };
                                }),
                                rating
                            });
                            i++;
                        }
                    }
                    res.status(200).json(arrayGames);
                }
            } catch (error) {
                console.log(error);
            }
        } else {
            res.status(200).send(videoGames);
        }
    } catch (error) {
        console.log(error);
    }
}





const searchGame = async (req, res) => {

    const id = req.params.idVideogame

    if (id.length > 20) {
        let videogamesDB = await Videogame.findAll({  
            include: {
                model: Genre,
                attributes: ['name'],
                through: {
                    attributes: [],
                },
            }
        })
        const gameId = await videogamesDB.filter(i => i.id === id);
        gameId.length ?
            res.status(200).send(gameId) :
            res.status(404).send('Game not found');

    } else {
        const videogame = await gameDetail(id);
        if (videogame === undefined) {
            res.status(404).json({ error: "Game not found" });
        } else {
            const {
                id,
                name,
                background_image,
                description,
                released,
                rating,
                platforms,
                genres
            } = videogame.data;

            let game = [];

            game.push({
                id,
                name,
                background_image,
                description,
                released,
                rating,
                platforms: platforms.map((p) => ` -${p.platform.name}- `),
                genres: genres.map((g) => g.name)
            });
            res.status(200).json(game);
        }
    }
}





const createGame = async (req, res) => {
    try {

        const apikey = req.query.apikey
        if (apikey !== 'henry') {
            res.status(401).send('No autorizado')
        }
        const { name, background_image, description, released, rating, platforms, genres } = req.body;
        const newVideogame = await Videogame.create({
            name,
            background_image,
            description,
            platforms,
            rating,
            released,
        })
        const genre = await Genre.findAll({
            where: { name: genres },
        }
        )
        newVideogame.addGenre(genre)
        res.send('Videogame Successfully Created')
    } catch (error) {
        console.log(error)
    }
}





const allPlatforms = async (req, res) => {
    try {
        const lista = await games();
        const everyPlatforms = new Array();

        for (const plat of lista) {
            const { platforms } = plat;
            everyPlatforms.push(platforms)
        }

        const arrayPlat = new Array();

        for (let i = 0; i < everyPlatforms.length; i++) {
            everyPlatforms[i].map((p) => {
                arrayPlat.push(p.platform.name)
            })
        }

        const names = [...new Set(arrayPlat)]
        res.status(200).json(names)
    }
    catch (error) {
        console.log(error)
    }
}





module.exports = {
    createGenreDB,
    allGames,
    searchGame,
    createGame,
    allPlatforms,
}