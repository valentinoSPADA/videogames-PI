
import React from "react";
import { Link } from "react-router-dom";
import navbar from './styles/index.module.css'

export default function NavBar() {
    return (
        <nav className={navbar.barra}>
            
            <Link to="/home" className={navbar.title} data-text='title'>HOME</Link>
            <div >
                <Link to="/created" className={navbar.create}> CREATE VIDEOGAME </Link>
            </div>
            <div >
                <Link to="/about" className={navbar.about}> ABOUT ME </Link>
            </div>
        </nav>
    );
}