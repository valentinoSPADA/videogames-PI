
import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { getGamesbyName } from "../redux/actions/actions";
import style from './styles/index.module.css'

export default function SearchBar() {
    const dispatch = useDispatch()
    const [name, setName] = useState('')

    const handleChange = (e) => {
        e.preventDefault()
        setName(e.target.value)
    }

    const handleClick = (e) => {
        e.preventDefault()
        dispatch(getGamesbyName(name))
        setName('')
    }

    return (
        <div className={style.search}>
            <input type='text' className={style.searchInput} placeholder='Search Video Game' onChange={handleChange} value={name} />
            <button type='submit' onClick={handleClick} className={style.searchButton}>Search</button>
        </div>
    )
}