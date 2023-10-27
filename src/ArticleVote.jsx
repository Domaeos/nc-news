import Button from 'react-bootstrap/Button';
import { useEffect, useState } from 'react';
import { applyVote } from './api/article-api';
import VoteMessage from './VoteMessage';

export default function ArticleVote({ votes, articleID }) {
    const [vote, setVote] = useState(0);
    const [voteInfo, setVoteInfo] = useState(null);
    const [voteAction, setVoteAction] = useState({
        voted: false,
    });

    function handleVote(voteInc) {
        setVote(voteInc)
        if (voteInc === -1) {
            setVoteAction((voteAction) => {
                const newAction = { ...voteAction };
                newAction.voted = true;
                newAction.up = false;
                newAction.down = true;
                return newAction;
            })
        } else {
            setVoteAction((voteAction) => {
                const newAction = { ...voteAction };
                newAction.voted = true;
                newAction.down = false;
                newAction.up = true;
                return newAction;
            })
        }
    }

    useEffect(() => {
        const patchVote = async () => {
            if (vote === 1 || vote === -1) {
                try {
                    const result = await applyVote(articleID, vote);
                    setVoteInfo(true)
                    setTimeout(() => {
                        setVoteInfo(null);
                    }, 2000)
                } catch (err) {
                    setVoteInfo(false)
                    setTimeout(() => {
                        setVoteInfo(null);
                    }, 2000)
                }
            }
        }
        patchVote();

        return function cleanupVotesState() {
            setVoteInfo(null);
        }
    }, [vote]);


    return (
        <article className="single-article-votes">
            <Button className="aritcle-vote-button up"
                disabled={voteAction.voted && voteAction.down}
                onClick={(e) => handleVote(-1)}
                variant="primary">-</Button>
            <article className='vote-count'>
                {votes + vote}
            </article>
            <Button className="aritcle-vote-button down"
                disabled={voteAction.voted && voteAction.up}
                onClick={(e) => handleVote(1)}
                variant="primary">+</Button>
           <VoteMessage voteInfo={voteInfo}/>
        </article>
    )
}