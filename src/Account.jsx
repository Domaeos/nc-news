import { useContext } from "react";
import { UserContext } from "./UserContext";
import { Routes, Route, useParams } from "react-router-dom";
import Login from "./Login";
import AccountSummary from "./AccountSummary";

export default function Account() {
    const { user } = useContext(UserContext)
    const params = useParams();

    return (
        <Routes>
            <Route path="/" element={user && <AccountSummary /> || <Login />}/>
            <Route path="/login" element={user && <AccountSummary /> || <Login />}/>
        </Routes>
    )
}