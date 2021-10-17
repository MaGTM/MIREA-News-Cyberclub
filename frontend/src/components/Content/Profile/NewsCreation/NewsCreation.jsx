import React, {useState} from 'react'
import s from './NewsCreation.module.css'
import {Field, reduxForm} from "redux-form";
import {Redirect} from "react-router-dom";
import {maxLengthUser, required} from "../../../../utils/formValidators";
import NewsCreationInputForm from "../../../common/forms/newsCreationInputForm";
import Loading from "../../../common/Loading/Loading";
import NewsCreationTextareaForm from "../../../common/forms/newsCreationTextareaForm";

const maxLengthTitle = maxLengthUser(60)
const maxLengthDescription = maxLengthUser(127)
const maxLengthSource = maxLengthUser(30)

let NewsCreation = (props) => {
    let submitForm = (values) => {
        let data = {
            ...values,
            login: props.login,
            tags: values.tags.split(/[\s,]+/),
            id: props.userId
        }
        props.createNewArticle(data, props.token)
    }

    if (props.isLoading) {
        return <Loading/>
    }

    if(props.created) {
        props.isCreated()
        props.getUserData(props.userId)
        return <Redirect to={"/"} />
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
        <form onSubmit={props.handleSubmit}>
            <div className={s.contentCreation}>
                <div className={s.upperPart}>
                    <Field
                        name={"title"}
                        type="text"
                        maxLength="60"
                        component={NewsCreationInputForm}
                        placeholder={"Название"}
                        validate={[required, maxLengthTitle]}
                    />
                    <Field
                        name={"source"}
                        type="text"
                        maxLength="30"
                        component={NewsCreationInputForm}
                        placeholder={"Источник"}
                        validate={[required, maxLengthSource]}
                    />
                </div>
                <Field
                    name="description"
                    cols="50"
                    rows="5"
                    placeholder="Описание"
                    component={NewsCreationTextareaForm}
                    validate={[required, maxLengthDescription]}
                />
                <h4>Вводите теги через запятые и без пробелов</h4>
                <div className={s.tagsContainer}>
                    <Field
                        name={"tags"}
                        type="text"
                        component={NewsCreationInputForm}
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
                    component={NewsCreationTextareaForm}
                    validate={[required, maxLengthDescription]}
                />
                <Field
                    name={"coverImage"}
                    type="text"
                    component={NewsCreationInputForm}
                    placeholder={"Вставьте ссылку на картинку"}
                    validate={[required]}
                />


            </div>
            <button>Создать</button>
        </form>
    );

}

const NewsReduxForm = reduxForm({form: "newsCreationForm", touchOnBlur: false})(NewsForm)


export default NewsCreation