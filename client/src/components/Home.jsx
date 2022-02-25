import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getGames, orderByRating, filterCreated, alphabeticalOrder, getGenres, filterByGenres, getGamesbyName } from '../redux/actions/actions.jsx';
import Cards from './Cards.jsx'
import style from './styles/home.module.css'
import { Link } from 'react-router-dom'
import SearchBar from './SearchBar.jsx';
import Paginado from './Paginado.jsx';

export default function Home() {


    const dispatch = useDispatch()
    const games = useSelector(state => state.videoGames)
    const allGenres = useSelector((state) => state.genres)


    useEffect(() => {
        dispatch(getGames())
    }, [])

    const [currentPage, setCurrentPage] = useState(1) //pagina en la que me encuentro en ese momento
    const videogamesPerPage = 15

    const positionOfLastVideogame = currentPage * videogamesPerPage; //1*15=15
    const positionOfFirstVideogame = positionOfLastVideogame - videogamesPerPage; //15-15=0

    //Como el Slice divide el array desde el primer parametro hasta el segundo parámetro (sin incluirlo) nos vamos a traer los juegos de a 15.
    const currentVideogames = games.slice(positionOfFirstVideogame, positionOfLastVideogame)

    const paginado = (pageNumber) => {
        setCurrentPage(pageNumber)
    }

    const handleFilterCreated = (e) => {
        e.preventDefault();
        dispatch(filterCreated(e.target.value))

    }


    const [order, setOrder] = useState('')
    const handleSortAlphabetical = (e) => {
        e.preventDefault();
        dispatch(alphabeticalOrder(e.target.value))
        setCurrentPage(1)//aviso que empezamos desde la pagina 1
        setOrder(`Ordenado ${e.target.value}`) //Este estado avisa que se hizo un ordenamiento y como solo se renderiza cuando ubo un cambio de estado o cambian las props, "forzamos" a que se renderice de nuevo la lista.
    }

    const handleSortRating = (e) => {
        e.preventDefault();
        dispatch(orderByRating(e.target.value))
        setCurrentPage(1)//aviso que empezamos desde la pagina 1
        setOrder(`Ordenado ${e.target.value}`) //Este estado avisa que se hizo un ordenamiento y como solo se renderiza cuando ubo un cambio de estado o cambian las props, "forzamos" a que se renderice de nuevo la lista.
    }

    useEffect(() => {
        dispatch(getGenres());
    }, [dispatch]);


    const handleFilterByGenres = (ev) => {
        ev.preventDefault();
        dispatch(filterByGenres(ev.target.name));
        setCurrentPage(1);
    };

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])


    return (
        <div className={style.div}>
            <div className={style.generos}>
                <div className={style.h2genre}>FILTER BY GENRE</div>
                <div className={style.bot}>
                    <button onClick={handleFilterByGenres} className={style.genre} name="All" key='All'>All</button>
                    {allGenres &&
                        allGenres.map((genres) => (
                            <button onClick={handleFilterByGenres} className={style.genre} name={genres.name} key={genres.name}>{genres.name}</button>
                        ))}
                </div>
            </div>
            <div>
                <div className={style.searchBar}>
                    <SearchBar key='SearchBar' />
                </div>
                <div className={style.filters}>
                    <div>
                        <p>Alphabetical Order </p>
                        <select onChange={handleSortAlphabetical} key='Alpha'>
                            <option value="alpha">All</option>
                            <option value="a-z">A-Z</option>
                            <option value="z-a">Z-A</option>
                        </select>
                    </div>
                    <div>
                        <p>Order by Rating </p>
                        <select onChange={handleSortRating} key='Rating'>
                            <option value="rating">All</option>
                            <option value="top">Top</option>
                            <option value="btt">Bottom</option>
                        </select>
                    </div>
                    <div>
                        <p>Filter by Created </p>
                        <select onChange={handleFilterCreated} key='Created'>
                            <option value="all" >All</option>
                            <option value="created">Created</option>
                            <option value="existing">Existing</option>
                        </select>
                    </div>
                </div>

                {currentVideogames.length > 0 ?
                    (<div>

                        <div className={style.total}>{

                            <div className={style.cardDiv}>
                                {currentVideogames?.map((g) => (
                                    <Cards
                                        id={g.id}
                                        key={g.id.toString()}
                                        name={g.name.toUpperCase()}
                                        img={g.background_image}
                                        genres={g.genres.map((gen) => {
                                            return `${gen.name}`
                                        })}
                                        rating={g.rating}
                                    />
                                )
                                )}
                            </div>
                        }
                        </div>
                        <div className={style.contenedorChico}>
                            <Paginado
                                videogamesPerPage={videogamesPerPage}
                                allVideoGames={games.length}
                                paginado={paginado}
                                key='Paginado'
                            />
                        </div>
                    </div>
                    )
                    :
                    (<div className={style.load}>
                        <div className={style.spinner}>
                            
                        </div>
                    </div>
                    )
                }
            </div>
        </div>
    )
}
