import { useState, useEffect } from "react";
import LoadingSpinner from "./LoadingSpinner";
import Card from 'react-bootstrap/Card';
import { getComments } from "./api/article-api";
import ErrorMessage from "./ErrorMessage";
import CommentVote from "./ArticleVote";

export default function ShowComments({ articleID }) {
    const [comments, setComments] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [err, setErr] = useState(null);

    useEffect(() => {
        const fetchComments = async () => {
            try {
                const fetchedComments = await getComments(articleID);
                setComments(fetchedComments)
            } catch (err) {
                setErr(err)
            } finally {
                setIsLoading(false)
            }
        }
        fetchComments();
    }, [])

    if (isLoading) return <LoadingSpinner message="Fetching comments.." />
    if (err) return <ErrorMessage message="Fetching comments" />
    
    return (
        <>
            {comments.map(comment => {
                return (
                    <Card key={comment.comment_id} className="comment-card">
                        <Card.Header>
                            <article className="comment-card-header">
                                <article className="comment-card-votes">
                                    Votes: {comment.votes}
                                </article>
                                <article className="comment-card-author">
                                    {comment.author}
                                </article>
                            </article>
                        </Card.Header>
                        <Card.Body>
                            <Card.Text>
                                {comment.body}
                            </Card.Text>
                        </Card.Body>
                        <Card.Footer className="comment-card-footer">
                            On {comment.created_at.slice(0, 10)} at {comment.created_at.slice(11, 16)}
                        </Card.Footer>
                    </Card>
                )
            })}
        </>
    )
}