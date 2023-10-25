export default function CommentMessage({ hasSubmitted }) {
    if (hasSubmitted === null) return <></>;

    if (hasSubmitted === true) return (
        <article className="comment-info success">
            Comment uploaded!
        </article>
    )

    return (
        <article className="comment-info fail">
            Comment failed - please try again in a few minutes
        </article>
    )
}