import React from "react";
import style from './styles/index.module.css'

export default function Paginado ({videogamesPerPage, allVideoGames, paginado}){
    /* Declaro un array vacio donde voy a ir colocando los indices de cada pagina que necesite.
    Con el bucle for voy a ir determinando cuales van a ser los numeros que va a tener mi paginado:
        .Math.ceil: redondea el resultado de mi operacion hacia arriba (6,7 => 7)
        .Inicio i=1 para que el primer numero del paginado sea 1
        .Al dividir la cantidad de video juegos que tengo por la cantidad que quiero por pagina estoy haciendo referencia a la cantidad de paginas totales que voy a necesitar para resolver el paginado. [Math.ceil(100/15) = 7]
    */


    const numbers=[]
    



    for (let index = 1; index <= Math.ceil(allVideoGames/videogamesPerPage); index++) {
        numbers.push(index);
    }

    return(
        <div className={style.cont}>
                {numbers?.map(n =>(
                    <button key={n} onClick={()=> paginado(n)}>
                        {n}
                    </button>
                ))}
        </div>
    )
}