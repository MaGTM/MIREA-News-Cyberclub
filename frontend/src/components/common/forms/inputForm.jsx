import React from "react"
import s from "./inputForm.module.css"

const inputForm = ({input, meta, ...props}) => {
    const hasError = meta.touched && meta.error
    console.log(hasError)
    return (
        <div className={s.wrapper}>
            <input {...input} {...props} style={hasError ? {boxShadow: '0 0 8px 0 #fa6767', border: 0} : {border: '1px black solid'}}/>
        </div>
    )
}


export default inputForm