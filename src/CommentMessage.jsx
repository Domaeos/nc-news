export default function CommentMessage({ hasSubmitted }) {
    if (hasSubmitted === null || hasSubmitted === true) return <></>;

    // if (hasSubmitted) {
    //     return (
    //         <div className="comment-info success">
    //             Comment added!
    //         </div>
    //     )
    // } else {
    return (
        <div className="comment-info fail">
            Comment failed - please try again in a few minutes
        </div>
    )
    // }
}