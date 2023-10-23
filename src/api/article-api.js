const apiUrl = "https://news-app-4jdh.onrender.com/api/"
import axios from "axios";
export const getArticles = async () => {
    const result = await axios.get(apiUrl + "articles");
    return result.data.articles;
}