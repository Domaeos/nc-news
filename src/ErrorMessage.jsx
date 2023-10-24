export default function ErrorMessage({ message }) {
    return (
        <h3>Error: {message ?? "Request unsuccessful"}</h3>
    )
}