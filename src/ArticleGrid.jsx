import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import { useState, useEffect } from "react";
import LoadingSpinner from "./LoadingSpinner";
import { getArticles } from './api/article-api';
import { Link } from 'react-router-dom';
import ErrorMessage from './ErrorMessage';

export default function ArticleGrid() {
    const [isLoading, setIsLoading] = useState(true);
    const [articles, setArticles] = useState([]);
    const [err, setErr] = useState(null);

    useEffect(() => {
        const fetchArticles = async () => {
            try {
                const fetchedArticles = await getArticles()
                setArticles(fetchedArticles)
            } catch (err) {
                setErr(err)
            } finally {
                setIsLoading(false)
            }
        }
        fetchArticles();
    }, [])

    if (isLoading) return <LoadingSpinner message="Loading articles" />
    
    if (err) return <ErrorMessage message="Could not retrieve articles" />

    return (
        <article className="article-grid">
            {articles.map((article) => {
                return (
                    <Card as={Link} to={`/articles/${article.article_id}`} key={article.article_id} style={{ width: '20rem' }}>
                        <Card.Img variant="top" src={article.article_img_url} />
                        <ListGroup className="list-group-flush">
                            <ListGroup.Item >{article.author}</ListGroup.Item>
                            <ListGroup.Item >{article.title} <div className="card-topic">({article.topic})</div></ListGroup.Item>
                            <ListGroup.Item>{article.comment_count} comments</ListGroup.Item>
                        </ListGroup>    
                    </Card>
                )
            })}
        </article>
    )
}
