import React from "react"
import {Redirect} from "react-router-dom";

export const withNoAuthRedirect = (Component) => {
    return (props) => {
        if (!props.isAuthenticated) return <Redirect to={"/login"}/>

        return <Component {...props}/>
    }
}