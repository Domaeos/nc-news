import Form from 'react-bootstrap/Form';
import { Button } from 'react-bootstrap';
import { useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { addComment } from './api/article-api';
import { UserContext } from './UserContext';
import CommentMessage from './CommentMessage';

export default function CommentInputs({ setCommenting, setComments, viewComments }) {
    const [commentBody, setCommentBody] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [hasSubmitted, setHasSubmitted] = useState(null);
    const { user } = useContext(UserContext)
    const params = useParams();

    const [invalidComment, setInvalidComment] = useState(false);


    async function handleSubmit(e) {
        try {
            e.preventDefault();
            if (commentBody === "") {
                e.target[0].classList.add("invalid")
                setInvalidComment(true);
                return;
            }
            setIsSubmitting(true);

            const result = await addComment(params.articleID, { username: user, body: commentBody })
            const createdComment = result.data.comment[0];
            createdComment.newlyAdded = true;

            setComments((prevComments) => {
                if (prevComments) {
                    return [createdComment, ...prevComments]
                }
                return prevComments;
            })
            if (!viewComments) {
                setHasSubmitted(true);
                setTimeout(() => {
                    setHasSubmitted(null);
                    setIsSubmitting(false);
                    setCommentBody("");
                    setCommenting(false);
                }, 2000)
            } else {
                setIsSubmitting(false);
                setCommentBody("");
                setCommenting(false);
            }
        } catch (err) {
            setHasSubmitted(false);
            setTimeout(() => {
                setHasSubmitted(null);
                setIsSubmitting(false);
            }, 2000)
        }
    }
    function handleDiscard() {
        setCommentBody("")
        setCommenting(false);
    }
    return (
        <>
            <Form noValidate onSubmit={handleSubmit} className='comment-form'>
                <Form.Group className="mb-3" controlId="comment-body">
                    <article className='add-comment-header'>
                        <Form.Label>Write a comment</Form.Label>
                        <CommentMessage hasSubmitted={hasSubmitted} />
                    </article>
                    <Form.Control
                        value={commentBody}
                        disabled={isSubmitting}
                        onChange={(e) => {
                            e.target.classList.remove("invalid")
                            setInvalidComment(false);
                            setCommentBody(e.target.value)
                        }}
                        isInvalid={invalidComment}
                        as="textarea"
                        rows={3} />
                    <Form.Control.Feedback type="invalid">
                        Please enter a comment to submit.
                    </Form.Control.Feedback>
                </Form.Group>
                <Form.Group className='comment-button-grid'>
                    <Button disabled={isSubmitting} type="submit" className='submit-comment-button'>Submit</Button>
                    <Button disabled={isSubmitting} variant="danger" onClick={handleDiscard} className='discard-comment-button'>Discard</Button>
                </Form.Group>
            </Form>
        </>
    )
}