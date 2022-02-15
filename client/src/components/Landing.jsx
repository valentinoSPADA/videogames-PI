import React from 'react';
import { Link } from 'react-router-dom';
import style from './styles/Landing.module.css'


function Landing() {
    return (
        <div className={style.div}>
        <div className={style.title}>
            <div className={style.h4}>
                WELCOME TO THE
            </div>
            <div className={style.h3}>
            <b>
                VIDEOGAME APLICATION
                </b>
            </div>
            </div>
            <Link to="/home">
                <button className={style.button}>
                    HOME
                </button>
            </Link>
            <div className={style.h6}>
                proyecto individual SoyHenry
            </div>

        </div>
    )
}

export default Landing