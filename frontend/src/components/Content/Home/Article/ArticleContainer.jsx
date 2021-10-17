import React from "react"
import {connect} from "react-redux"
import {compose} from "redux";
import Article from "./Article";
import {getCurrentArticle} from "../../../../redux/news";

class ArticleContainer extends React.Component {
    constructor(props) {
        super(props);
        this.props.getCurrentArticle(this.props.match.params.id)
    }

    render() {
        return <Article {...this.props}/>
    }
}

let mstp = (state) => {
    return {
        loading: state.news.isLoading,
        items: state.news.item,
        article: state.news.article
    }
}

export default compose(
    connect(mstp, {getCurrentArticle})
)(ArticleContainer)