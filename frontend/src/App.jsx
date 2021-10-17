import React from "react";
import {BrowserRouter, Route} from "react-router-dom";
import s from "./App.module.css"
import HeaderContainer from "./components/Header/HeaderContainer";
import HomeContainer from "./components/Content/Home/HomeContainer";
import LoginContainer from "./components/Content/Auth/Login/LoginContainer";
import RegisterContainer from "./components/Content/Auth/Register/RegisterContainer";
import ProfileContainer from "./components/Content/Profile/ProfileContainer";
import NewsCreationContainer from "./components/Content/Profile/NewsCreation/NewsCreationContainer";
import ArticleContainer from "./components/Content/Home/Article/ArticleContainer";

const App = (props) => {
    return (
        <BrowserRouter>
            <div className={s.wrapper}>
                <HeaderContainer/>
                <div className={s.content}>
                    <Route exact path={"/"} component={HomeContainer}/>
                    <Route exact path={"/news/:id"} component={ArticleContainer}/>
                    <Route path={"/login"} component={LoginContainer}/>
                    <Route path={"/register"} component={RegisterContainer}/>
                    <Route exact path={"/profile"} component={ProfileContainer}/>
                    {/*<Route path={"/profile/news/:id"} component={}/>*/}
                    <Route path={"/profile/creation"} component={NewsCreationContainer}/>
                </div>
            </div>
        </BrowserRouter>
    )
}

export default App