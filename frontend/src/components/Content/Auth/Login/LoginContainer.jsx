import {connect} from "react-redux";
import Login from "./Login";
import {loginUser, setResult} from "../../../../redux/auth";

let mstp = (state) => {
    return {
        loading: state.auth.isLoading,
        result: state.auth.result,
        token: state.auth.token,
    }
}

export default connect(mstp, {loginUser, setResult})(Login)