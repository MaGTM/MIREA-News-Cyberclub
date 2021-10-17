import React from "react"
import s from "./Login.module.css"
import {Field, reduxForm} from "redux-form";
import inputForm from "../../../common/forms/inputForm";
import {required} from "../../../../utils/formValidators";
import {Redirect} from "react-router-dom";
import Loading from "../../../common/Loading/Loading";

let Login = (props) => {
    document.title = "Авторизация - МИРЭА"
    if (props.loading) {
        return <Loading/>
    }

    let submitForm = (data) => {
        props.loginUser(data)
    }

    return (
        <div className={s.wrapper}>

            <div className={s.form_wrapper}>
                <h1>Авторизация</h1>
                <LoginForm onSubmit={submitForm} result={props.result} setResult={props.setResult} token={props.token}/>
            </div>
        </div>
    )
}

let LoginForm = (props) => {

    if (props.token) return <Redirect to={"/"}/>

    return (
        <form onSubmit={props.handleSubmit}>
            <div className={s.fields}>
                <Field
                    name={"login"}
                    type={"text"}
                    placeholder={"Имя пользователя"}
                    validate={[required]}
                    component={inputForm}/>
                <Field
                    name={"password"}
                    type={"password"}
                    placeholder={"Пароль"}
                    validate={[required]}
                    component={inputForm}/>
            </div>
            {props.result && <span className={s.errorAuth}>{props.result}</span>}
            <button>Войти</button>
        </form>
    )
}

LoginForm = reduxForm({form: "LoginForm"})(LoginForm)

export default Login