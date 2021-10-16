import {connect} from "react-redux";
import {withRouter} from "react-router-dom";
import {withAuthRedirect} from "../../../common/hoc/withAuthRedirect";
import News from "./News";

let mstp = (state) => {
    return {

    }
}

export default connect(mstp, {})(withRouter(withAuthRedirect(News)))