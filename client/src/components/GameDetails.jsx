import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDetails } from '../redux/actions/actions'
import { Link, useParams } from 'react-router-dom'
import image from './images/image-not-found.png'
import style from './styles/detail.module.css'

const divStyle = {
    textDecoration: "none",
};

export default function Details() {
    const dispatch = useDispatch()
    let { id } = useParams()


    useEffect(() => {
        dispatch(getDetails(id))
    }, [dispatch, id])

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    let details = useSelector((state) => state.detail)


    return (
        <div className={style.cont}>
            {details ?
                <div className={style.card}>
                    <img src={details[0]?.background_image ? details[0].background_image : image} className={style.img} alt="Not Found" />
                    <h1 className={style.title}>{details[0]?.name}</h1>
                    <div className={style.genres}>
                        <p>GENRES</p>
                        {details[0]?.genres?.map((gen) => gen?.name ?
                            <h2 key={gen.name}>{gen.name + ' '}</h2> : <h2 key={gen}>{gen + ' '}</h2>)
                        }
                    </div>
                    <div className={style.p}>
                        <div className={style.re}>
                            <p> RELEASED</p>
                            <h2>{details[0]?.released}</h2>
                        </div>
                        <div className={style.ra}>
                            <p>RATING</p>
                            <h2>{details[0]?.rating}</h2>
                        </div>
                        <div className={style.pl}>
                            <p>PLATFORMS</p>
                            <h2>{details[0]?.platforms} </h2>
                        </div>
                        <div className={style.ds}>
                            <p>DESCRIPTION</p>
                            <h2
                                dangerouslySetInnerHTML={{
                                    __html: details[0]?.description,
                                }}
                            ></h2>
                        </div>
                    </div>
                    <Link to="/home" style={divStyle}>
                        <button className={style.button}>BACK HOME</button>
                    </Link>
                </div>
                :
                <div>
                    <div>
                        <h1> Game not found</h1>
                        <Link to="/home" style={divStyle}>
                        <button className={style.button}>BACK HOME</button>
                    </Link>
                    </div>
                </div>
            }
        </div>
    )

}