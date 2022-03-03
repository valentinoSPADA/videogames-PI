import axios from 'axios';

export const GET_GAMES = 'GET_GAMES';
export const GET_GAME_DETAIL = 'GET_GAME_DETAIL';
export const ADD_NEW_GAME = 'ADD_NEW_GAME';
export const FILTER_RATING = 'FILTER_RATING';
export const FILTER_CREATED = 'FILTER_CREATED';
export const ALPHABETICAL_ORDER = 'ALPHABETICAL_ORDER';
export const GET_GAMES_BY_NAME = 'GET_GAMES_BY_NAME';
export const GET_GENRES = 'GET_GENRES';
export const GET_PLATFORMS = 'GET_PLATFORMS';
export const FILTER_BY_GENRES = 'FILTER_BY_GENRES';
export const GET_DETAILS = 'GET_DETAILS';


export function getGames() {
    return function(dispatch) {
        
        axios('http://localhost:3001/videogames')
        .then(res=>dispatch({
            type: GET_GAMES,
            payload: res.data
        })) 
    }
}

export function orderByRating(payload) {
    return {
        type: FILTER_RATING,
        payload
    }
}

export function filterCreated(payload) {
    return {
        type: FILTER_CREATED,
        payload
    }
}

export function alphabeticalOrder(payload) {
    return {
        type: ALPHABETICAL_ORDER,
        payload
    }
}

export const filterByGenres = (payload) => {
    console.log(payload);
    return {
        type: FILTER_BY_GENRES,
        payload,
    };
};

export const getGamesbyName = (name) => {
    return async function (dispatch) {
        try {
            var game = await axios.get(`http://localhost:3001/videogames?name=${name}`);
            return dispatch({
                type: GET_GAMES_BY_NAME,
                payload: game.data,
            });
        } catch (err) {
            console.log(err);
        }
    };
};


export const getGenres = () => {
    return async function (dispatch) {
        try {
            var genres = await axios("http://localhost:3001/genres")
            return dispatch({
                type: GET_GENRES,
                payload: genres.data
            });
        } catch (error) {
            console.log(error)
        }
    }
}

export const getPlatforms = () => {
    return async function (dispatch) {
        try {
            var platforms = await axios("http://localhost:3001/platforms")
            return dispatch({
                type: GET_PLATFORMS,
                payload: platforms.data,
            });
        } catch (error) {
            console.log(error)
        }
    }
}

export const addNewGame = (payload) => {
    console.log(payload)
    return async function () {
        try {
            var response = await axios.post("http://localhost:3001/videogame", payload)
            return response;
        } catch (error) {
            console.log(error)
        }
    }
}


export const getDetails = (id) => {
    return async function (dispatch) {
        var detail = await axios(`http://localhost:3001/videogame/${id}`)
        return dispatch({
            type: GET_DETAILS,
            payload: detail.data
        })
    }
}