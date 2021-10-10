import {applyMiddleware, combineReducers, createStore} from "redux";
import { reducer as formReducer } from 'redux-form'
import thunkMiddleware from "redux-thunk";
import news from "./news";

let Reducers = combineReducers({
    news,
    form: formReducer,
})

let store = createStore(Reducers, applyMiddleware(thunkMiddleware))

window.store = store

export default store