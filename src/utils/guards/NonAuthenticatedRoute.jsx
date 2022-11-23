import { getLoggedUser } from "../services/user-requests";
import { Navigate } from "react-router";

export function NonAuthenticatedRoute( {children} ) {
    const user = getLoggedUser();

    if(user) {
        return <Navigate to="/users-list" />;
    }

    return children;
}