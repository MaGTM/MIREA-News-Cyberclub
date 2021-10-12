import React from "react"
import s from "./Login.module.css"
import {Field, reduxForm} from "redux-form";
import inputForm from "../../../common/forms/inputForm";
import {required} from "../../../../utils/formValidators";
import {Redirect} from "react-router-dom";

let Login = (props) => {
    document.title = "Login"
    // if (props.loading) {
    //     return <Loading/>
    // }

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
    let jsxResult
    switch (props.result) {
        case "User does not exists":
            jsxResult = <span className={s.auth + ' ' + s.errorAuth}>{props.result}</span>
            break
        case "Username or Password is incorrect":
            jsxResult = <span className={s.auth + ' ' + s.errorAuth}>{props.result}</span>
            break
        case "User authenticated":
            props.setResult(null)
            break
    }

    if (props.token) return <Redirect to={"/"}/>

    return (
        <form onSubmit={props.handleSubmit}>
            <div className={s.fields}>
                <Field
                    name={"username"}
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
            {jsxResult}
            <button>Login</button>
        </form>
    )
}

LoginForm = reduxForm({form: "LoginForm"})(LoginForm)

export default Login