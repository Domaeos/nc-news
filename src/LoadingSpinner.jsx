import Spinner from 'react-bootstrap/Spinner';

export default function LoadingSpinner({ message }) {
    return (
        <>
            <Spinner animation="border" role="status">
                <span
                    className="visually-hidden">{message ?? "Loading"}
                </span>
            </Spinner>
            <article className='user-info'>
                {message ?? ""}
            </article>
        </>
    )
}