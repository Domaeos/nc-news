import Card from 'react-bootstrap/Card';
import { useState, useEffect, useContext} from "react";
import LoadingSpinner from "./LoadingSpinner";
import { getSingleArticle } from "./api/article-api";
import { useParams } from "react-router-dom";
import ErrorMessage from './ErrorMessage';
import ShowComments from './ShowComments';
import { UserContext } from './UserContext';
import ArticleVote from './ArticleVote';
import CommentForm from './CommentForm';

export default function SingleArticle() {
    const { user, setUser } = useContext(UserContext)
    const [article, setArticle] = useState(null);
    const [viewComments, setViewComments] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const { articleID } = useParams();
    const [err, setErr] = useState(null);
    const [comments, setComments] = useState(null);

    useEffect(() => {
        const fetchArticle = async () => {
            try {
                const fetchedArticle = await getSingleArticle(articleID)
                setArticle(fetchedArticle)
            } catch (err) {
                setErr(err)
            } finally {
                setIsLoading(false)
            }
        }
        fetchArticle();
    }, [])

    if (isLoading) return <LoadingSpinner message="Fetching article" />
    if (err) return <ErrorMessage message="Article not found" />

    return (

        <article className='article-container'>
            <Card>
                <Card.Header>{article.title}</Card.Header>
                <Card.Body>
                    <Card.Img className="article-by-id-img" variant="top" src={article.article_img_url} />
                    <Card.Text className="article-byline">On {article.created_at.slice(0, 10)} by {article.author}</Card.Text>
                    <Card.Text>
                        {article.body}
                    </Card.Text>
                </Card.Body>
                <article className='single-article-footer'>
                    <article className='single-article-votes'>
                        <ArticleVote votes={article.votes} articleID={articleID} />
                    </article>
                    <article className="article-comment-count">
                        {+article.comment_count &&
                            <a href="#comments" onClick={() => setViewComments(!viewComments)}>{(!viewComments) ? "View" : "Hide"} {article.comment_count} comments
                            </a> || "No comments"}
                    </article>
                </article>
            </Card>
            <CommentForm setComments={setComments} viewComments={viewComments}/>
            <article id="comment-section" className="comment-container">
                {viewComments && <ShowComments comments={comments} setComments={setComments} articleID={articleID} />}
            </article>
        </article>
    )
}
