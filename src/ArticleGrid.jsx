import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import { useState, useEffect } from "react";
import LoadingSpinner from "./LoadingSpinner";
import { getArticles } from './api/article-api';
import { Link, useSearchParams } from 'react-router-dom';
import ErrorMessage from './ErrorMessage';
import SortBy from './SortBy';
import { CommentSvg, HeartSvg } from "./assets/SvgFiles";

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
                                <ListGroup.Item className='article-grid-titles'>{article.title} <div className="card-topic">({article.topic})</div></ListGroup.Item>
                                <ListGroup.Item className="all-articles-votes-comments">
                                    <div className='all-articles-card-votes-grid'>
                                        <div className='all-articles-vote-count'>
                                            {article.votes}
                                        </div>
                                        <div className='all-articles-vote-icon'>
                                            <HeartSvg />
                                        </div>
                                    </div>
                                    <div className='all-articles-card-comments-grid'>
                                        <div className='all-articles-comment-count'>
                                            {article.comment_count}
                                        </div>
                                        <div className='all-articles-comment-icon'>
                                            <CommentSvg />
                                        </div>
                                    </div>
                                </ListGroup.Item>
                                <ListGroup.Item className='all-articles-card-footer'>
                                    Created by {article.author} on {article.created_at.slice(0, 10)}
                                </ListGroup.Item>
                            </ListGroup>
                        </Card>
                    )
                })}
            </article>
        </>
    )
}
