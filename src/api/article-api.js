import axios from "axios";
const newsAPI = axios.create({
    baseURL: "https://news-app-4jdh.onrender.com/api/"
})


export const getArticles = async (topic) => {
    const topicGreenList = await getTopics();
    const validTopic = topicGreenList.some(match => match.slug === topic);
    const result = await newsAPI.get("/articles" + (validTopic ? `?topic=${topic}` : ""));
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

export const getTopics = async () => {
    const response = await newsAPI.get("/topics")
    return response.data.topics;
}