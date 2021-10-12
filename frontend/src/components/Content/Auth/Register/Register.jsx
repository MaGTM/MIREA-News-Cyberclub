import React from "react";
import s from "./Register.module.css"
import {Field, formValueSelector, reduxForm} from "redux-form";
import {isMatch, maxLengthUser, minLengthPassword, minLengthUser, required} from "../../../../utils/formValidators";
import inputForm from "../../../common/forms/inputForm";
import {Redirect} from "react-router-dom";


// Components
const Register = (props) => {
    document.title = "Регистрация - МИРЭА"
    // if (props.loading) {
    //     return <Loading/>
    // }
    let submitForm = (data) => {
        props.createUser(data)
    }

    return (
        <div className={s.wrapper}>
            <div className={s.form_wrapper}>
                <h1>Регистрация</h1>
                <RegisterForm onSubmit={submitForm} result={true}/>
            </div>
        </div>
    )
}

let RegisterForm = (props) => {
    let jsxResult
    if(props.result === true) {
        jsxResult = <span className={s.auth + ' ' + s.successAuth}>Пользователь создан успешно</span>
    } else if(props.result === false) {
        jsxResult = <span className={s.auth + ' ' + s.errorAuth}>Что-то пошло не так, попробуйте снова :(</span>
    }
    return (
        <form onSubmit={props.handleSubmit}>
            <div className={s.fields}>
                <Field
                    name={"username"}
                    type={"text"}
                    placeholder={"Имя пользователя"}
                    validate={[required, maxLengthUser(30), minLengthUser(3)]}
                    component={inputForm}
                />
                <Field
                    name={"password"}
                    type={"password"}
                    placeholder={"Пароль"}
                    validate={[required, minLengthPassword(6)]}
                    component={inputForm}/>
                <Field
                    name={"password2"}
                    type={"password"}
                    placeholder={"Повторите пароль"}
                    validate={[required, isMatch]}
                    component={inputForm}/>
            </div>
            {jsxResult}
            <button>Зарегистрироваться</button>
        </form>
    )
}

RegisterForm = reduxForm({form: "registerForm"})(RegisterForm)


export default Register