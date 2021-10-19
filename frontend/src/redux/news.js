import {newsAPI} from "../api/api"

const IS_LOADING = "IS_LOADING"
const SET_ITEMS = "SET_ITEMS"
const SET_ARTICLE = "SET_ARTICLE"
const SET_LENGTH = "SET_LENGTH"

let initialState = {
    isLoading: true,
    items: [],
    article: {},
    length: null
}

let news= (state = initialState, action) => {
    switch (action.type) {
        case IS_LOADING:
            return {
                ...state,
                isLoading: action.loading
            }
        case SET_ITEMS:
            let items = action.items.map((u) => {
                return {
                    id: u.id,
                    title: u.title,
                    description: u.description,
                    coverImage: u.coverImage,
                    source: u.source
                }
            })
            return {
                ...state,
                items
            }
        case SET_ARTICLE:
            return {
                ...state,
                article: action.item
            }
        case SET_LENGTH:
            return {
                ...state,
                length: action.length
            }
        default:
            return state
    }
}

// Action creators
const isLoading = (loading) => ({type: IS_LOADING, loading})
const setItems = (items) => ({type: SET_ITEMS, items})
const setArticle = (item) => ({type: SET_ARTICLE, item})
const setLength = (length) => ({type: SET_LENGTH, length})

// Thunks
export const getNews = (page) => {
    return (dispatch) => {
        dispatch(isLoading(true))
        newsAPI.getNews(page)
            .then((res) => {
                dispatch(setItems(res))
                dispatch(isLoading(false))
                return res
            })
    }
}

export const getCurrentArticle = (id) => {
    return (dispatch) => {
        dispatch(isLoading(true))
        newsAPI.getArticle(id)
            .then((res) => {
                dispatch(setArticle(res))
                dispatch(isLoading(false))
                return res
            })
    }
}

export const getCurrentLength = () => {
    return (dispatch) => {
        dispatch(isLoading(true))
        newsAPI.getLength()
            .then((res) => {
                dispatch(setLength(res.length))
                dispatch(isLoading(false))
                return res
            })
    }
}

export default news