export default function VoteMessage({ voteInfo }) {
    if (voteInfo === null) return <></>;

    if (voteInfo) {
        return (
            <div className="vote-info success">
                Vote successful!
            </div>
        )
    } else {
        return (
            <div className="vote-info fail">
                Vote failed - please try again in a few minutes
            </div>
        )
    }
}