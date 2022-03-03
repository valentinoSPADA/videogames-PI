import {
    GET_GAMES,
    GET_GAME_DETAIL,
    ADD_NEW_GAME,
    FILTER_RATING,
    FILTER_CREATED,
    ALPHABETICAL_ORDER,
    GET_GAMES_BY_NAME,
    GET_GENRES,
    GET_PLATFORMS,
    FILTER_BY_GENRES,
    GET_DETAILS,
    
} from "../actions/actions.jsx";

const initialState = {
    videoGames: [],
    allVideogames: [],
    genres: [],
    platforms: [],
    detail: [],
    
};


function rootReducer(state = initialState, action) {
    switch (action.type) {
        case GET_GAMES:
            return {
                ...state,
                videoGames: action.payload,
                allVideogames: action.payload,
                loading: false
            }

         

        case GET_GAME_DETAIL:
            return {
                ...state,
                detail: action.payload
            }



        case ADD_NEW_GAME:
            return {
                ...state,
            };



        case FILTER_RATING:
            let games2 = [...state.videoGames]
            const sortGamesRating = action.payload === "top" ?
                games2.sort((a, b) => {
                    if (a.rating > b.rating) {
                        return -1
                    } else if (b.rating > a.rating) {
                        return 1
                    }
                    return 0
                }) : games2.sort((a, b) => {
                    if (b.rating > a.rating) {
                        return -1
                    } else if (a.rating > b.rating) {
                        return 1
                    }
                    return 0
                })
            return {
                ...state,
                videoGames: action.payload === 'rating' ? state.videoGames : sortGamesRating
            }



        case FILTER_CREATED:
            let games = [...state.videoGames]
            let filterCreated = action.payload === 'created' ? games?.filter(g => typeof g.id === "string") : games?.filter(g => typeof g.id === "number")
            return {
                ...state,
                videoGames: action.payload === 'all' ? games : filterCreated
            }



        case ALPHABETICAL_ORDER:
            let games1 = [...state.videoGames]
            const sortGamesAlphabetic = action.payload === "a-z" ?
                games1.sort((a, b) => {
                    if (a.name < b.name) {
                        return -1
                    } else if (b.name < a.name) {
                        return 1
                    }
                    return 0
                }) : games1.sort((a, b) => {
                    if (b.name < a.name) {
                        return -1
                    } else if (a.name < b.name) {
                        return 1
                    }
                    return 0
                })
            return {
                ...state,
                videoGames: action.payload === 'alpha' ? state.videoGames : sortGamesAlphabetic
            }



        case GET_GAMES_BY_NAME: {
            return {
                ...state,
                videoGames: action.payload
            }
        }



        case GET_GENRES: {
            return {
                ...state,
                genres: action.payload,
            };
        }



        case GET_PLATFORMS: {
            return {
                ...state,
                platforms: action.payload,
            };
        }



        case FILTER_BY_GENRES:
        let allGames = state.allVideogames;
        let genresFilter = action.payload.includes("All") ? allGames : allGames.filter(game => game.genres.map(genre=> genre.name).includes(action.payload))
        return {
            ...state,
            videoGames: genresFilter
        }



        case GET_DETAILS:{
            return{
                ...state,
                detail: action.payload,
            }
        }



        default:
            return state
    }

}

export default rootReducer;