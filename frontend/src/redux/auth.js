// Imports
import {authAPI} from "../api/api";

// Constants
const IS_LOADING_AUTH = "IS_LOADING_AUTH"
const RESULT_AUTH = "RESULT_AUTH"
const SET_USER_DATA_AUTH = "SET_USER_DATA_AUTH"
const SET_USERNAME_AUTH = "SET_USERNAME_AUTH"

// Reducer's State
let initialState = {
    isLoading: false,
    result: null,
    userId: null,
    token: null,
    isAuthenticated: false,
    username: null,
}

let auth = (state = initialState, action) => {
    switch (action.type) {
        case IS_LOADING_AUTH:
            return {
                ...state,
                isLoading: action.loading,
            }
        case RESULT_AUTH:
            return {
                ...state,
                result: action.status
            }
        case SET_USER_DATA_AUTH:
            return {
                ...state,
                userId: action.id,
                token: action.token,
                isAuthenticated: action.auth,
            }
        case SET_USERNAME_AUTH:
            return {
                ...state,
                username: action.username
            }
        default:
            return state
    }
}

// Action creators
let isLoading = (loading) => ({type: IS_LOADING_AUTH, loading})
export let setResult = (status) => ({type: RESULT_AUTH, status})
export let setUserData = (id, token, auth) => ({type: SET_USER_DATA_AUTH, id, token, auth})
export let setUsername = (username) => ({type: SET_USERNAME_AUTH, username})

//Thunks
export const loginUser = (data) => {
    return (dispatch) => {
        dispatch(setResult(null))
        dispatch(isLoading(true))
        authAPI.loginUser(data)
            .then((res) => {
                if(res.status === 400) {
                    dispatch(isLoading(false))
                    dispatch(setResult(res.message))
                    return
                }
                dispatch(isLoading(false))
                dispatch(setResult(res.message))
                dispatch(setUserData(res.userId, res.token, true))
                localStorage.setItem('token', res.token)
                localStorage.setItem('userId', res.userId)
            })
    }
}

export const createUser = (data) => {
    return (dispatch) => {
        dispatch(setResult(null))
        dispatch(isLoading(true))
        authAPI.createUser(data)
            .then((res) => {
                dispatch(isLoading(false))
                dispatch(setResult(res.message))
                if(res.message === 'User Created') {
                    dispatch(isLoading(true))
                    authAPI.loginUser(data)
                        .then((res) => {
                            if(res.status === 400) {
                                dispatch(isLoading(false))
                                dispatch(setResult(res.message))
                                return
                            }
                            dispatch(isLoading(false))
                            dispatch(setResult(res.message))
                            dispatch(setUserData(res.userId, res.token, true))
                            localStorage.setItem('token', res.token)
                            localStorage.setItem('userId', res.userId)
                        })
                }
                return res
            })
            .catch((e)=> {
                dispatch(isLoading(false))
                dispatch(setResult(false))
            })
    }
}

export const logoutUser = () => {
    return dispatch => {
        localStorage.removeItem('userId')
        localStorage.removeItem('token')
        dispatch(setUsername(null))
        dispatch(setUserData(null, null, false))
    }
}

export const getUser = (userId) => {
    return (dispatch) => {
        authAPI.getUser(userId)
            .then((res) => {
                dispatch(setUsername(res.login))
            })
    }
}


//Export
export default auth