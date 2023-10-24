import Spinner from 'react-bootstrap/Spinner';

export default function LoadingSpinner({ message }) {
    return (
        <>
            <Spinner animation="border" role="status">
                <span
                    className="visually-hidden">{message ?? "Loading"}
                </span>
            </Spinner>
            <details className='user-info'>
                {message ?? ""}
            </details>
        </>
    )
}