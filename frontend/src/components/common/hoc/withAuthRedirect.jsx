import React from "react"
import {Redirect} from "react-router-dom";

export const withAuthRedirect = (Component) => {
    return (props) => {
        if (props.isAuthenticated) return <Redirect to={"/"}/>

        return <Component {...props}/>
    }
}