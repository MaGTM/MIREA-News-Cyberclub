import {newsAPI} from "../api/api"

const IS_LOADING = "IS_LOADING"
const SET_ITEMS = "SET_ITEMS"
const SET_ARTICLE = "SET_ARTICLE"

let initialState = {
    isLoading: true,
    items: [],
    article: {}
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
        default:
            return state
    }
}

// Action creators
const isLoading = (loading) => ({type: IS_LOADING, loading})
const setItems = (items) => ({type: SET_ITEMS, items})
const setArticle = (item) => ({type: SET_ARTICLE, item})

// Thunks
export const getNews = () => {
    return (dispatch) => {
        dispatch(isLoading(true))
        newsAPI.getNews()
            .then((res) => {
                dispatch(isLoading(false))
                dispatch(setItems(res))
                return res
            })
    }
}

export const getCurrentArticle = (id) => {
    return (dispatch) => {
        dispatch(isLoading(true))
        newsAPI.getArticle(id)
            .then((res) => {
                dispatch(isLoading(false))
                dispatch(setArticle(res))
                return res
            })
    }
}

export default news