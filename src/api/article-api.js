import axios from "axios";
const newsAPI = axios.create({
    baseURL: "https://news-app-4jdh.onrender.com/api/"
})


export const getArticles = async () => {
    const result = await newsAPI.get("/articles/");
    return result.data.articles;
}

export const getSingleArticle = async (articleID) => {
    const result = await newsAPI.get("/articles/" + articleID);
    return result.data.article[0];
}

export const getComments = async (articleID) => {
        const response = await newsAPI.get("/articles/" + articleID + "/comments")
        return response.data.comments;
}