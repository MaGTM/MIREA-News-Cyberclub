import React from 'react';
import s from './Home.module.css'
import newsBlockImage from '../../../assets/photoForNewsBlock.jpg'
import {useState} from "react";
import {NavLink} from "react-router-dom";

const Home = (props) => {
    let itemsArray = props.items.map((i) => {
        return <NavLink to={`/news/${i.id}`}><NewsItem title={i.title} coverImage = {i.coverImage} description = {i.description}/></NavLink>
    })

    let height = Math.ceil(itemsArray.length/4)*397.5
    return (
        <div className={s.wrapper}>
            <div className={s.filters}>
                <input type="text" placeholder={"Поиск"}/>
                <p>Выбрать месяц</p>
            </div>
            <div className={s.mainContent} style={{height: height}}>
                {itemsArray}
            </div>
        </div>
    )
}

let NewsItem = (props) => {
    let [blockHover, setBlockHover] = useState(false)

    let changeSetBlockHover = () => {
        switch (blockHover) {
            case true:
                setBlockHover(false)
                break
            case false:
                setBlockHover(true)
                break
            default:
                break
        }
    }
    return (
        <div className={s.newsBlock} onMouseEnter={changeSetBlockHover} onMouseLeave={changeSetBlockHover}>
            <img src={props.coverImage} alt="" style={{opacity: blockHover ? "40%" : "100%", transition: '0.5s'}}/>
            <div className={s.newsBlockText}>
                <h2 style={{opacity: blockHover ? "0%" : "100%", transition: '0.3s'}}>{props.title}</h2>
                <p style={{opacity: blockHover ? "100%" : "0%", transition: '0.5s'}}>{props.description}</p>
            </div>
        </div>
    )
}

export default Home;