import { useState, useEffect, useContext } from "react";
import { UserContext } from "./UserContext";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import CommentInputs from "./CommentInputs";

export default function CommentForm({ setComments, viewComments }) {
    const { user } = useContext(UserContext)
    const [commenting, setCommenting] = useState(false);

    if (!user) return (
        <article className="add-comment-section">Want to leave a comment?
            <Link to="/account/login">Login</Link></article>
    )

    return (
        <article className="add-comment-section">
            {commenting && <CommentInputs
                setComments={setComments}
                viewComments={viewComments}
                setCommenting={setCommenting} />}
            {!commenting && <Button onClick={() => setCommenting(!commenting)}>Comment</Button>}
        </article>
    )
}