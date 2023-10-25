export default function ErrorMessage({ message }) {
    return (
        <label className="error-message">{message ?? "Request unsuccessful"}</label>
    )
}