import React from 'react';
import s from './newsCreationTextareaForm.module.css'

const NewsCreationTextareaForm = ({input, meta, ...props}) => {
    const hasError = meta.touched && meta.error
    return (
        <div className={s.wrapper}>
            <textarea {...input} {...props} style={hasError ? {boxShadow: '0 0 8px 0 #fa6767', border: '1px white solid'} : {border: '1px black solid'}}/>
        </div>
    )
}

export default NewsCreationTextareaForm;