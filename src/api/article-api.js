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

export const applyVote = async (articleID, vote_increment) => {
    const newVote = { vote_increment }
    const response = await newsAPI.patch("/articles/" + articleID, newVote)
    return response
}

export const checkValidUser = async (username) => {
    const response = await newsAPI.get("/users");
    const validUsers = response.data.users;
    if (validUsers.some(user => {
        return user.username === username;
    })) {
        return true;
    } else {
        return false;
    }
}

export const addComment = async (articleID, commentObj) => {
    const response = await newsAPI
        .post(`/articles/${articleID}/comments`, commentObj)

    return response;
}