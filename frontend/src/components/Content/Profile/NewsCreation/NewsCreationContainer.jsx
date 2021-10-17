import {connect} from "react-redux";
import {withRouter} from "react-router-dom";
import {withAuthRedirect} from "../../../common/hoc/withAuthRedirect";
import NewsCreation from "./NewsCreation";
import {createNewArticle, getUserData, isCreated} from "../../../../redux/profile";

let mstp = (state) => {
    return {
        isAuthenticated: state.auth.isAuthenticated,
        isLoading: state.profile.isLoading,
        token: state.auth.token,
        created: state.profile.isCreated,
        login: state.auth.username,
        userId: state.auth.userId,
        newsBlocksId: state.profile.newsBlocksId,
    }
}

export default connect(mstp, {createNewArticle, isCreated, getUserData})(withRouter(withAuthRedirect(NewsCreation)))