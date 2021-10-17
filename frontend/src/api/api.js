import axios from "axios";

const instance = axios.create({
    baseURL: "http://localhost:5500",
})

export const newsAPI = {
    getNews() {
        return instance
            .get('/articles')
            .then((res) => {
                return res.data
            })
            .catch((e) => {
                return e.response.data
            })
    },
    getProfileNews(newsId, token) {
        return instance
            .post(`/getnews`, newsId, {headers: {Authorization: `Bearer ${token}`}})
            .then((res) => {
                return res.data
            })
    },

    createArticle(data, token) {
        return instance
            .post(`/create`, data, {headers: {Authorization: `Bearer ${token}`}})
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
                return e.response.data
            })
    }
}