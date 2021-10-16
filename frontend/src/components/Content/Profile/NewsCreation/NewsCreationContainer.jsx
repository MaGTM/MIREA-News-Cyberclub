import {connect} from "react-redux";
import {withRouter} from "react-router-dom";
import {withAuthRedirect} from "../../../common/hoc/withAuthRedirect";
import NewsCreation from "./NewsCreation";

let mstp = (state) => {
    return {
        isAuthenticated: state.auth.isAuthenticated,
    }
}

export default connect(mstp, {})(withRouter(withAuthRedirect(NewsCreation)))