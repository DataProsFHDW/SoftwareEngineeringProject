import { IonSpinner } from "@ionic/react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";
import { auth } from "../utils/firebase/Database-function";

export const Logout = () => {
    const history = useHistory();

    useEffect(() => {
        console.log("Logging out");
        auth.signOut();
        history.push('/login');
    }, []);

    return <IonSpinner />;
};