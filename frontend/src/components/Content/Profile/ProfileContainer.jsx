import Profile from "./Profile"
import React from "react"
import {getUserData, getUserNewsData} from "../../../redux/profile"
import {connect} from "react-redux"
import { withAuthRedirect } from "../../common/hoc/withAuthRedirect"
import Loading from "../../common/Loading/Loading";


class ProfileContainer extends React.Component {
    componentDidMount() {
        this.props.getUserData(this.props.userId)
    }

    componentDidUpdate() {
        if(this.props.newsBlocksId && this.props.newsBlocks === null) {
            this.props.getUserNewsData(this.props.newsBlocksId, this.props.token)
        }
    }

    render() {
        if(this.props.isLoading) {
            return <Loading />
        }
        return <Profile {...this.props}/>
    }
}

let mstp = (state) => {
    return {
        login: state.profile.login,
        newsBlocksId: state.profile.newsBlocksId,
        isLoading: state.profile.isLoading,
        userId: state.auth.userId,
        isAuthenticated: state.auth.isAuthenticated,
        newsBlocks: state.profile.newsBlocks,
        token: state.auth.token
    }
}

export default connect(mstp, {getUserData, getUserNewsData})(withAuthRedirect(ProfileContainer))