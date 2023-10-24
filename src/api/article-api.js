import axios from "axios";
const newsAPI = axios.create({
    baseURL: "https://news-app-4jdh.onrender.com/api/"
})


export const getArticles = async (articleID = null) => {
    const result = await newsAPI.get("/articles/" + (articleID ?? ""));
    if (articleID) return result.data.article[0];
    return result.data.articles;
}