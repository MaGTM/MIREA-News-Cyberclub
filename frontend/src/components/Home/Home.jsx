import React from 'react';
import s from './Home.module.css'
import newsBlockImage from '../../assets/photoForNewsBlock.jpg'
import {useState} from "react";

const Home = (props) => {
    return (
        <div className={s.wrapper}>
            <div className={s.filters}>
                <input type="text" placeholder={"Поиск"}/>
                <p>Выбрать месяц</p>
            </div>
            <div className={s.mainContent}>
                { [...Array(16)].map(() => <NewsItem /> ) }
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
            <img src={newsBlockImage} alt="" style={{opacity: blockHover ? "40%" : "100%", transition: '0.5s'}}/>
            <div className={s.newsBlockText}>
                <h2 style={{opacity: blockHover ? "0%" : "100%", transition: '0.3s'}}>Новость</h2>
                <p style={{opacity: blockHover ? "100%" : "0%", transition: '0.5s'}}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. In tempor libero enim, non malesuada
                    ex venenatis a. Vivamus et augue ipsum. Donec vitae massa cursus, vestibulum ex sed,
                    sagittis erat. Nam ex lorem, tempus vel mi id, congue interdum est. Phasellus nunc nisl,
                    egestas quis arcu in, consectetur molestie risus.</p>
            </div>
        </div>
    )
}

export default Home;