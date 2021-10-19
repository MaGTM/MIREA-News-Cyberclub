import {connect} from "react-redux"
import {compose} from "redux";
import Home from "./Home";
import {getCurrentLength, getNews} from "../../../redux/news";
import React from "react"

class HomeContainer extends React.Component {
    constructor(props) {
        super(props);
        this.props.getCurrentLength()
        if(this.props.match.params.page) {
            this.props.getNews(this.props.match.params.page)
        } else {
            this.props.getNews(1)
        }
    }

    componentDidMount() {
        document.title = "Новости - МИРЭА"
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if(this.props.match.params.page !== prevProps.match.params.page) {
            if(this.props.match.params.page) {
                this.props.getNews(this.props.match.params.page)
            } else {
                this.props.getNews(1)
            }
        }
    }

    render() {
        return <Home {...this.props}/>
    }
}

let mstp = (state) => {
    return {
        loading: state.news.isLoading,
        items: state.news.items,
        length: state.news.length
    }
}

export default compose(
    connect(mstp, {getNews, getCurrentLength})
)(HomeContainer)