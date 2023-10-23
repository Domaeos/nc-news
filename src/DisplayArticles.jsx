import { useParams } from "react-router-dom";
import ArticleGrid from "./ArticleGrid";

export default function DisplayArticles({ apiUrl }) {
    return (
        <ArticleGrid apiUrl={apiUrl} />
    )
}
