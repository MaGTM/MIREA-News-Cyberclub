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