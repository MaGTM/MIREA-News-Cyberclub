import React from "react"
import Header from "./Header";
import {connect} from "react-redux"
import {getUser, setUserData} from "../../redux/auth";

class HeaderContainer extends React.Component {
    constructor(props) {
        super(props);
        if (localStorage.getItem('token')) {
            this.props.setUserData(localStorage.getItem('userId'), localStorage.getItem('token'), true)
        }
    }

    componentDidUpdate() {
        if(this.props.token) {
            this.props.getUser(this.props.userId)
        }
    }

    render() {
        return <Header {...this.props}/>
    }
}

let mstp = (state) => {
    return {
        userId: state.auth.userId,
        isAuthenticated: state.auth.isAuthenticated,
        username: state.auth.username,
        token: state.auth.token
    }
}
export default connect(mstp, {setUserData, getUser})(HeaderContainer)