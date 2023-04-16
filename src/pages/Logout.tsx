import { IonSpinner } from "@ionic/react";
import { useEffect } from "react";
import { useHistory } from "react-router";
import { auth } from "../utils/firebase/Database-function";

/**
 * Logout Component to logout the user from navigation site via url
 * @returns React.FC
 */
export const Logout = () => {
    const history = useHistory();

    useEffect(() => {
        console.log("Logging out");
        auth.signOut();
        history.push('/login');
    }, []);

    return <IonSpinner />;
};