import {connect} from "react-redux"
import {compose} from "redux";
import Register from "./Register";
import {createUser} from "../../../../redux/auth";
import {withAuthRedirect} from "../../../common/hoc/withAuthRedirect";



let mstp = (state) => {
    return {
        loading: state.auth.isLoading,
        result: state.auth.result,
        isAuthenticated: state.auth.isAuthenticated
    }
}

export default compose(
    connect(mstp, {createUser})
)(withAuthRedirect(Register))