import { Navigate } from "react-router";
import { getLoggedUser } from "../services/user-requests";

export function AuthenticatedRoute ({ children }) {
    const user = getLoggedUser();

    if(!user) {
        return <Navigate to="/login" />;
    }

    return children;
}