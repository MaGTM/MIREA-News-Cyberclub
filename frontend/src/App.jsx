import React from "react";
import {BrowserRouter, Route} from "react-router-dom";
import s from "./App.module.css"
import HeaderContainer from "./components/Header/HeaderContainer";
import HomeContainer from "./components/Content/Home/HomeContainer";
import LoginContainer from "./components/Content/Auth/Login/LoginContainer";
import RegisterContainer from "./components/Content/Auth/Register/RegisterContainer";
import Loading from "./components/common/Loading/Loading";

const App = (props) => {
    return (
        <BrowserRouter>
            <div className={s.wrapper}>
                <HeaderContainer/>
                <div className={s.content}>
                    <Route exact path={"/"} component={HomeContainer}/>
                    <Route path={"/login"} component={LoginContainer}/>
                    <Route path={"/register"} component={RegisterContainer}/>
                </div>
            </div>
        </BrowserRouter>
    )
}

export default App