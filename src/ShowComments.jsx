import { useState, useEffect, useContext } from "react";
import LoadingSpinner from "./LoadingSpinner";
import Card from 'react-bootstrap/Card';
import { getComments } from "./api/article-api";
import ErrorMessage from "./ErrorMessage";
import CommentVote from "./ArticleVote";
import { UserContext } from "./UserContext";
import { Link } from "react-router-dom";
import { deleteComment } from "./api/article-api";
import { Button, ButtonGroup } from "react-bootstrap";

export default function ShowComments({ comments, setComments, articleID }) {
    const [isLoading, setIsLoading] = useState(true);
    const [err, setErr] = useState(null);
    const [deleteErr, setDeleteErr] = useState(null);
    const [deleted, setDeleted] = useState(null);

    const { user, setUser } = useContext(UserContext)

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

    async function handleDelete(e) {
        try {
            const idToDelete = e.target.id.replace("del_", "")
            const response = await deleteComment(idToDelete)
            setDeleted(idToDelete);
        } catch (err) {
            e.target.disabled = false;  
            setDeleteErr(err);
        }
    }

    if (isLoading) return <LoadingSpinner message="Fetching comments.." />
    if (err) return <ErrorMessage message="Fetching comments" />

    return (
        <>
            {comments.map(comment => {
                return (
                    <Card key={comment.comment_id} className={`comment-card`
                        + ((comment.newlyAdded ? " new-comment" : "")
                            + ((user === comment.author) ? " owned-comment" : ""))}>
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
                            <article className="comment-action-buttons">
                                {user === comment.author && (
                                    <ButtonGroup size="sm">
                                        <Button
                                            className={deleted === comment.comment_id && "comment-delete"}
                                            id={"del_" + comment.comment_id}
                                            onClick={(e) => {
                                                e.target.disabled = true;
                                                handleDelete(e)
                                            }}
                                            variant="danger">Delete</Button>
                                    </ButtonGroup>
                                )}
                            </article>
                            <article className="comment-footer-date">
                                On {comment.created_at.slice(0, 10)} at {comment.created_at.slice(11, 16)}
                            </article>
                        </Card.Footer>
                    </Card>
                )
            })}
        </>
    )
}