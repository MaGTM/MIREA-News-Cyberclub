import {newsAPI} from "../api/api"

const IS_LOADING = "IS_LOADING"
const SET_ITEMS = "SET_ITEMS"

let initialState = {
    isLoading: true,
    items: []
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
        default:
            return state
    }
}

// Action creators
const isLoading = (loading) => ({type: IS_LOADING, loading})
const setItems = (items) => ({type: SET_ITEMS, items})

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

export default news