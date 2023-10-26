import Spinner from 'react-bootstrap/Spinner';

export default function LoadingSpinner({ message }) {
    return (
        <>
            <div className='loading-spinner-container'>
                <Spinner animation="border" role="status">
                    <span
                        className="visually-hidden">{message ?? "Loading"}
                    </span>
                </Spinner>
                <article className='spinner-user-info'>
                    {message ?? ""}
                </article>
            </div>
        </>
    )
}