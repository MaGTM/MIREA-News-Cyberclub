import React from 'react';
import s from './Header.module.css'
import logo from '../../assets/Logo.png'
import {NavLink} from "react-router-dom";

const Header = (props) => {
    return (
        <div className={s.wrapper}>
            <NavLink to={"/"}><img src={logo} alt="logo"/></NavLink>
            <div>
                <h1>НОВОСТИ</h1>
            </div>
            <div className={s.auth}>

                {/*<svg width="37.199" height="32.443"*/}
                {/*     viewBox="0 0 37.199 32.443">*/}
                {/*    <g transform="translate(-65.466 -56)">*/}
                {/*        <path d="M172.756,58a9,9,0,1,1-9-9A9,9,0,0,1,172.756,58Z"*/}
                {/*              transform="translate(-80.094 8)"*/}
                {/*              fill="none" stroke="#270949" stroke-linecap="round" stroke-linejoin="round"*/}
                {/*              stroke-miterlimit="10" stroke-width="2"/>*/}
                {/*        <path d="M275.38,274.46c8.874.47,15.8,4.373,15.8,9.12"*/}
                {/*              transform="translate(-189.515 -196.137)" fill="none" stroke="#270949"*/}
                {/*              stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10"*/}
                {/*              stroke-width="2"/>*/}
                {/*        <path d="M66.466,284.1c0-4.648,6.679-8.486,15.324-9.066"*/}
                {/*              transform="translate(0 -196.662)"*/}
                {/*              fill="none" stroke="#270949" stroke-linecap="round" stroke-linejoin="round"*/}
                {/*              stroke-miterlimit="10" stroke-width="2"/>*/}
                {/*    </g>*/}
                {/*</svg>*/}
                <div className={s.textAuth}>
                    <NavLink to={"/login"}><h3>Войти</h3></NavLink>
                    <svg>
                        <rect x="0.5" y="0.5" width="2" height="30"/>
                    </svg>
                    <NavLink to={"/register"}><h3>Регистрация</h3></NavLink>
                </div>
            </div>
        </div>
    )
}

export default Header;