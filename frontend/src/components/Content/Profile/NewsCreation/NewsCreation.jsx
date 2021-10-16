import React, {useState} from 'react'
import s from './NewsCreation.module.css'
import {Field, reduxForm} from "redux-form";
import {Redirect} from "react-router-dom";
import {maxLengthUser, required} from "../../../../utils/formValidators";

const maxLengthTitle = maxLengthUser(60)
const maxLengthDescription = maxLengthUser(127)
const maxLengthSource = maxLengthUser(30)

let NewsCreation = (props) => {
    let submitForm = (values) => {
        // props.createArticle(values, props.token)
        console.log(values)
    }


    return (
        <div className={s.wrapper}>
            <h1>Создание статьи</h1>
            <NewsReduxForm onSubmit={submitForm} />
        </div>
    )
}


const NewsForm = (props) => {
    let [tagsArray, setTagsArray] = useState([])

    let tagsFunction = (input, value) => {
        setTagsArray(value.split(/[\s,]+/))
    }

    let tags = tagsArray.map((items) => {
        return <span>{items}</span>
    })


    return (
        <form id={s.form} onSubmit={props.handleSubmit}>
            <div className={s.contentCreation}>
                <div className={s.upperPart}>
                    <Field
                        name={"title"}
                        type="text"
                        maxLength="60"
                        component={"input"}
                        placeholder={"Название"}
                        validate={[required, maxLengthTitle]}
                    />
                    <Field
                        name={"source"}
                        type="text"
                        maxLength="30"
                        component={"input"}
                        placeholder={"Источник"}
                        validate={[required, maxLengthSource]}
                    />
                </div>
                <Field
                    name="description"
                    cols="50"
                    rows="5"
                    placeholder="Описание"
                    component={"textarea"}
                    validate={[required, maxLengthDescription]}
                />
                <h4>Вводите теги через запятые и без пробелов</h4>
                <div className={s.tagsContainer}>
                    <Field
                        name={"tags"}
                        type="text"
                        maxLength="30"
                        component={"input"}
                        placeholder={"Тэги"}
                        validate={[required]}
                        onChange={tagsFunction}
                    />
                    <div className={s.tags}>
                        {tags}
                    </div>
                </div>
                <Field
                    name="content"
                    cols="50"
                    rows="20"
                    placeholder="Полный текст"
                    component={"textarea"}
                    validate={[required, maxLengthDescription]}
                />
                <Field
                    name={"coverImage"}
                    type="text"
                    component={"input"}
                    placeholder={"Вставьте ссылку на картинку"}
                    validate={[required]}
                />


            </div>
            {/*{props.errorIs ? <div className={s.error}>Упс! Что-то пошло не так</div> : ""}*/}
            <button>Создать</button>
        </form>
    );

}

const NewsReduxForm = reduxForm({form: "newsCreationForm"})(NewsForm)


export default NewsCreation