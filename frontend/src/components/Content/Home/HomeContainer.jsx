import {connect} from "react-redux"
import {compose} from "redux";
import Home from "./Home";
import {getNews} from "../../../redux/news";
import React from "react"

class HomeContainer extends React.Component {
    constructor(props) {
        super(props);
        this.props.getNews()
    }

    componentDidMount() {
        document.title = "Новостной Сайт"
    }

    render() {
        return <Home {...this.props}/>
    }
}

let mstp = (state) => {
    return {
        loading: state.news.isLoading,
        items: state.news.items,
    }
}

export default compose(
    connect(mstp, {getNews})
)(HomeContainer)