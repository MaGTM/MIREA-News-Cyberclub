import {connect} from "react-redux";
import {withRouter} from "react-router-dom";
import {withNoAuthRedirect} from "../../../common/hoc/withNoAuthRedirect";
import News from "./News";

let mstp = (state) => {
    return {

    }
}

export default connect(mstp, {})(withRouter(withNoAuthRedirect(News)))