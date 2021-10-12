import React from "react";
import s from "./Loading.module.css"

const Loading = (props) => {
    return (
        <div className={s.wrapper}>
            <ul>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
            </ul>
        </div>
    )
}

export default Loading