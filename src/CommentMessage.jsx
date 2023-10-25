export default function CommentMessage({ hasSubmitted }) {
    if (hasSubmitted === null || hasSubmitted === true) return <></>;

    return (
        <div className="comment-info fail">
            Comment failed - please try again in a few minutes
        </div>
    )
}