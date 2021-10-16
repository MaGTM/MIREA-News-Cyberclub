import React from 'react';
import s from './Profile.module.css'
import avatar from '../../../assets/emptyUser.jpg'
import {NavLink} from "react-router-dom";

const Profile = (props) => {
    let itemsArray
    if(props.newsBlocks !== null) {
        itemsArray = props.newsBlocks.map((i) => {
            return <NavLink to={`/profile/news/${i.id}`}><ProfileNewsItem title={i.title}/></NavLink>
        })
    }
    return (
        <div className={s.wrapper}>
            <div className={s.userBlock}>
                <img src={avatar} alt={props.login}/>
                <div>
                    <h2>{props.login}</h2>
                    <h3 onClick={props.logoutUser}>Выйти</h3>
                </div>
            </div>
            <NavLink to={'/profile/creation'}>Новая новость</NavLink>
            <div className={s.newsBlock}>
                {itemsArray}
            </div>

        </div>
    )
}

const ProfileNewsItem = (props) => {
    return (
        <div className={s.newsBlockItem}>
            {props.title}
            <p>Подробнее -></p>
        </div>
    )
}

export default Profile;