import {applyMiddleware, combineReducers, createStore} from "redux";
import { reducer as formReducer } from 'redux-form'
import thunkMiddleware from "redux-thunk";
import news from "./news";
import auth from "./auth";
import profile from "./profile";
import tags from "./tags";

let Reducers = combineReducers({
    news,
    auth,
    profile,
    tags,
    form: formReducer,
})

let store = createStore(Reducers, applyMiddleware(thunkMiddleware))

window.store = store

export default store