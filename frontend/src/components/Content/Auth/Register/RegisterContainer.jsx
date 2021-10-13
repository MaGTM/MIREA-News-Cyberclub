import {connect} from "react-redux"
import {compose} from "redux";
import Register from "./Register";
import {createUser} from "../../../../redux/auth";



let mstp = (state) => {
    return {
        loading: state.auth.isLoading,
        result: state.auth.result,
    }
}

export default compose(
    connect(mstp, {createUser})
)(Register)