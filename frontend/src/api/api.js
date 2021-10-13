import axios from "axios";

const instance = axios.create({
    baseURL: "http://localhost:5500",
})

export const newsAPI = {
    getNews(token) {
        return instance
            .get('articles')
            .then((res) => {
                return res.data
            })
    }
}

export const authAPI = {
    loginUser(data) {
        return instance
            .post('/login', data)
            .then((res) => {
                return res.data
            })
            .catch((e) => {
                return e.response.data
            })
    },
    getUser(userId) {
        return instance
            .get(`users/${userId}`)
            .then((res) => {
                return res.data
            })
            .catch((e) => {
                return e.response.data
            })
    },

    createUser(data) {
        return instance
            .post('/register', data)
            .then((res) => {
                return res.data
            })
            .catch((e) => {
                console.log(e.response.data)
                return e.response.data
            })
    }
}