import {authAPI, newsAPI} from "../api/api"

// Constants
const IS_LOADING_PROFILE = "IS_LOADING_PROFILE"
const GET_USER_DATA_PROFILE = "GET_USER_DATA_PROFILE"
const SET_NEWS_BLOCKS_PROFILE = "SET_NEWS_BLOCKS_PROFILE"
const IS_ARTICLE_CREATED = "IS_ARTICLE_CREATED"
const RESET_USER_DATA = "RESET_USER_DATA"

// State and reducer
let initialState = {
    login: null,
    newsBlocksId: null,
    isLoading: false,
    newsBlocks: null,
    isCreated: null,
}

let profile = (state = initialState, action) => {
    switch (action.type) {
        case GET_USER_DATA_PROFILE:
            return {
                ...state,
                login: action.login,
                newsBlocksId: action.newsBlocksId
            }
        case IS_LOADING_PROFILE:
            return {
                ...state,
                isLoading: action.loading
            }
        case SET_NEWS_BLOCKS_PROFILE:
            return {
                ...state,
                newsBlocks: action.newsBlocks
            }
        case IS_ARTICLE_CREATED:
            return {
                ...state,
                isCreated: action.isCreated
            }
        case RESET_USER_DATA:
            return {
                ...state,
                login: null,
                newsBlocksId: null,
                isLoading: false,
                newsBlocks: null,
                isCreated: null,
            }
        default:
            return state
    }
}

// Action creators
let setUserDataProfile = (login, newsBlocksId) => ({ type: GET_USER_DATA_PROFILE, login, newsBlocksId })
let setNewsBlocksProfile = (newsBlocks) => ({ type: SET_NEWS_BLOCKS_PROFILE, newsBlocks })
let isArticleCreated = (isCreated) => ({type: IS_ARTICLE_CREATED, isCreated})
let isLoading = (loading) => ({ type: IS_LOADING_PROFILE, loading })
let resetUserData = () => ({ type: RESET_USER_DATA })

// Thunks
export const getUserData = (userId) => {
    return (dispatch) => {
        dispatch(isLoading(true))
        authAPI.getUser(userId)
            .then((res) => {
                dispatch(setUserDataProfile(res.login, res.newsBlocksId))
                dispatch(isLoading(false))
            })
    }
}

export const getUserNewsData = (newsId, token) => {
    return (dispatch) => {
        dispatch(isLoading(true))
        newsAPI.getProfileNews(newsId, token)
            .then((res) => {
                dispatch(setNewsBlocksProfile(res.newsBlocks))
                dispatch(isLoading(false))
            })
    }
}

export const createNewArticle = (data, token) => {
    return (dispatch) => {
        dispatch(isLoading(true))
        newsAPI.createArticle(data, token)
            .then((res) => {
                dispatch(isLoading(false))
                dispatch(isArticleCreated(true))
            })
    }
}

export const isCreated = () => {
    return (dispatch) => {
        dispatch(isArticleCreated(false))
    }
}

export const resetData = () => {
    return (dispatch) => {
        dispatch(resetUserData())
    }
}



// Export reducer
export default profile