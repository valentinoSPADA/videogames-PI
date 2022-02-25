import React from "react";
import style from './styles/Card.module.css'
import imagen from './images/image-not-found.png'
import { Link } from "react-router-dom";

const Cards = ({ name, id, img, genres }) => {

  return (

    <div className={style.card} key={id}>
      <div className={style.name}>{name}</div>
      <img src={img ? img : imagen} alt="games" className={style.img} />
      <div className={style.link}>
        <Link to={'/videogame/' + id} className={style.link2} id={id} key={id.toString()}>
          more details
        </Link>
      </div>
      <p className={style.p}> genres: </p>
      <hr className={style.hr}/>
      <div className={style.genre}>{genres.map((gen) => <p key={gen}>{gen}</p>)}
      </div>
    </div>
  );
};

export default Cards