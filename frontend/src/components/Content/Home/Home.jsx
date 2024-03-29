import React from 'react';
import s from './Home.module.css'
import {useState} from "react";
import {NavLink, Redirect} from "react-router-dom";
import Loading from "../../common/Loading/Loading";

const Home = (props) => {
    let currentPage =  Number(props.match.params.page)


    if (props.loading) {
        return <Loading/>
    }

    let itemsArray = props.items.map((i) => {
        return <NavLink to={`/news/${i.id}`}><NewsItem title={i.title} coverImage = {i.coverImage} description = {i.description}/></NavLink>
    })
    let pagesArray = []

    for(let i = 1; i <= Math.ceil(props.length/12); i++) {
        pagesArray.push(<NavLink to={`/articles/${i}`} className={s.pagesLink} activeClassName={s.active}>{i}</NavLink>)
    }

    let start = () => {
        if(currentPage-5 < 0) {
            return 0
        } else {
            if(currentPage+5 > pagesArray.length) {
                return currentPage-5-((currentPage+5)-(pagesArray.length))
            } else {
                return currentPage-5
            }
        }
    }

    let end = () => {
        if(currentPage+5 > pagesArray.length) {
            return pagesArray.length
        } else {
            if(currentPage-5 < 0) {
                return currentPage+5+(-(currentPage-5))
            } else {
                return currentPage+5
            }
        }
    }
    let height

    if(window.innerWidth >= 1570) {
        height = Math.ceil(itemsArray.length/4)*397.5
    }
    else if (window.innerWidth >= 1310){
        height = Math.ceil(itemsArray.length/3)*397.5
    }
    else if (window.innerWidth >= 750){
        height = Math.ceil(itemsArray.length/2)*397.5
    }
    else if (window.innerWidth < 750){
        height = Math.ceil(itemsArray.length)*397.5
    }
    return (
        <div className={s.wrapper}>
            <div className={s.mainContent} style={{height: height}}>
                {itemsArray}
            </div>
            <div className={s.pages} style={pagesArray.length < 10 ? {width: 50 * pagesArray.length} : {width: "350px"}}>{pagesArray.slice(start(), end())}</div>
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