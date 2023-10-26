import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import { useState, useEffect } from "react";
import LoadingSpinner from "./LoadingSpinner";
import { getArticles } from './api/article-api';
import { Link, useSearchParams } from 'react-router-dom';
import ErrorMessage from './ErrorMessage';
import SortBy from './SortBy';
import TopicNavBar from './TopicNavBar';

export default function ArticleGrid() {
    const [params, setParams] = useSearchParams();
    const topic = params.get("topic")?.toLowerCase()

    const [isLoading, setIsLoading] = useState(true);
    const [articles, setArticles] = useState([]);
    const [err, setErr] = useState(null);

    useEffect(() => {
        const fetchArticles = async () => {
            try {
                setIsLoading(true);
                const fetchedArticles = await getArticles(topic)
                setArticles(fetchedArticles)
            } catch (err) {
                setErr(err)
            } finally {
                setIsLoading(false)
            }
        }
        fetchArticles();
    }, [topic])

    if (isLoading) return (<LoadingSpinner message="Loading articles" />)

    if (err) return <ErrorMessage message="Could not retrieve articles" />

    return (
        <>
            <article className="article-grid">
                {<SortBy type="articles" isLoading={isLoading} setCollection={setArticles} />}
                {articles.map((article) => {
                    return (
                        <Card as={Link} className="article-card-grid" to={`/articles/${article.article_id}`} key={article.article_id} style={{ width: '20rem' }}>
                            <Card.Img variant="top" src={article.article_img_url} />
                            <ListGroup className="list-group-flush">
                                <ListGroup.Item >{article.title} <div className="card-topic">({article.topic})</div></ListGroup.Item>
                                <ListGroup.Item>{article.comment_count} comments - {article.votes} votes</ListGroup.Item>
                                <ListGroup.Item>Created by {article.author} on {article.created_at.slice(0, 10)}</ListGroup.Item>
                            </ListGroup>
                        </Card>
                    )
                })}
            </article>
        </>
    )
}
