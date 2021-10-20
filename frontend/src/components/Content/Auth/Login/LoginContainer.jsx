import {connect} from "react-redux";
import Login from "./Login";
import {loginUser} from "../../../../redux/auth";
import {withAuthRedirect} from "../../../common/hoc/withAuthRedirect";

let mstp = (state) => {
    return {
        loading: state.auth.isLoading,
        result: state.auth.result,
        token: state.auth.token,
        isAuthenticated: state.auth.isAuthenticated
    }
}

export default connect(mstp, {loginUser})(withAuthRedirect(Login))