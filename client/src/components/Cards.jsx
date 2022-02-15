import React from "react";
import style from './styles/Card.module.css'
import imagen from './images/image-not-found.png'
import { Link } from "react-router-dom";

const Cards = ({ name, id, img, genres }) => {

  return (

    <div className={style.card} key={id}>
      <Link className={style.link} to={'/videogame/' + id} id={id} key={id.toString()}>
      <div className={style.name}><b>{name}</b></div>
        <img src={img ? img : imagen} alt="games" className={style.img} />
      </Link>
      <div className={style.genre}>{genres.map((gen) => <p key={gen}>{gen}</p>)}
      </div>
    </div>
  );
};

export default Cards