import axios from "axios";
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import { useState, useEffect } from "react";
import LoadingSpinner from "./LoadingSpinner";

export default function ArticleGrid({ apiUrl }) {
    const [isLoading, setIsLoading] = useState(true);
    const [listOfArticles, setListOfArticles] = useState(null);

    useEffect(() => {
        fetchArticles(setListOfArticles, setIsLoading, apiUrl);
    }, [])

    if (isLoading) return <LoadingSpinner message="Loading articles" />

    return (
        <div className="article-grid">
            {listOfArticles.map((article) => {
                return (
                    <Card key={article.article_id} style={{ width: '18rem' }}>
                        <Card.Img variant="top" src={article.article_img_url} />
                        <ListGroup className="list-group-flush">
                            <ListGroup.Item >{article.author}</ListGroup.Item>
                            <ListGroup.Item >{article.title} <div className="card-topic">({article.topic})</div></ListGroup.Item>
                            <ListGroup.Item>{article.comment_count} comments</ListGroup.Item>
                        </ListGroup>
                    </Card>
                )
            })}
        </div>
    )
}

async function fetchArticles(setListOfArticles, setIsLoading, apiUrl) {
    try {
        const articles = await axios.get(apiUrl + "articles");
        setListOfArticles(articles.data.articles);
        setIsLoading(false);
    } catch (err) {
        console.log(err);
    }
}